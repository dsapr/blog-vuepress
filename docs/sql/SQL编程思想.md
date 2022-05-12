

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
