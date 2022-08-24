# HashMap

## 1. Hashtable 和 HashMap 的区别

~~~markdown
 * Hash table based implementation of the {@code Map} interface.  This
 * implementation provides all of the optional map operations, and permits
 * {@code null} values and the {@code null} key.  (The {@code HashMap}
 * class is roughly equivalent to {@code Hashtable}, except that it is
 * unsynchronized and permits nulls.)  This class makes no guarantees as to
 * the order of the map; in particular, it does not guarantee that the order
 * will remain constant over time(特殊情况下并不能保证位置一直维持在以前的位置).
~~~

## 2. HashMap 第一次 put

### 2.1 代码

向一个新的 HashMap 中存入一个值

~~~java
Map<String, String> map = new HashMap<>();
map.put("a", "a");
map.put("a", "c");
~~~

HashMap 的构造方法

~~~java
static final float DEFAULT_LOAD_FACTOR = 0.75f;
final float loadFactor;

public HashMap() {
  // 将默认加载因子常量赋值给 loadFactor 变量
  this.loadFactor = DEFAULT_LOAD_FACTOR; // all other fields defaulted
}
~~~

调用 HashMap 的 put 方法

~~~java
final V putVal(int hash, K key, V value, boolean onlyIfAbsent,
               boolean evict) {
  Node<K,V>[] tab; Node<K,V> p; int n, i;
  // table 是一个 Node 类型的数组（全局变量），在 HashMap 中定义如下：
  // transient Node<K,V>[] table;
  // Node 结点定义如下：
  /**
   *   static class Node<K,V> implements Map.Entry<K,V> {
   *   	final int hash;
   *   	final K key;
   *   	V value;
   *   	Node<K,V> next;
   *   }
   */
  // 第一次调用 put 方法只走这个 if 分支（table isNull）
  if ((tab = table) == null || (n = tab.length) == 0)
    // 调用 resize() 方法初始化 tab
    // n 初始化为 16
    n = (tab = resize()).length;
  // (16 - 1) 的二进制：1111
  // 将 hash 码控制到 16 以内(0~15)，相当于取模操作
  if ((p = tab[i = (n - 1) & hash]) == null)
    tab[i] = newNode(hash, key, value, null);
  else {
    // 省略。。。
  }
  ++modCount; // 修改次数
  // transient int size;
  // 每次加 1，判断是否大于 threshold
  if (++size > threshold)
    resize();
  afterNodeInsertion(evict);
  return null;
}
~~~

resize() 方法
~~~java
final Node<K,V>[] resize() {
  // 第一次调用时 table 为 null
  Node<K,V>[] oldTab = table;
  // 初始化为 0
  int oldCap = (oldTab == null) ? 0 : oldTab.length;
  // threshold（阈值）= table.length * 0.75 = 12
  int oldThr = threshold;
  int newCap, newThr = 0;
  if (oldCap > 0) {
    // 省略。。。
  }
  else if (oldThr > 0) // initial capacity was placed in threshold
    newCap = oldThr;
  else {               // zero initial threshold signifies using defaults
    // static final int DEFAULT_INITIAL_CAPACITY = 1 << 4;
    // 初始化数组长度为 16
    newCap = DEFAULT_INITIAL_CAPACITY;
    // 初始化阈值为 12
    newThr = (int)(DEFAULT_LOAD_FACTOR * DEFAULT_INITIAL_CAPACITY);
  }
  if (newThr == 0) {
    // 省略
  }
  // threshold 赋值 12
  threshold = newThr;
  @SuppressWarnings({"rawtypes","unchecked"})
  // 初始化 newTab 长度为 16
  Node<K,V>[] newTab = (Node<K,V>[])new Node[newCap];
  // 初始化 table 为 newTab
  table = newTab;
  if (oldTab != null) {
		// 省略
  }
  // 返回长度为 16 的 node 数组给 tab
  return newTab;
}
~~~

### 2.2 总结

1. HashMap 第一次新建实例，构造方法初始化加载因子为 0.75
2. 调用 put 方法，初始化 table 数组长度为 16 ，初始化 threshold 为 12
3. key 的 hash 值取模 table 数组长度 16，存入 table 数组
4. 返回 null

