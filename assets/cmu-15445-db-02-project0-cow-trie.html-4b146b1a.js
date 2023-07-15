import{_ as e}from"./plugin-vue_export-helper-c27b6911.js";import{o as t,c as i,f as r}from"./app-f4e6b92f.js";const n="/beanatsystem/assets/cmu-15445-db-02-concur-trie-cc16b89e.jpg",o={},a=r('<h2 id="introduction" tabindex="-1"><a class="header-anchor" href="#introduction" aria-hidden="true">#</a> Introduction</h2><p>熟悉熟悉C++的智能指针玩法</p><h2 id="task-1-copy-on-write-trie" tabindex="-1"><a class="header-anchor" href="#task-1-copy-on-write-trie" aria-hidden="true">#</a> Task #1 - Copy-On-Write Trie</h2><p>Get方法：由于不需要修改节点，因此Get方法最为容易从上到下遍历Trie，找到最后一个节点后Convert成<code>TrieNodeWithValue</code>，如果convert完为nullptr就返回nullptr，否则就获取对应值就可以。</p><p>Put方法：从上往下遍历Trie，边遍历边新建节点，这是一般会先想到的思路。但是由于TrieNode的map存储了<code>std::shared_ptr&lt;const TrieNode&gt;</code>表示了无法通过shared ptr修改TrieNode的值 ，因此需要通过Clone获取non const的TrieNode，不存在的节点需要<code>make_shared</code>创建，沿途节点进栈。反向遍历key字符串，并pop出stack中的节点，连接节点。</p><p>Remove操作：从上到下遍历，由于最后的节点删除可能导致父亲以及祖先节点被删除，因此我 们要记录路径上的所有节点到stack中，这里同理要Clone节点，到了最后一个节点先判断是否存 在值，如果不存在直接返回；如果存在，不能用Clone，不然类型还是<code>TrieNodeWithValue</code>，需 要创建一个新的TrieNode。再从后向前遍历key字符串，将所有节点一一对应的弹出stack，利用顺序 两个指针child和parent，修改parent的<code>children_</code>这个map组装parent和child保证clone后的 children_[ch]指向了新的clone的child而不是旧的。还需要额外判断child的是否还有children，如 果没有，就可以在parent中erase掉对应的child的char。</p><p>耗时：5hrs</p><h2 id="task-2-concurrent-key-value-store" tabindex="-1"><a class="header-anchor" href="#task-2-concurrent-key-value-store" aria-hidden="true">#</a> Task #2 - Concurrent Key-Value Store</h2><p>读操作：先获取root lock，然后Trie进行assignment到一个变量创建一个copy，后续操作都在这个变量进行就可以了。这样保证了不会影响其他write和read操作。</p><p>写操作：先获取write lock，然后再获取root lock，创建一个shared_ptr指向root，释放root lock后就可以开始修改了。这里可以直接修改拿着root指针修改不加锁的原因是修改过程不会对原Trie造成影响（也就不会造成read读取过程有影响），而是创建一个新的Trie。修改完毕后，再次获取root lock，将root指向新的Trie。释放Write lock。</p><p>加锁顺序必须是先write lock，保证只有一个写在修改，再root lock，否则会有多个写同时修改root指向的Trie。</p><figure><img src="'+n+`" alt="concurrent write case" width="500" tabindex="0" loading="lazy"><figcaption>concurrent write case</figcaption></figure><h2 id="task-3-debugging" tabindex="-1"><a class="header-anchor" href="#task-3-debugging" aria-hidden="true">#</a> Task #3 - Debugging</h2><p>由于本地生成的随机数可能和Gradescope不一样，因此我们改成如下按照Discord上所说：</p><div class="language-c++ line-numbers-mode" data-ext="c++"><pre class="language-c++"><code>  auto trie = Trie();
  trie = trie.Put&lt;uint32_t&gt;(&quot;65&quot;, 25);
  trie = trie.Put&lt;uint32_t&gt;(&quot;61&quot;, 65);
  trie = trie.Put&lt;uint32_t&gt;(&quot;82&quot;, 84);
  trie = trie.Put&lt;uint32_t&gt;(&quot;2&quot;, 42);
  trie = trie.Put&lt;uint32_t&gt;(&quot;16&quot;, 67);
  trie = trie.Put&lt;uint32_t&gt;(&quot;94&quot;, 53);
  trie = trie.Put&lt;uint32_t&gt;(&quot;20&quot;, 35);
  trie = trie.Put&lt;uint32_t&gt;(&quot;3&quot;, 57);
  trie = trie.Put&lt;uint32_t&gt;(&quot;93&quot;, 30);
  trie = trie.Put&lt;uint32_t&gt;(&quot;75&quot;, 29);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="task-4-sql-string-functions" tabindex="-1"><a class="header-anchor" href="#task-4-sql-string-functions" aria-hidden="true">#</a> Task #4 - SQL String Functions</h2><p>找到对应的文件，按照注释写就可以了。</p><h2 id="conclusion" tabindex="-1"><a class="header-anchor" href="#conclusion" aria-hidden="true">#</a> Conclusion</h2><p>这次的project主要是熟悉了C++的智能指针的玩法，耗时大概6小时左右，主要花在debug上面。</p>`,19),c=[a];function d(s,u){return t(),i("div",null,c)}const p=e(o,[["render",d],["__file","cmu-15445-db-02-project0-cow-trie.html.vue"]]);export{p as default};