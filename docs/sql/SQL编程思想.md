

# SQL 编程思想

## 员工考勤记录

> 公司规定周一到周五（节假日除外）每天早上九点上班，下午六点下班，上下班都需要打卡。日历信息存储calendar表中，员工的打卡记录存储在attendance表中：

|  id  | check_date | emp_id |      clock_in       |      clock_out      |
| :--: | :--------: | :----: | :-----------------: | :-----------------: |
|  1   | 2022-04-17 |   1    | 2022-04-17 08:34:02 | 2022-04-17 18:32:03 |
|  2   | 2022-04-17 |   2    | 2022-04-17 08:10:03 | 2022-04-17 19:31:02 |
|  3   | 2022-04-17 |   3    | 2022-04-17 08:55:08 | 2022-04-17 18:33:02 |
| ...  |    ...     |  ...   |         ...         |         ...         |

HR想要统计2022年4月份的员工缺勤记录，请问如何通过SQL查询相关记录？

~~~sql
SELECT c.calendar_date, e.emp_name, a.clock_in, a.clock_out,
			 CASE WHEN a.clock_out IS NULL "缺勤"
			 			WHEN EXTRACT(HOUR FROM a.clock_in) >= 9 THEN "迟到"
			 			ELSE "早退"
			 END AS "考勤状态"
FROM calendar c
CROSS JOIN employee e
LEFT JOIN attendance a
ON (a.check_date = c.calendara_date AND a.emp_id = e.emp_id)
WHERE c.calendar_year = 2021 AND c.calendar_month = 4 AND c.is_work_day = 'Y'
AND (a.id IS NULL
     OR a.clock_out IS NULL
     OR EXTRACT(HOUR FROM a.clock_in) >= 9
     OR EXTRACT(HOUR FROM a.clock_out) < 18);
~~~



## CASE 条件表达式

> 公司即将成立 20 周年，打算给全体员工发放一个周年庆礼品。
>
> 发放礼品的规则如下：
>
> - 截止 2020 年入职年限不满 10 年的员工，男性员工的礼品为手表一块，女性员工的礼品为化妆品一套；
> - 截至 2020 年入职年限满 10 年不满 15 年的员工，男性员工的礼品为手机一部，女性的礼品为项链一条
> - 截至 2020 年入职年限满 15 年的员工，不论男女礼品统一为电脑一台
>
> 现在人事部门需要指导为每位员工发放什么礼品，如何通过SQL查询得到这些信息？

员工信息表：emp_id, amp_name, sex, dept_id, manager, hire_date, job_id, salary, bonus, emails

~~~mysql
SELECT emp_name, sex, hire_date,
			 CASE
				 WHEN extract(year FROM hire_date) > 2011 AND sex = '男' THEN '手表'
				 WHEN extract(year FROM hire_date) > 2011 AND sex = '女' THEN '化妆品'
				 WHEN extract(year FROM hire_date) > 2006 AND sex = '男' THEN '手机'
				 WHEN extract(year FROM hire_date) > 2006 AND sex = '女' THEN '项链'
				 ELSE '电脑'
			 END AS "礼品"
FROM employee;
~~~

## 数据报表行列转换

> 学生成绩记录表包含以下信息

| sname | cname | grade |
| :---: | :---: | :---: |
| 张三  | 语文  |  80   |
| 李四  | 语文  |  77   |
| 王五  | 语文  |  91   |
| 张三  | 数学  |  85   |
| 李四  | 数学  |  90   |
| 王五  | 数学  |  60   |
|  ...  |  ...  |  ...  |

> 要求以每个学生一行数据的形式创建以下报表：

| 姓名 | 语文 | 数学 | 英语 |
| :--: | :--: | :--: | :--: |
| 张三 |  80  |  85  |  81  |
| 李四 |  77  |  90  |  69  |
| 王五 |  91  |  60  |  82  |

~~~mysql
SELECT sname AS "姓名",
			 sum(CASE cname WHEN '语文' THEN grade END) AS "语文",
			 sum(CASE cname WHEN '数学' THEN grade END) AS "数学",
			 sum(CASE cname WHEN '英语' THEN grade END) AS "英语",
			 sum(grade) AS "总分"
FROM t_score ts
GROUP BY sname;
~~~



# SQL 面试题

## 基于扫码记录 查找密接人员

|    uid    | area |      scan_time      |
| :-------: | :--: | :-----------------: |
| 130111111 | A001 | 2022-05-01 09:00:00 |
| 130111111 | A001 | 2022-05-01 10:00:00 |
| 130111111 | A001 | 2022-05-01 11:00:00 |
| 130222222 | A002 | 2022-05-01 11:05:00 |
|    ...    | ...  |         ...         |

### 问题一

- 找出每个用户在每个区域的行动轨迹

~~~mysql
WITH tmp AS (
SELECT uid, area, scan_time,
	   -- 扫描时间排序 - 区域划分后扫描时间排序
	   ROW_NUMBER() OVER (PARTITION BY scan_time) num1 - ROW_NUMBER() OVER (PARTITION BY scan_time, area ORDER BY scan_time) diff
FROM trail)
SELECT uid, area, min(scan_time) start_time, max(scan_time) end_time
FROM tmp 
GROUP BY uid, area, diff
ORDER BY uid, scan_time;
~~~

### 问题二

- 加入某个用户核酸检查为阳性，找出他的伴随人员

  伴随规则：在阳性人员停留半小时以上的区域，用户停留半小时以上，并且停留时间和阳性人员有十分钟以上的交集。

  ![SQL编程思想-面难题-查找密接1](../.vuepress/public/images/SQL编程思想-面难题-查找密接1.png)

~~~mysql
WITH tmp AS (
SELECT uid, area, scan_time,
	   -- 扫描时间排序 - 区域划分后扫描时间排序
	   ROW_NUMBER() OVER (PARTITION BY scan_time) num1 - ROW_NUMBER() OVER (PARTITION BY scan_time, area ORDER BY scan_time) diff
FROM trail),
tmp2 AS (
SELECT uid, area, min(scan_time) start_time, max(scan_time) end_time
FROM tmp 
GROUP BY uid, area, diff
HAVING min(scan_time) + INTERVAL 30 MINUTE <= max(scan_time)
)
SELECT *
FROM tmp2 u1
JOIN tmp2 u2
ON (u1.uid <> u2.uid AND u1.area = u2.area
	AND u1.start_time + INTERVAL 10 MINUTE <= u2.end_time
	AND u2.start_time + INTERVAL 10 MINUTE <= u1.end_time)
WHERE u1.uid = "13011111111";
~~~

### 思考

- 算出和密接人员接触的时间
