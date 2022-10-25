import{_ as e,e as n}from"./app.340c2b94.js";const s={},a=n(`<h2 id="\u5206\u9875\u67E5\u8BE2\u90A3\u4E9B\u4E8B" tabindex="-1"><a class="header-anchor" href="#\u5206\u9875\u67E5\u8BE2\u90A3\u4E9B\u4E8B" aria-hidden="true">#</a> \u5206\u9875\u67E5\u8BE2\u90A3\u4E9B\u4E8B</h2><blockquote><p>\u5206\u9875\u67E5\u8BE2\u662F\u6307\u4E3A\u4E86\u6539\u5584\u524D\u7AEF\u7528\u6237\u7684\u4F53\u9A8C\u548C\u7CFB\u7EDF\u6027\u80FD\uFF0C\u5C06\u67E5\u8BE2\u7ED3\u679C\u5206\u6279\u8FD4\u56DE\u548C\u5C55\u793A\u3002\u5206\u9875\u67E5\u8BE2\u5E38\u7528\u7684\u4E24\u79CD\u65B9\u5F0F\uFF1A</p><ol><li>OFFSET \u5206\u9875\u3002\u5229\u7528 SQL \u6807\u51C6 OFFSET FETCH \u6216\u8005 LIMIT OFFSET \u5B50\u53E5\u5236\u5B9A\u504F\u79FB\u91CF\u548C\u8FD4\u56DE\u7684\u884C\u6570\uFF0C\u6027\u80FD\u968F\u7740\u504F\u79FB\u91CF\u7684\u589E\u52A0\u660E\u663E\u4E0B\u964D\u3002</li><li>Keyset \u5206\u9875\uFF0C\u5229\u7528\u6BCF\u6B21\u8FD4\u56DE\u7684\u8BB0\u5F55\u96C6\u67E5\u627E\u4E0B\u4E00\u6B21\u7684\u6570\u636E\uFF0C\u6027\u80FD\u4E0D\u53D7\u6570\u636E\u91CF\u548C\u504F\u79FB\u91CF\u7684\u5F71\u54CD\u3002\u53EF\u4EE5\u5B9E\u73B0\u9875\u9762\u65E0\u9650\u6EDA\u52A8\u6548\u679C\u3002</li></ol></blockquote><p>\u521B\u5EFA\u7528\u6237\u8868</p><div class="language-mysql ext-mysql line-numbers-mode"><pre class="language-mysql"><code>CREATE TABLE users(
  id integer PRIMARY KEY,
  name varchar(50) NOT NULL,
  pswd varchar(50) NOT NULL,
  email varchar(50),
  create_time timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
  notes varchar(200)
);
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><p>\u751F\u6210\u793A\u4F8B\u6570\u636E</p><div class="language-mysql ext-mysql line-numbers-mode"><pre class="language-mysql"><code>-- \u751F\u6210\u793A\u4F8B\u6570\u636E
-- MySQL\u8BED\u6CD5
INSERT INTO users(id, name, pswd, email,create_time)
WITH RECURSIVE t(id, name, pswd, email,create_time) AS (
SELECT 1, CAST(concat(&#39;user&#39;, 1) AS char(50)), &#39;e10adc3949ba59abbe56e057f20f883e&#39;, CAST(concat(&#39;user&#39;,1,&#39;@test.com&#39;) AS char(50)), &#39;2020-01-01 00:00:00&#39;
UNION ALL
SELECT id+1, concat(&#39;user&#39;, id+1), pswd, concat(&#39;user&#39;,id+1,&#39;@test.com&#39;), create_time+ INTERVAL mod(id,2) MINUTE
FROM t WHERE id&lt;1000000
)
SELECT /*+ SET_VAR(cte_max_recursion_depth = 1M) */* FROM t;
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><p>count \u4F18\u5316</p><div class="language-mysql ext-mysql line-numbers-mode"><pre class="language-mysql"><code>SELECT count(*)
FROM users;
-- \u4F18\u5316
1. \u662F\u5426\u6709\u5FC5\u8981\u8FD4\u56DE\u6240\u6709count(*), \u5982\u679C\u6709\u5FC5\u8981\uFF0C\u57FA\u4E8E\u7D22\u5F15\u6761\u4EF6\u641C\u7D22
2. EXPLAIN \u8FD4\u56DE rows \u5927\u6982\u8BC4\u4F30\u6570\u91CF
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><h3 id="offset-\u5B9E\u73B0\u4F18\u5316" tabindex="-1"><a class="header-anchor" href="#offset-\u5B9E\u73B0\u4F18\u5316" aria-hidden="true">#</a> OFFSET \u5B9E\u73B0\u4F18\u5316</h3><div class="language-mysql ext-mysql line-numbers-mode"><pre class="language-mysql"><code>EXPLAIN
SELECT *
FROM users
WHERE create_time
ORDER BY create_time, id -- 1. \u4F18\u5316 \u521B\u5EFAcreate_time\u7D22\u5F15\uFF0Cid \u81EA\u5E26\u7D22\u5F15
LIMIT 20 OFFSET 100000; -- OFFSET \u6570\u91CF\u8FC7\u5927\u65F6\u901F\u5EA6\u51CF\u6162

-- \u7F3A\u70B9\uFF1A\u4F9D\u7136\u626B\u63CF\u7D22\u5F15\uFF0C\u6452\u5F03LIMIT\u4E4B\u524D\u7684\u6570\u636E\uFF0C\u626B\u63CF\u6570\u91CF\u8FC7\u591A\u8FD8\u662F\u626B\u63CF\u5168\u8868
CREATE INDEX idx_users_ct ON users(create_time);
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><h3 id="keyset-\u65B9\u5F0F\u4F18\u5316" tabindex="-1"><a class="header-anchor" href="#keyset-\u65B9\u5F0F\u4F18\u5316" aria-hidden="true">#</a> Keyset \u65B9\u5F0F\u4F18\u5316</h3><div class="language-mysql ext-mysql line-numbers-mode"><pre class="language-mysql"><code>SELECT *
FROM users
WHERE create_time &gt;= &#39;2020-01-01 00:10:00&#39; AND id &gt; 20
ORDER BY create_time, id
LIMIT 20;

-- create_time \u6709\u7D22\u5F15\uFF0C\u6839\u636E\u4E0A\u6B21\u67E5\u8BE2\u7ED3\u679C\u76F4\u63A5\u627E\u5230\u67D0\u4E00\u884C\u8BB0\u5F55\u5411\u540E LIMIT
-- \u7F3A\u70B9\uFF1A\u4E0D\u80FD\u5236\u5B9A\u9875\u7801\u8DF3\u9875
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><table><thead><tr><th style="text-align:center;">\u7F16\u7A0B\u8BED\u8A00</th><th style="text-align:center;">Java</th><th style="text-align:center;">Javascript</th><th style="text-align:center;">Python</th><th style="text-align:center;">PHP</th></tr></thead><tbody><tr><td style="text-align:center;">Keyset\u5206\u9875\u6846\u67B6</td><td style="text-align:center;">JOOQ Blaze-Persistence</td><td style="text-align:center;">Node.js Massive.js</td><td style="text-align:center;">SQL Alchemy Django</td><td style="text-align:center;">Laravel 8.0+</td></tr></tbody></table>`,13);function r(l,t){return a}var c=e(s,[["render",r],["__file","SQL\u5206\u9875\u90A3\u4E9B\u4E8B.html.vue"]]);export{c as default};
