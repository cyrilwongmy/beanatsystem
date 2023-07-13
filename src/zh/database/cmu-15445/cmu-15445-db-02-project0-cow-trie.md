---
title: 2. Project 0
---

## Introduction

熟悉熟悉C++的智能指针玩法

## Task #1 - Copy-On-Write Trie

Get方法：由于不需要修改节点，因此Get方法最为容易从上到下遍历Trie，找到最后一个节点后Convert成`TrieNodeWithValue`，如果convert完为nullptr就返回nullptr，否则就获取对应值就可以。

Put方法：从上往下遍历Trie，边遍历边新建节点，这是一般会先想到的思路。但是由于TrieNode的map存储了`std::shared_ptr<const TrieNode>`表示了无法通过shared ptr修改TrieNode的值
，因此需要通过Clone获取non const的TrieNode，不存在的节点需要`make_shared`创建，沿途节点进栈。反向遍历key字符串，并pop出stack中的节点，连接节点。

Remove操作：从上到下遍历，由于最后的节点删除可能导致父亲以及祖先节点被删除，因此我
们要记录路径上的所有节点到stack中，这里同理要Clone节点，到了最后一个节点先判断是否存
在值，如果不存在直接返回；如果存在，不能用Clone，不然类型还是`TrieNodeWithValue`，需
要创建一个新的TrieNode。再从后向前遍历key字符串，将所有节点一一对应的弹出stack，利用顺序
两个指针child和parent，修改parent的`children_`这个map组装parent和child保证clone后的
children_[ch]指向了新的clone的child而不是旧的。还需要额外判断child的是否还有children，如
果没有，就可以在parent中erase掉对应的child的char。

耗时：5hrs

## Task #2 - Concurrent Key-Value Store

读操作：先获取root lock，然后Trie进行assignment到一个变量创建一个copy，后续操作都在这个变量进行就可以了。这样保证了不会影响其他write和read操作。

写操作：先获取write lock，然后再获取root lock，创建一个shared_ptr指向root，释放root lock后就可以开始修改了。这里可以直接修改拿着root指针修改不加锁的原因是修改过程不会对原Trie造成影响（也就不会造成read读取过程有影响），而是创建一个新的Trie。修改完毕后，再次获取root lock，将root指向新的Trie。释放Write lock。

加锁顺序必须是先write lock，保证只有一个写在修改，再root lock，否则会有多个写同时修改root指向的Trie。

![concurrent write case](../../../img/cmu-15445-db-02-concur-trie.jpg =500x)



## Task #3 - Debugging

由于本地生成的随机数可能和Gradescope不一样，因此我们改成如下按照Discord上所说：

```c++
  auto trie = Trie();
  trie = trie.Put<uint32_t>("65", 25);
  trie = trie.Put<uint32_t>("61", 65);
  trie = trie.Put<uint32_t>("82", 84);
  trie = trie.Put<uint32_t>("2", 42);
  trie = trie.Put<uint32_t>("16", 67);
  trie = trie.Put<uint32_t>("94", 53);
  trie = trie.Put<uint32_t>("20", 35);
  trie = trie.Put<uint32_t>("3", 57);
  trie = trie.Put<uint32_t>("93", 30);
  trie = trie.Put<uint32_t>("75", 29);
```

## Task #4 - SQL String Functions

找到对应的文件，按照注释写就可以了。

## Conclusion

这次的project主要是熟悉了C++的智能指针的玩法，耗时大概6小时左右，主要花在debug上面。