## 3. HashMap 设置同一个对象

### 3.1 代码

向 HashMap 中 put 相同 key

~~~java
Map<String, String> map = new HashMap<>();
map.put("a", "a");
map.put("a", "c");
~~~

第二次调用 put 方法

~~~java
final V putVal(int hash, K key, V value, boolean onlyIfAbsent,
               boolean evict) {
  Node<K,V>[] tab; Node<K,V> p; int n, i;
  // 第二次 put 跳过初始化 table
  if ((tab = table) == null || (n = tab.length) == 0)
    n = (tab = resize()).length;
  // hash 码一致，所以 & 结果一致，能取出第一次数据，所以不为 null
  if ((p = tab[i = (n - 1) & hash]) == null)
    tab[i] = newNode(hash, key, value, null);
  else {
    Node<K,V> e; K k;
    // hash 码一致，key 一致，说明为同一个 key
    if (p.hash == hash &&
        ((k = p.key) == key || (key != null && key.equals(k))))
      // e 指向当前根据 key 取出的 brucket
      e = p;
    else if (p instanceof TreeNode)
      e = ((TreeNode<K,V>)p).putTreeVal(this, tab, hash, key, value);
    else {
      // 省略。。。
    }
    if (e != null) { // existing mapping for key
      V oldValue = e.value;
      // put 默认传入为 false
      if (!onlyIfAbsent || oldValue == null)
        // 修改 e 的 value 为传入 value
        e.value = value;
      afterNodeAccess(e);
      // 返回 oldValue
      return oldValue;
    }
  }
  ++modCount;
  if (++size > threshold)
    resize();
  afterNodeInsertion(evict);
  return null;
}
~~~

### 3.2 总结

1. 根据 key，从 table 中取出旧的 Node 对象
2. 更换 value 为第二次 put value
3. 返回 oldValue

## 4. hash 值相同但是对象不同

### 4.1 代码

假设 “a” 和 “xyz” hash 值相同，将 “a” 和 “xyz” 放入同一个 HashMap

~~~java
Map<String, String> map = new HashMap<>();
map.put("a", "a");
map.put("xyz", "c");
~~~

将第二个对象放入 HashMap

~~~java
final V putVal(int hash, K key, V value, boolean onlyIfAbsent,
               boolean evict) {
  Node<K,V>[] tab; Node<K,V> p; int n, i;
  if ((tab = table) == null || (n = tab.length) == 0) // 跳过初始化
    n = (tab = resize()).length;
  if ((p = tab[i = (n - 1) & hash]) == null) // 存在第一次存放的 Node 对象，跳过
    tab[i] = newNode(hash, key, value, null);
  else {
    Node<K,V> e; K k;
    if (p.hash == hash && // hash 码一致
        ((k = p.key) == key || (key != null && key.equals(k)))) // key 值不一样，跳过
      e = p;
    else if (p instanceof TreeNode) // TreeNode 是红黑树的结点，不为 TreeNode，跳过
      e = ((TreeNode<K,V>)p).putTreeVal(this, tab, hash, key, value);
    else {
      for (int binCount = 0; ; ++binCount) {
        if ((e = p.next) == null) {
          // 将传入值赋给空的 p.next
          p.next = newNode(hash, key, value, null);
          // static final int TREEIFY_THRESHOLD = 8
          if (binCount >= TREEIFY_THRESHOLD - 1) // -1 for 1st
            treeifyBin(tab, hash);
          break; // 直接 break 循环
        }
        if (e.hash == hash &&
            ((k = e.key) == key || (key != null && key.equals(k))))
          break;
        p = e;
      }
    }
    // e 为 null，跳过
    if (e != null) { // existing mapping for key
      V oldValue = e.value;
      if (!onlyIfAbsent || oldValue == null)
        e.value = value;
      afterNodeAccess(e);
      return oldValue;
    }
  }
  ++modCount;
  if (++size > threshold)
    resize();
  afterNodeInsertion(evict);
  return null;
}
~~~

