import{_ as n,e as s}from"./app.340c2b94.js";const a={},e=s(`<h1 id="\u8FDE\u7EED\u767B\u9646\u95EE\u9898" tabindex="-1"><a class="header-anchor" href="#\u8FDE\u7EED\u767B\u9646\u95EE\u9898" aria-hidden="true">#</a> \u8FDE\u7EED\u767B\u9646\u95EE\u9898</h1><h2 id="\u95EE\u9898\u63CF\u8FF0" tabindex="-1"><a class="header-anchor" href="#\u95EE\u9898\u63CF\u8FF0" aria-hidden="true">#</a> \u95EE\u9898\u63CF\u8FF0</h2><p>t_login \u8868\u8BB0\u5F55\u4E86\u7528\u6237\u6BCF\u6B21\u767B\u9646\u7684\u65F6\u95F4\u4FE1\u606F\uFF1A</p><table><thead><tr><th>uid</th><th>login_time</th></tr></thead><tbody><tr><td>1</td><td>2022-01-01 08:05:11</td></tr><tr><td>2</td><td>2022-01-01 10:00:00</td></tr><tr><td>3</td><td>2022-01-01 12:13:14</td></tr><tr><td>1</td><td>2022-01-01 19:30:00</td></tr><tr><td>...</td><td>...</td></tr></tbody></table><p>\u5982\u4F55\u901A\u8FC7 SQL \u67E5\u8BE2\u627E\u51FA 2022\u5E741\u6708 \u8FDE\u7EED\u767B\u96463\u5929\u4EE5\u4E0A\u7684\u7528\u6237\uFF1F</p><div class="language-mssql ext-mssql line-numbers-mode"><pre class="language-mssql"><code>SELECT t1.uid, t2.ymd, t3.ymd
FROM (SELECT DISTINCT uid, date(login_time) ymd
FROM t_login
WHERE login_time BETWEEN timestamp &#39;2022-01-01 00:00:00&#39; AND timestamp &#39;2022-01-31 23:59:59&#39;) t1
JOIN (SELECT DISTINCT uid, date(login_time) ymd
FROM t_login
WHERE login_time BETWEEN timestamp &#39;2022-01-01 00:00:00&#39; AND timestamp &#39;2022-01-31 23:59:59&#39;) t2
ON (t1.uid = t2.uid AND datediff(t2.ymd, t1.ymd)=1)
JOIN (SELECT DISTINCT uid, date(login_time) ymd
FROM t_login
WHERE login_time BETWEEN timestamp &#39;2022-01-01 00:00:00&#39; AND timestamp &#39;2022-01-31 23:59:59&#39;) t3
ON (t2.uid = t3.uid AND datediff(t3.ymd, t2.ymd)=1);
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br></div></div><div class="language-mysql ext-mysql line-numbers-mode"><pre class="language-mysql"><code>WITH t1 AS (SELECT DISTINCT uid, date(login_time) ymd
FROM t_login
WHERE login_time BETWEEN timestamp &#39;2022-01-01 00:00:00&#39; AND timestamp &#39;2022-01-31 23:59:59&#39;),
t2 AS (SELECT uid, ymd,
			 date_sub(ymd, INTERVAL ROW_NUMBER() OVER (PARTITION BY uid ORDER BY ymd) day) sub_date
FROM t1)
SELECT uid, min(ymd), max(ymd), count(*)
FROM t2
GROUP BY uid, sub_date
HAVING count(*) &gt;= 3;
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><div class="language-mysql ext-mysql line-numbers-mode"><pre class="language-mysql"><code>WITH t1 AS (SELECT DISTINCT uid, date(login_time) ymd
FROM t_login
WHERE login_time BETWEEN timestamp &#39;2022-01-01 00:00:00&#39; AND timestamp &#39;2022-01-31 23:59:59&#39;),
t2 AS (
SELECT uid, ymd,
			 dateiff(ymd, lag(ymd, 2) OVER (PARTITION BY uid ORDER BY ymd)) diff
FROM t1)
SELECT uid, ymd, diff
FROM t2
WHERE diff = 2;
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div>`,8);function t(i,d){return e}var r=n(a,[["render",t],["__file","\u8FDE\u7EED\u767B\u9646\u95EE\u9898.html.vue"]]);export{r as default};
