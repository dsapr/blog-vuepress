# WHERE、HAVING以及ON的区别

## 问题解答

WHERE 与 HAVING 的根本区别在于

- WHERE 子句在 GROUP BY 分组和数据**汇总**之前对数据进行过滤；
- HAVING 子句在 GROUP BY 分组和数据**汇总**之后对数据进行过滤；

~~~mysql
SELECT col1, sum(col2)
FROM t
WHERE codition
GROUP BY col1
HAVING codition;
~~~

~~~mysql
SELECT dept_id, count(*)
FROM employee e
WHERE salary > 10000
GROUP BY dept_id
HAVING count(*) > 1;
~~~

连接查询中，WHERE 和 ON 的主要区别在于：

- 对于内连接查询，WHERE 子句和 ON 子句等效
- 对于外连接查询，ON 子句在连接操作**之前**执行，WHERE 子句在（逻辑上）在连接操作**之后**执行。

~~~mysql
SELECT ...
FROM t1
JOIN t2 ON (codition)
WHERE codition;
~~~

~~~mysql
-- 对于内连接查询，WHERE 子句和 ON 子句等效
SELECT * 
FROM department d, employee e
WHERE d.dept_id = e.dept_id
AND d.dept_name = '财务部';

SELECT * 
FROM department d
JOIN employee e ON (d.dept_id = e.dept_id AND d.dept_name = '财务部');

SELECT * 
FROM department d
JOIN employee e ON (d.dept_id = e.dept_id)
WHERE d.dept_name = '财务部';

-- 对于外连接查询，ON 子句在连接操作之前执行，WHERE 子句（逻辑上）在连接操作之后执行。
-- ON 条件执行后，左链接依然返回基准表所有信息，条件过滤失效
SELECT * 
FROM department d
LEFT JOIN employee e ON (d.dept_id = e.dept_id AND d.dept_name = '保卫部');
-- 左连接返回基准表所有信息后（逻辑上是连接操作后过滤，实际是扫描时就过滤），WHERE 过滤有效
SELECT * 
FROM department d
LEFT JOIN employee e ON (d.dept_id = e.dept_id)
WHERE d.dept_name = '保卫部';
~~~