### 4.2 总结

1. 取出老的 hash 码相同的 bucket
2. 循环 p.next 直至为 null
3. 将 value 赋给 p.next

## 5. 链表下如果对象为同一个 HashMap 底层代码如何走

### 5.1 代码

~~~java
HashMap<String, String> map = new HashMap<>();
map.put("a", "a");
map.put("xyz", "c");
map.put("xyz", "XX");
~~~

putValue

~~~java
final V putVal(int hash, K key, V value, boolean onlyIfAbsent,
               boolean evict) {
  Node<K,V>[] tab; Node<K,V> p; int n, i;
  if ((tab = table) == null || (n = tab.length) == 0) // 跳过初始化
    n = (tab = resize()).length;
  if ((p = tab[i = (n - 1) & hash]) == null) // 存在第一次存放的 Node 对象，跳过
    tab[i] = newNode(hash, key, value, null);
  else {
    Node<K,V> e; K k;
    if (p.hash == hash && // hash 码一致
        ((k = p.key) == key || (key != null && key.equals(k)))) // key 值不一样，跳过
      e = p;
    else if (p instanceof TreeNode) // TreeNode 是红黑树的结点，不为 TreeNode，跳过
      e = ((TreeNode<K,V>)p).putTreeVal(this, tab, hash, key, value);
    else {
      for (int binCount = 0; ; ++binCount) {
        if ((e = p.next) == null) {
          p.next = newNode(hash, key, value, null);
          if (binCount >= TREEIFY_THRESHOLD - 1) // -1 for 1st
            treeifyBin(tab, hash);
          break;
        }
        // 循环到此处，发现对象 hash 码相同，key 值相同，直接跳出循环
        if (e.hash == hash &&
            ((k = e.key) == key || (key != null && key.equals(k))))
          break;
        p = e;
      }
    }
    // e 为 key 相同的 Node 对象
    if (e != null) { // existing mapping for key
      V oldValue = e.value;
      if (!onlyIfAbsent || oldValue == null)
        // 将值替换为传入 value
        e.value = value;
      afterNodeAccess(e);
      return oldValue; // 返回 oldValue
    }
  }
  ++modCount;
  if (++size > threshold)
    resize();
  afterNodeInsertion(evict);
  return null;
}
~~~

### 5.2 总结

1. 取出第一次存放的 hash 码相同的 bucket
2. 循环链表节点直到 key 相同
3. 将传入的值赋给老的key
4. 返回 oldValue

## 6. 链表数据达到 9 是否转红黑树

### 6.1 代码

~~~java
class Person {
  public String name;
  public Person(String name) { this.name = name; }
  @Override
  public int hashCode()
    return 32512;
}

Map<Person, String> map = new HashMap<>();
map.put(new Person("a"), "p");
map.put(new Person("b"), "p");
map.put(new Person("c"), "p");
map.put(new Person("d"), "p");
map.put(new Person("e"), "p");
map.put(new Person("f"), "p");
map.put(new Person("g"), "p");
map.put(new Person("h"), "p");
map.put(new Person("k"), "p");
~~~

putVal 方法

~~~java
final V putVal(int hash, K key, V value, boolean onlyIfAbsent,
               boolean evict) {
  Node<K,V>[] tab; Node<K,V> p; int n, i;
  if ((tab = table) == null || (n = tab.length) == 0)
    n = (tab = resize()).length;
  if ((p = tab[i = (n - 1) & hash]) == null) // 此时 p 指向 person a
    tab[i] = newNode(hash, key, value, null);
  else {
    Node<K,V> e; K k;
    if (p.hash == hash &&
        ((k = p.key) == key || (key != null && key.equals(k))))
      e = p;
    else if (p instanceof TreeNode)
      e = ((TreeNode<K,V>)p).putTreeVal(this, tab, hash, key, value);
    else {
      for (int binCount = 0; ; ++binCount) {
        if ((e = p.next) == null) {   // 循环直至 p 指向 person h
          p.next = newNode(hash, key, value, null); // person h 的 next 指向 person g
          // 此时 binCount 达到 7
          if (binCount >= TREEIFY_THRESHOLD - 1) // -1 for 1st
            // 调用 treeifBin
            treeifyBin(tab, hash);
          break;
        }
        if (e.hash == hash &&
            ((k = e.key) == key || (key != null && key.equals(k))))
          break;
        p = e;
      }
    }
    if (e != null) { // existing mapping for key
      V oldValue = e.value;
      if (!onlyIfAbsent || oldValue == null)
        e.value = value;
      afterNodeAccess(e);
      return oldValue;
    }
  }
  ++modCount;
  if (++size > threshold)
    resize();
  afterNodeInsertion(evict);
  return null;
}

