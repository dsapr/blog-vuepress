# SQL 入门教程



## 23 分组过滤



## 56 截断表

### TRUNCATE TABLE

SQL 标准中，使用 TRUNCATE TABLE 语句截断一个表，即删除表中的所有数据。

~~~mysql
-- Except for Db2 and SQLite
TRUNCATE TABLE table_name;

-- Db2
TRUNCATE TABLE table_name IMMEDIATE;
~~~

- MySQL、PostgerSQL 和 Db2 中的 TABLE 关键字可以省略；
- SQLite 不支持 `TRUNCATE TABLE` 语句

### 级联截断

截断副表和删除副表一样违反外键约束，有一些数据库做了扩展（如 oracle，Postgre），会级联删除下面表的数据

~~~sql
-- 级联截断字表中的数据
TRUNCATE TABLE table_name CASCADE; 
-- postgre 支持截断多张表
TRUNCATE TABLE table_name, table_name2 CASCADE;
~~~

对于 sqllite 没有截断操作，可以采用 delete 操作，sqllite 会进行优化，相当于进行了截断操作，也很快。

~~~sqlite
DELETE FROM table_name;
~~~

### 数据库差异

除 SQLite 之外的其他数据库产品都实现了 SQL 标准中的 TRUNCATE TABLE 语句。

|   数据库   | 截断表 |                注释                |
| :--------: | :----: | :--------------------------------: |
|   Oracle   |   √    |            支持级联操作            |
|   MySQL    |   √    |                                    |
| SQL Server |   √    |                                    |
| PostgreSQL |   √    |  支持级联操作，可以同时截断多个表  |
|    Db2     |   √    |                                    |
|   SQLite   |   √    | 通过特定的 DELETE 语句实现相同效果 |

