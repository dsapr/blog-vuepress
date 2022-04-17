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

