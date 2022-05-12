## 分页查询那些事

> 分页查询是指为了改善前端用户的体验和系统性能，将查询结果分批返回和展示。分页查询常用的两种方式：
>
> 1. OFFSET 分页。利用 SQL 标准 OFFSET FETCH 或者 LIMIT OFFSET 子句制定偏移量和返回的行数，性能随着偏移量的增加明显下降。
> 2. Keyset 分页，利用每次返回的记录集查找下一次的数据，性能不受数据量和偏移量的影响。可以实现页面无限滚动效果。

创建用户表

~~~mysql
CREATE TABLE users(
  id integer PRIMARY KEY,
  name varchar(50) NOT NULL,
  pswd varchar(50) NOT NULL,
  email varchar(50),
  create_time timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
  notes varchar(200)
);
~~~

生成示例数据

~~~mysql
-- 生成示例数据
-- MySQL语法
INSERT INTO users(id, name, pswd, email,create_time)
WITH RECURSIVE t(id, name, pswd, email,create_time) AS (
SELECT 1, CAST(concat('user', 1) AS char(50)), 'e10adc3949ba59abbe56e057f20f883e', CAST(concat('user',1,'@test.com') AS char(50)), '2020-01-01 00:00:00'
UNION ALL
SELECT id+1, concat('user', id+1), pswd, concat('user',id+1,'@test.com'), create_time+ INTERVAL mod(id,2) MINUTE
FROM t WHERE id<1000000
)
SELECT /*+ SET_VAR(cte_max_recursion_depth = 1M) */* FROM t;
~~~

count 优化

~~~mysql
SELECT count(*)
FROM users;
-- 优化
1. 是否有必要返回所有count(*), 如果有必要，基于索引条件搜索
2. EXPLAIN 返回 rows 大概评估数量
~~~

### OFFSET 实现优化

~~~mysql
EXPLAIN
SELECT *
FROM users
WHERE create_time
ORDER BY create_time, id -- 1. 优化 创建create_time索引，id 自带索引
LIMIT 20 OFFSET 100000; -- OFFSET 数量过大时速度减慢

-- 缺点：依然扫描索引，摒弃LIMIT之前的数据，扫描数量过多还是扫描全表
CREATE INDEX idx_users_ct ON users(create_time);
~~~

### Keyset 方式优化

~~~mysql
SELECT *
FROM users
WHERE create_time >= '2020-01-01 00:10:00' AND id > 20
ORDER BY create_time, id
LIMIT 20;

-- create_time 有索引，根据上次查询结果直接找到某一行记录向后 LIMIT
-- 缺点：不能制定页码跳页
~~~

|    编程语言    |          Java          |     Javascript     |       Python       |     PHP      |
| :------------: | :--------------------: | :----------------: | :----------------: | :----------: |
| Keyset分页框架 | JOOQ Blaze-Persistence | Node.js Massive.js | SQL Alchemy Django | Laravel 8.0+ |