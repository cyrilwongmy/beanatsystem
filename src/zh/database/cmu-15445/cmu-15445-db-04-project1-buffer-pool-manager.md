---
title: 3. Project1 Buffer Pool Manager
author: Cyril
---

## Introduction

- Frame: 指的是内存里面的一个页面，每个frame有一个唯一的frame_id，可以存储不同的page也就是page id可以不同。
- Page: 指的是磁盘上的一个页面，每个page有一个唯一的page_id。
- LRU-K replacer的`curr_size`表示的是当前evictable = true的frame的数量，而不是所有frame的数量。这个在后续SetEvictable函数中要正确设置。
- 多看Header file注释写的很清楚，相比于前两年可以说是详细到不能再详细了，堪比6s081。
- 遇到问题多看看别人的博客会加深自己的理解，没必要说死磕。闭门造车后再看看别人怎么造车会收获更多。

## Task #1 - LRU-K Replacement Policy

LRU-K算法是LRU算法的改进，在原本的LRU算法中判断需要Evict的frame，只根据最近一次访问时间。对于缓存而言，经常被访问的缓存是最可能后续继续被访问的，因此对于每个frame可以考虑前k次的访问记录，而不是只考虑最近一次访问记录。

LRU-K算法的实现步骤：

1. 永远最先淘汰不满K次的frame，因为被访问越少未来被访问的可能性越小。如果有多个frames都不满足K次，那么就淘汰第一次访问记录最早的frames（FIFO）。
2. 如果所有页面都满足K次，那么就淘汰最近一次访问时间最早的页面（LRU）。

在具体代码实现层面，我的实现是直接插入到队尾O(1)，查找Evict的Frame的时候O(N)时间遍历。

一些细节：SetEvictable函数需要注意对于curr_size。多线程部分直接大锁保平安了，后续优化可以考虑如何减少锁的粒度。

### 可能的优化

可能的优化就是将不满足K次访问的frame放入一个链表，先入先出。Evict需要从这里出去的时候直接队头出队即可。访问次数等于K次的时候移动到等K次的另一个队列，利用HashMap可以O(1)时间查找到这个frame，然后从链表中删除，添加到下面提到的第二个链表。等于K次的frame也是存入一个链表+HashMap，实现LRU算法即可。和Leetcode LRU题目一个意思。RecordAccess的时候利用HashMap可以O(1)时间查找到这个frame。

后续做LeaderBoard优化的时候会优先考虑先将LRU-K优化。锁优化，可以考虑利用并发哈希表，并发链表。抛开15445这门课而言，可以考虑读写锁，或者CAS。再者就是考虑如何减少锁的粒度，比如说可以考虑将frame分成多个组，每个组有一个锁，这样可以减少锁的粒度。还有就是可以考虑将LRU-K的优化和锁优化结合起来，比如说将frame分成多个组，每个组有一个锁，每个组内部实现LRU-K算法。

## Task #2 - Buffer Pool Manager

对于每个frame，其实存在好多位置，FreeList，LRU-K Replacer，PageTable。

- FreeList：当frame是free的时候，有两种可能从来没使用过，或者在DeletePage的时候放入。
- LRU-K Replacer：不一定是Evictable。一个在page table中的frame，如果被pin了，那么就不是Evictable的。当Unpin调用后，如果pin count为0，那么我们就可以将这个frame设置为Evictable。但是我们不会立刻将这个frame从page table删除，除非这个frame被Evict，这是一种lazy的做法。如果frame再次被使用，也会重新把pin cnt++，Evictable = false，就不需要改动page table了。在replacer中的evictable = true的frame是在unpin到0的时候设置，这个page id和frame的map entry我们先不remove，等到FetchPage或者NewPage的时候才remove from `page_table_`。
- page table：这个是真正的frame和page id的映射关系，这个是最重要的，因为我们需要根据page id找到对应的frame，然后进行读写操作。frame可能是pin cnt = 0，并且evictable = true的frame，根据上述的lazy算法。当然比较通常的情况是，frame正被使用。

多线程部分直接大锁保平安，后续优化可以在以下几个方法：
- 并发哈希表和并发replacer结合，这样可以减少锁的粒度。
- 读写锁，这个access_type参数可以用来区分读写。后续LeaderBoard也提到了这点。
- Parallel I/O operations：并发访问disk manager。

## Task #3 - Read/Write Page Guards

这部分倒不是很难，唯一需要注意的地方在于Buffer pool manager里面的关于Read or WritePageGurad的方法需在这里进行加锁，zhihu上[川流同学](https://zhuanlan.zhihu.com/p/623537651)在构造器里面进行加锁遇到了死锁问题。

## Leaderboard

暂时先跳过。

## Conclusion

总共花费了7个小时，总体而言相比往年难度低了不少，去年的Extendible hash table理解上就很难，今年只有LRU-K算法就简单很多。

## Reference
- [CMU 15-445 Project 1 (Spring 2023) | 缓冲池管理 - 码呆茶的文章 - 知乎](https://zhuanlan.zhihu.com/p/615312257)
- [CMU15-445-2023-Spring_Project2-CheckPoint2调试记录 - 川流的文章 - 知乎](https://zhuanlan.zhihu.com/p/625824365)