~~~

链表达到9时调用 treeifBin() 方法

~~~java
final void treeifyBin(Node<K,V>[] tab, int hash) {
  int n, index; Node<K,V> e;
  // static final int MIN_TREEIFY_CAPACITY = 64
  if (tab == null || (n = tab.length) < MIN_TREEIFY_CAPACITY)
    resize();
  else if ((e = tab[index = (n - 1) & hash]) != null) { // 并未走 else if 转红黑树
    TreeNode<K,V> hd = null, tl = null;
    do {
      TreeNode<K,V> p = replacementTreeNode(e, null);
      if (tl == null)
        hd = p;
      else {
        p.prev = tl;
        tl.next = p;
      }
      tl = p;
    } while ((e = e.next) != null);
    if ((tab[index] = hd) != null)
      hd.treeify(tab);
  }
}
~~~

### 6.2 总结

1. 链表长度达到 9 调用 treeifBin() 方法
2. tab.length == 16 小于 MIN_TREEIFY_CAPACITY 不转红黑树调用 resize() 方法

## 7. 链表结构超过 9 如何扩容

### 7.1 代码

接 6 调用 resize() 方法

~~~java
final Node<K,V>[] resize() {
  Node<K,V>[] oldTab = table;
  int oldCap = (oldTab == null) ? 0 : oldTab.length; // 16
  int oldThr = threshold; // 12
  int newCap, newThr = 0; // 新的容量 新的阈值
  if (oldCap > 0) { // true
    if (oldCap >= MAXIMUM_CAPACITY) { // false
      threshold = Integer.MAX_VALUE;
      return oldTab;
    }
    else if ((newCap = oldCap << 1) < MAXIMUM_CAPACITY && // newCap = oldCap * 2 = 32
             oldCap >= DEFAULT_INITIAL_CAPACITY)
      // oldThr * 2 = 24
      newThr = oldThr << 1; // double threshold
  }
  else if (oldThr > 0) // initial capacity was placed in threshold
    newCap = oldThr;
  else {               // zero initial threshold signifies using defaults
    newCap = DEFAULT_INITIAL_CAPACITY;
    newThr = (int)(DEFAULT_LOAD_FACTOR * DEFAULT_INITIAL_CAPACITY);
  }
  if (newThr == 0) {
    float ft = (float)newCap * loadFactor;
    newThr = (newCap < MAXIMUM_CAPACITY && ft < (float)MAXIMUM_CAPACITY ?
              (int)ft : Integer.MAX_VALUE);
  }
  threshold = newThr;
  @SuppressWarnings({"rawtypes","unchecked"})
  // 新的 Node 数组长度为 32
  Node<K,V>[] newTab = (Node<K,V>[])new Node[newCap];
  table = newTab;
  // 老数组不为空
  if (oldTab != null) {
    // 遍历每个桶位
    for (int j = 0; j < oldCap; ++j) {
      Node<K,V> e;
      if ((e = oldTab[j]) != null) {
        oldTab[j] = null;
        // 不为空，跳过
        if (e.next == null)
          newTab[e.hash & (newCap - 1)] = e;
        // 不为树节点，跳过
        else if (e instanceof TreeNode)
          ((TreeNode<K,V>)e).split(this, newTab, j, oldCap);
        else { // preserve order
          // low，high
          Node<K,V> loHead = null, loTail = null;
          Node<K,V> hiHead = null, hiTail = null;
          Node<K,V> next;
          do {
            next = e.next;
            // hash & oldCap 结果为 0 或者 16
            if ((e.hash & oldCap) == 0) { // 放入低位
              if (loTail == null)
                loHead = e;
              else
                loTail.next = e;
              loTail = e;
            }
            else { // 16，放入高位
              if (hiTail == null)
                hiHead = e;
              else
                hiTail.next = e;
              hiTail = e;
            }
          } while ((e = next) != null);
          if (loTail != null) {
            loTail.next = null;
            newTab[j] = loHead;
          }
          if (hiTail != null) {
            hiTail.next = null;
            newTab[j + oldCap] = hiHead;
          }
        }
      }
    }
  }
  return newTab;
}
~~~

