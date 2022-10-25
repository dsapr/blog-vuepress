import{_ as a,r as l,o as r,c as i,a as c,b as p,w as d,F as m,e as n,d as s}from"./app.340c2b94.js";const o={},b=n(`<h2 id="sql\u5B50\u53E5\u7684\u903B\u8F91\u6267\u884C\u987A\u5E8F" tabindex="-1"><a class="header-anchor" href="#sql\u5B50\u53E5\u7684\u903B\u8F91\u6267\u884C\u987A\u5E8F" aria-hidden="true">#</a> SQL\u5B50\u53E5\u7684\u903B\u8F91\u6267\u884C\u987A\u5E8F</h2><h2 id="_1-sql-\u5B50\u53E5\u7684\u903B\u8F91\u6267\u884C\u987A\u5E8F\u548C\u7F16\u5199\u987A\u5E8F\u4E0D\u540C" tabindex="-1"><a class="header-anchor" href="#_1-sql-\u5B50\u53E5\u7684\u903B\u8F91\u6267\u884C\u987A\u5E8F\u548C\u7F16\u5199\u987A\u5E8F\u4E0D\u540C" aria-hidden="true">#</a> 1. SQL \u5B50\u53E5\u7684\u903B\u8F91\u6267\u884C\u987A\u5E8F\u548C\u7F16\u5199\u987A\u5E8F\u4E0D\u540C\uFF1A</h2><h3 id="\u57FA\u7840\u67E5\u8BE2" tabindex="-1"><a class="header-anchor" href="#\u57FA\u7840\u67E5\u8BE2" aria-hidden="true">#</a> \u57FA\u7840\u67E5\u8BE2</h3><div class="language-mysql ext-mysql line-numbers-mode"><pre class="language-mysql"><code>(3)SELECT [DISTINCT | ALL] col1, col2
(1)FROM t1
(2)WHERE where_conditions;
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>\u793A\u4F8B\uFF1A</p><div class="language-mysql ext-mysql line-numbers-mode"><pre class="language-mysql"><code># \u7A0B\u5E8F\u62A5\u9519\uFF1A\u56E0\u4E3A\u6267\u884C WHERE \u7684\u65F6\u5019 SELECT \u8FD8\u672A\u6267\u884C
SELECT emp_id, emp_name AS name
FROM employee e
WHERE name = &#39;\u5F20\u98DE&#39;;
# \u6B63\u786E\u4FEE\u6539\uFF1A
SELECT emp_id, emp_name AS name
FROM employee e
WHERE emp_name = &#39;\u5F20\u98DE&#39;;
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><h3 id="\u5206\u7EC4\u64CD\u4F5C" tabindex="-1"><a class="header-anchor" href="#\u5206\u7EC4\u64CD\u4F5C" aria-hidden="true">#</a> \u5206\u7EC4\u64CD\u4F5C</h3><div class="language-mysql ext-mysql line-numbers-mode"><pre class="language-mysql"><code>(4)SELECT [DISTINCT | ALL] col1, col2, agg_func(col3) AS alias
(1)FROM t1
(2)WHERE where_conditions;
(3)GROUP BY col1, col2;
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>\u793A\u4F8B\uFF1A</p><div class="language-mysql ext-mysql line-numbers-mode"><pre class="language-mysql"><code># SELECT \u4E0D\u5141\u8BB8\u51FA\u73B0\u975E GROUP BY \u5B57\u6BB5
SELECT dept_id\uFF0C avg(salary), emp_name
FROM employee e
GROUP BY dept_id;
-- \u8FD4\u56DE emp_name \u65E0\u4EFB\u4F55\u610F\u4E49\uFF0CMySQL \u4E2D\u4E0D\u4F1A\u51FA\u9519\uFF0CPostgre \u4F1A\u62A5\u9519\uFF0CSQLite \u4F1A\u968F\u673A\u8FD4\u56DE\u4E00\u4E2A\u59D3\u540D
# \u4FEE\u6539 mysql \u884C\u4E3A
SHOW varibles LIKE &#39;sql_node&#39;;
SET sql_mode = &#39;STRICT_TRANS_TABLE,NO_ENGINR_SUBSTITUTION,ONLY_FULL_GROUP_BY&#39;;
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><h3 id="on\u3001having\u3001order-by\u3001offset" tabindex="-1"><a class="header-anchor" href="#on\u3001having\u3001order-by\u3001offset" aria-hidden="true">#</a> ON\u3001HAVING\u3001ORDER BY\u3001OFFSET</h3><div class="language-mysql ext-mysql line-numbers-mode"><pre class="language-mysql"><code>(6)SELECT [DISTINCT | ALL] col1, col2, agg_func(col3) AS alias
(1)FROM t1 JOIN t2
(2)ON (join_conditions)
(3)WHERE where_conditions;
(4)GROUP BY col1, col2;
(5)HAVING having_condition
(7)ORDER BY col1 ASC, col2 DESC
(8)OFFSET m ROWS FETCH NEXT num_rows ROWS ONLY;
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div>`,12),u=s("ON \u548C WHERE \u7684\u6267\u884C\u987A\u5E8F\u53C2\u8003\u6587\u7AE0 "),t=s("WHERE\u3001HAVING\u4EE5\u53CAON"),_=n(`<h3 id="union" tabindex="-1"><a class="header-anchor" href="#union" aria-hidden="true">#</a> UNION</h3><div class="language-mysql ext-mysql line-numbers-mode"><pre class="language-mysql"><code>(6)SELECT [DISTINCT | ALL] col1, col2, agg_func(col3) AS alias
(1)FROM t1 JOIN t2
(2)ON (join_conditions)
(3)WHERE where_conditions;
(4)GROUP BY col1, col2;
(5)HAVING having_condition
(7)UNION [ALL]
	...
(8)ORDER BY col1 ASC, col2 DESC
(9)OFFSET m ROWS FETCH NEXT num_rows ROWS ONLY;
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div>`,2);function h(E,S){const e=l("RouterLink");return r(),i(m,null,[b,c("p",null,[u,p(e,{to:"/sql/WHERE%E3%80%81HAVING%E4%BB%A5%E5%8F%8AON.html"},{default:d(()=>[t]),_:1})]),_],64)}var R=a(o,[["render",h],["__file","SQL\u5B50\u53E5\u7684\u903B\u8F91\u6267\u884C\u987A\u5E8F.html.vue"]]);export{R as default};
