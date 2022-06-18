## SQL子句的逻辑执行顺序

## 1. SQL 子句的逻辑执行顺序和编写顺序不同：

### 基础查询

~~~mysql
(3)SELECT [DISTINCT | ALL] col1, col2
(1)FROM t1
(2)WHERE where_conditions;
~~~

示例：

~~~mysql
# 程序报错：因为执行 WHERE 的时候 SELECT 还未执行
SELECT emp_id, emp_name AS name
FROM employee e
WHERE name = '张飞';
# 正确修改：
SELECT emp_id, emp_name AS name
FROM employee e
WHERE emp_name = '张飞';
~~~

### 分组操作

~~~mysql
(4)SELECT [DISTINCT | ALL] col1, col2, agg_func(col3) AS alias
(1)FROM t1
(2)WHERE where_conditions;
(3)GROUP BY col1, col2;
~~~

示例：

~~~mysql
# SELECT 不允许出现非 GROUP BY 字段
SELECT dept_id， avg(salary), emp_name
FROM employee e
GROUP BY dept_id;
-- 返回 emp_name 无任何意义，MySQL 中不会出错，Postgre 会报错，SQLite 会随机返回一个姓名
# 修改 mysql 行为
SHOW varibles LIKE 'sql_node';
SET sql_mode = 'STRICT_TRANS_TABLE,NO_ENGINR_SUBSTITUTION,ONLY_FULL_GROUP_BY';
~~~

### ON、HAVING、ORDER BY、OFFSET

~~~mysql
(6)SELECT [DISTINCT | ALL] col1, col2, agg_func(col3) AS alias
(1)FROM t1 JOIN t2
(2)ON (join_conditions)
(3)WHERE where_conditions;
(4)GROUP BY col1, col2;
(5)HAVING having_condition
(7)ORDER BY col1 ASC, col2 DESC
(8)OFFSET m ROWS FETCH NEXT num_rows ROWS ONLY;
~~~

ON 和 WHERE 的执行顺序参考文章 [WHERE、HAVING以及ON](../sql/WHERE、HAVING以及ON.md) 

### UNION

~~~mysql
(6)SELECT [DISTINCT | ALL] col1, col2, agg_func(col3) AS alias
(1)FROM t1 JOIN t2
(2)ON (join_conditions)
(3)WHERE where_conditions;
(4)GROUP BY col1, col2;
(5)HAVING having_condition
(7)UNION [ALL]
	...
(8)ORDER BY col1 ASC, col2 DESC
(9)OFFSET m ROWS FETCH NEXT num_rows ROWS ONLY;
~~~

















