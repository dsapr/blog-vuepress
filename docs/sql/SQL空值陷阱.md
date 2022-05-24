# SQL 空值陷阱

## 三值逻辑
数据库中的空值（NULL）是一个特殊的值，代表了缺失的数据或者不适用的情况。

SQL 逻辑运算的结果存在三种情况：真、假或者未知（Unknown）。

~~~mysql
SELECT 2=2;
-- true
SELECT 1=2;
-- false
SELECT null=2; -- 因为 null 是未知的，所以结果也是未知的
-- [NULL]
SELECT null!=0;
-- [NULL]
SELECT null=''; -- 空字符串是确定的值，而 null 是未知的
-- [NULL]
SELECT NULL=NULL;
-- [NULL]
SELECT NULL=NULL;
-- [NULL]
~~~

## 空值比较

在 SQL 语句中，任何数据与空值进行算数比较的结果既不是真，也不是假，而是未知。

判断数据是否为空的 `IS NULL` 和 `IS NOT NULL` 运算符。

~~~mysql
SELECT *
FROM employee e
WHERE manager is NOT null;

-- 不会返回任何数据
-- IN 和 NOT IN 实际上使用的的等于号
SELECT *
FROM employee e
WHERE emp_id NOT IN (1,2,3,null);
-- 等价于
SELECT *
FROM employee e
WHERE emp_id != 1
AND emp_id != 2
AND emp_id != 3
AND emp_id != null; # 导致表达式结果为未知
~~~

## 空值分组

分组操作中的多个空值会被看作是相同的数据，包括：

- GROUP BY 子句
- DISTINCT 子句
- UNION 运算符
- 窗口函数中的 PARTITION BY 子句

## 空值排序

SQL 标准没有明确定义空值得排列顺序，导致不同数据库实现了2种空值排序位置：

- MySQL、Microsoft SQL Server 以及 SQLite 认为排序时空值最小，升序排序时空值排在最前面，降序排序时空值排在最后。
- Oracle 和 PostgreSQL 认为排序时空值最大，升序排序时空值排在最后，降序排序时空值排在最前。
- Oracle、postgerSQL 以及 SQLite 支持使用 NULLS FIRST 和 NULLS LAST 指定空值排序的位置。

~~~sql
# 进行数据库迁移的时候我们要了解执行内容，要做一个代码的转换，防止切换过去后顺序是不一样的
SELECT emp_name, bonus
FROM employee e
ORDER BY bonus NULLS FRIST;
~~~

## 函数中的空值

一般来说，当表达式或者函数的参数中存在空值时，返回结果也是空值。空值在函数中具有传递性。

聚合函数（AVG、SUM、COUNT 等）通常都会忽略输入中的空值。

~~~mysql
SELECT 100+NULL, upper(NULL);
-- [NULL] [NULL]

# mysql 因为拼接了 NULL 结果返回还是为空
SELECT concat('sql', NULL);
-- [NULL]

# oracle 中会忽略空值
# 但是 oracle 好像认为 NULL 和 空字符串相等，存空字符串会查出来 NULL
SELECT concat('sql', NULL)
FROM dual;
-- sql

-- 聚合函数会去除 NULL 后再进行计算
SELECT count(*), count(bouns)
FROM employee e;
-- 25 9
~~~

## 空值处理函数

为了避免空值可能带来的问题，我们可以利用函数将空值转换为其他数据。SQL 标准中定义了两个与空值相关的函数：COALESCE 和 NULLIF。

~~~mysql
SELECT emp_name, salary * 12 + bonus -- 当 bonus 为空整个函数结果为空
FROM employee e;

SELECT emp_name, salary * 12 + COALESCE(bonus, 0, 1, 2) -- 当 bonus 为空则转换为 0
FROM employee e;

SELECT *
FROM employee e
WHERE 1/1 = 1;

# mysql 不会返回错误，postgre会返回错误
SELECT *
FROM employee e
WHERE 1/0 = 1;

SELECT *
FROM employee e
WHERE 1/NULLIF(0, 0) = 1; -- 如果参数为零使整个表达式为空，避免除0错误
~~~

## 空值和约束

在设计表结构时，如果不允许字段中存在未知或者缺失的数据，可以为该字段指定非空（NOT NULL）约束。

数据库会对插入和更新的数据进行检查，如果没有为空字段提供数据或者默认值则会返回错误。

### 例外情况

~~~sql
CREATE TABLE t_notnull(v varchar(10) NOT NULL);
-- oracle 中可以插入空字符串，但是查询结果为 NULL
INSERT INTO t_notnull VALUES ('');
~~~

### 约束

~~~sql
-- 唯一约束并不能限制多个 null 的存储
-- sqlServer 唯一索引只能允许一个 null 存在，其他数据库可以允许多个
CREATE TABLE t_unique(i int UNIQUE);
INSERT INTO t_unique VALUES (null);
INSERT INTO t_unique VALUES (null);

CREATE TABLE t_check(c1 int CHECK(c1>=0), c2 int CHECK(c2>=0), CHECK(c1+c2<=100));

INSERT t_check values(1,1);
-- 检查约束要求插入值满足条件，但是如果是不确定结果也是满足条件的，也会通过
INSERT t_check values(null,null);
INSERT t_check values(1000,null);
~~~