### 7.2 总结

1. 将阈值和数组容量扩容为两倍
2. 复制老table到扩容后的table

## 8. HashMap 扩容后对整条链表的处理

~~~java
final Node<K,V>[] resize() {
  Node<K,V>[] oldTab = table;
  int oldCap = (oldTab == null) ? 0 : oldTab.length; // 16
  int oldThr = threshold; // 12
  int newCap, newThr = 0; // 新的容量 新的阈值
  if (oldCap > 0) { // true
    if (oldCap >= MAXIMUM_CAPACITY) { // false
      threshold = Integer.MAX_VALUE;
      return oldTab;
    }
    else if ((newCap = oldCap << 1) < MAXIMUM_CAPACITY && // newCap = oldCap * 2 = 32
             oldCap >= DEFAULT_INITIAL_CAPACITY)
      // oldThr * 2 = 24
      newThr = oldThr << 1; // double threshold
  }
  else if (oldThr > 0) // initial capacity was placed in threshold
    newCap = oldThr;
  else {               // zero initial threshold signifies using defaults
    newCap = DEFAULT_INITIAL_CAPACITY;
    newThr = (int)(DEFAULT_LOAD_FACTOR * DEFAULT_INITIAL_CAPACITY);
  }
  if (newThr == 0) {
    float ft = (float)newCap * loadFactor;
    newThr = (newCap < MAXIMUM_CAPACITY && ft < (float)MAXIMUM_CAPACITY ?
              (int)ft : Integer.MAX_VALUE);
  }
  threshold = newThr;
  @SuppressWarnings({"rawtypes","unchecked"})
  // 新的 Node 数组长度为 32
  Node<K,V>[] newTab = (Node<K,V>[])new Node[newCap];
  table = newTab;
  // 老数组不为空
  if (oldTab != null) {
    // 遍历每个桶位
    for (int j = 0; j < oldCap; ++j) {
      Node<K,V> e;
      if ((e = oldTab[j]) != null) {
        oldTab[j] = null;
        // 不为空，跳过
        if (e.next == null)
          newTab[e.hash & (newCap - 1)] = e;
        // 不为树节点，跳过
        else if (e instanceof TreeNode)
          ((TreeNode<K,V>)e).split(this, newTab, j, oldCap);
        else { // preserve order
          // low，high
          Node<K,V> loHead = null, loTail = null;
          Node<K,V> hiHead = null, hiTail = null;
          Node<K,V> next;
          do {
            next = e.next;
            // hash & oldCap 结果为 0 或者 16
            if ((e.hash & oldCap) == 0) { // 放入低位
              if (loTail == null)
                loHead = e;
              else
                loTail.next = e;
              loTail = e;
            }
            else { // 16，放入高位
              if (hiTail == null)
                hiHead = e;
              else
                hiTail.next = e;
              hiTail = e;
            }
          } while ((e = next) != null);
          if (loTail != null) {
            loTail.next = null;
            newTab[j] = loHead; // 把oldTab整条链放到32长度的newTab上
          }
          if (hiTail != null) {
            hiTail.next = null;
            newTab[j + oldCap] = hiHead;
          }
        }
      }
    }
  }
  return newTab;
}
~~~

复制老table到扩容后的table

## 9. 当链表到达11个节点的时候转红黑树

