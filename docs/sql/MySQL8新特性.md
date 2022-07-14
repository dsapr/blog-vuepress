# MySQL 8.0 新特性

## 第13篇 窗口函数基本概念

MySQL 8.0 支持窗口函数（Window Function），也称分析函数。窗口函数与分组聚合函数类似，但是每一行数据都生成一个结果。

聚合窗口函数：SUM / AVG / COUNT / MAX / MIN 等等。

~~~mysql
select year,country,product,prifit,
sum(profit) OVER (partition by country) as country_profit
from sales
order by country, year, product, profit;
~~~

## 第14篇 专用窗口函数

ROW_NUMBER() / RANK() / DENSE_RANK() / PERCENT_RANK()

FIRST_VALUE() / LAST_VALUE() / LEAD() / LAG()

CUME_DIST() / NTH_VALUE() / NTILE()

## 第15篇 窗口函数中的窗口定义

~~~sql
window_function(expr)
	OVER (
  	PARTITION BY ...
    ORDER BY ...
    frame_clause...
  )
 
-- CURRENT ROW
-- M PRECEDING 当前行到前 M 行
-- N FOLLOWING 当前行到后 N 行
-- UNBOUNDED PRECEDING 当前行到第一行
-- UNBOUNDED FOLLOWING 当前行到最后一行
~~~

