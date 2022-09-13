# MVCC

读-读不会发生并发冲突，写-写发生冲突的概率比较小，加锁就可以解决。

多版本并发控制（MVCC）可以解决读-写并发冲突，提高并发性能。

简单来说，MVCC 就是存储了同一条数据的不同历史版本链，不同事物可以访问不同的数据版本。

InnoDB 中在主键的聚集索引上加入了两个重要的隐藏字段：

- DB_TRX_ID，创建或者修改数据的事务ID；

- DB_ROLL_PTR，回滚指针，指向记录的上一个版本。

多版本数据链使用UNDO日志实现。

## 当前读和快照读

当前读就是读取记录的当前（最新）版本，其他事务不能修改记录。

~~~mysql
- SELECT ... LOCK IN SHARE MODE
- SELECT ... FOR UPDATE
- INSERT
- UPDATE
- DELETE
~~~

快照读（SELECT）是指读取 MVCC 版本链中的某个快照版本，不需要加锁。

## Read View

Read View 是事务进行快照读生产的读视图，记录并维护系统当前活跃的事务id。

- rw_trx_ids: 生成 Read View 时，当前活跃的事务 id 数组。
- min_trx_id: rw_trx_ids 中最小的事务 id 。
- max_trx_id: 生成 Read View 时，将要分配给下一个事务的 id。
- curr_trx_id: 创建 Read View 的当前事务 id。