# 关于 ArrayList 那些事

## new ArrayList<>(0) 是什么操作
首先我们要知道 ArrayList 中的两个成员变量：
- Object[] EMPTY_ELEMENTDATA = {};
- Object[] DEFAULTCAPACITY_EMPTY_ELEMENTDATA

这两个成员变量乍一看名字都是默认成员变量数组，好像都一样，但是为什么要定义两个空的成员变量数组呢？


源码：
~~~ java
~~~

### 请问一共扩容了几次？