~~~java
final void treeifyBin(Node<K,V>[] tab, int hash) {
  int n, index; Node<K,V> e;
  // static final int MIN_TREEIFY_CAPACITY = 64
  // 第九个元素数组为 32
  // put 第十个元素数组扩容为 64， 依旧 resize 把 oldTab 复制给 newTab
  // put 第十一个元素跳过 if
  if (tab == null || (n = tab.length) < MIN_TREEIFY_CAPACITY)
    resize();
  else if ((e = tab[index = (n - 1) & hash]) != null) {
    TreeNode<K,V> hd = null, tl = null;
    do {
      TreeNode<K,V> p = replacementTreeNode(e, null);
      if (tl == null)
        hd = p;
      else {
        p.prev = tl;
        tl.next = p;
      }
      tl = p;
    } while ((e = e.next) != null);
    if ((tab[index] = hd) != null)
      hd.treeify(tab);
  }
}
~~~

## 10. 数组扩容的时候链表如何处理

~~~markdown
16    10000 & 15 = 0    10000 & 16 = 16
32    100000       0                 0
48    110000       0                 16
224   11100000     0                 0
240   11110000     0                 16
64    1010000      0                 0
208   11010000     0                 16
176   110000       0                 16
352   110000       0                 0
~~~

结论：扩容一倍后会拿出一半的数据，放入高位。

resize() 官方文档：

~~~markdown
/**
* Initializes or doubles table size.  If null, allocates in
* accord with initial capacity target held in field threshold.
* Otherwise, because we are using power-of-two expansion, the
* elements from each bin must either stay at same index, or move
* with a power of two offset in the new table.(要么呆在以前位置，要不* 然进行平移)
*
* @return the table
*/
~~~

看代码可知原理：
resize() 中元素 hash 值 & oldCap，如果为零，放入低位链表串，不为零放入高位，因为在一个桶位的元素 hash 值与容量取模的值是一致的，容量二进制只有一个1（16，32，64），所以扩容按位与之后可以平分数据，保证链表的长度一致。之后低位在数组中依旧按老位置摆放，高位间隔老数组长度（平分老数组链表长度）。

~~~java
if (loTail != null) {
  loTail.next = null;
  newTab[j] = loHead; // 低位保持不变
}
if (hiTail != null) {
  hiTail.next = null;
  newTab[j + oldCap] = hiHead; // 高位平移
}
~~~

## 11. 【完结】阈值如何控制扩容

~~~java
final V putVal(int hash, K key, V value, boolean onlyIfAbsent,
               boolean evict) {
  Node<K,V>[] tab; Node<K,V> p; int n, i;
  if ((tab = table) == null || (n = tab.length) == 0)
  if ((p = tab[i = (n - 1) & hash]) == null)
  else {
  }
  ++modCount;
  if (++size > threshold) // 根据 key，value 对进行扩容，而不是桶位数量，key，value 对超过阈值，扩容
    resize();
  afterNodeInsertion(evict);
  return null;
}
~~~

当数组长度扩容到 64，当一个链表长度达到 9 的时候，才会转红黑树。

### 11.1 总结

在一个桶位 put 超过 8 次，链表长度为 9 的时候，HashMap 会尝试转红黑树，如果这时候发现数组长度小于 64(MIN_TREEIFY_CAPACITY)，会选择 resize() 扩容。但这是极端情况，一般情况通过阈值扩容，key value 插入超过阈值进行扩容，当有链表长度到达 9 的时候发现数组长度大于 64（阈值控制早已控制扩容到 64），会选择转红黑树。

当桶位中的链表长度达到 9 的时候，HashMap 会尝试把链表的结构转为红黑树，但是如果数组长度未达到 64，优先选择扩容数组，这是特殊情况（put 的时候逮住一个桶位 put，数组没有扩容)。一般情况是根据老师讲的 key，value 超过阈值，的情况数组已经扩容到 64，继续 put 数据，直到某一个桶位 put 第 9 个数据的时候 HashMap 尝试转红黑树，发现数组也达到 64，就会将桶位上的链表转为红黑树。
