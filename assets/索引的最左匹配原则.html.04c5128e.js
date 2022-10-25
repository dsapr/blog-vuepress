import{_ as n,e as s}from"./app.340c2b94.js";const a={},e=s(`<h1 id="\u7D22\u5F15\u7684\u6700\u5DE6\u5339\u914D\u539F\u5219" tabindex="-1"><a class="header-anchor" href="#\u7D22\u5F15\u7684\u6700\u5DE6\u5339\u914D\u539F\u5219" aria-hidden="true">#</a> \u7D22\u5F15\u7684\u6700\u5DE6\u5339\u914D\u539F\u5219</h1><h2 id="\u6848\u4F8B" tabindex="-1"><a class="header-anchor" href="#\u6848\u4F8B" aria-hidden="true">#</a> \u6848\u4F8B</h2><div class="language-mysql ext-mysql line-numbers-mode"><pre class="language-mysql"><code>CREATE TABLE test(
	id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  col1 INT,
  col2 INT,
  col3 INT);

CREATE INDEX inx_c1c2 ON test(col1, col2);

# \u9012\u5F52\u751F\u6210\u6D4B\u8BD5\u6570\u636E
SET SESSION cte_max_recursion_dept = 999999;

INSERT INTO test(col1, col2, col3)
WItH RECURSIVE d AS (
  SELECT 1 n, 1000*rand() c2, 1000*rand() c3
  UNION ALL
  SELECt n+1, 1000*rand(), 1000*rand()
  FROM d
  WHERE n&lt;100000
)
SELECT c1, c2, c3 FROM d;

# \u67E5\u8BE2\u6570\u636E
explain
SELECT *
FROM test t
WHERE col1 = 100 AND col2 = 100;

# \u6CA1\u6709col2
explain
SELECT *
FROM test t
WHERE col2 = 100;

# \u6CA1\u6709col2
explain
SELECT *
FROM test t
WHERE col2 = 100 AND col2 &lt; 100;

# \u65E0\u6CD5\u8D70\u7D22\u5F15
explain
SELECT *
FROM test t
WHERE col1 &gt; 100;

# \u53EF\u4EE5\u8D70\u7D22\u5F15
explain
SELECT *
FROM test t
WHERE col1 &gt; 10000;

# \u65E0\u6CD5\u8D70\u7D22\u5F15
explain
SELECT *
FROM employee e
WHERE email like &#39;%bc&#39;; -- abc, abd, abe, bbc, bbd
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br></div></div><h2 id="\u603B\u7ED3" tabindex="-1"><a class="header-anchor" href="#\u603B\u7ED3" aria-hidden="true">#</a> \u603B\u7ED3</h2><p>\u590D\u5408\u7D22\u5F15\u6309\u7B2C\u4E00\u4E2A\u5B57\u6BB5\uFF0C\u7B2C\u4E8C\u4E2A\u5B57\u6BB5\u3002\u3002\u3002\u6392\u5E8F</p><p>\u5B57\u7B26\u4E32\u6309\u7B2C\u4E00\u4E2A\u5B57\u6BCD\uFF0C\u7B2C\u4E8C\u4E2A\u5B57\u6BCD\u3002\u3002\u3002\u6392\u5E8F</p><p>\u56E0\u4E3A\u7D22\u5F15\u7ED3\u6784\u662F\u4E00\u4E2A\u4ECE\u5DE6\u5230\u53F3\u5EFA\u7ACB\u987A\u5E8F\u7684\u8FC7\u7A0B\uFF0C\u6784\u9020\u7D22\u5F15\u7684\u65F6\u5019\u8981\u6309\u7167\u67E5\u8BE2\u6761\u4EF6\u7684\u987A\u5E8F\u6784\u9020\u7D22\u5F15</p>`,7);function l(r,p){return e}var c=n(a,[["render",l],["__file","\u7D22\u5F15\u7684\u6700\u5DE6\u5339\u914D\u539F\u5219.html.vue"]]);export{c as default};
