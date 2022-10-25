import{_ as n,e}from"./app.340c2b94.js";const s={},a=e(`<h1 id="where\u3001having\u4EE5\u53CAon\u7684\u533A\u522B" tabindex="-1"><a class="header-anchor" href="#where\u3001having\u4EE5\u53CAon\u7684\u533A\u522B" aria-hidden="true">#</a> WHERE\u3001HAVING\u4EE5\u53CAON\u7684\u533A\u522B</h1><h2 id="\u95EE\u9898\u89E3\u7B54" tabindex="-1"><a class="header-anchor" href="#\u95EE\u9898\u89E3\u7B54" aria-hidden="true">#</a> \u95EE\u9898\u89E3\u7B54</h2><p>WHERE \u4E0E HAVING \u7684\u6839\u672C\u533A\u522B\u5728\u4E8E</p><ul><li>WHERE \u5B50\u53E5\u5728 GROUP BY \u5206\u7EC4\u548C\u6570\u636E<strong>\u6C47\u603B</strong>\u4E4B\u524D\u5BF9\u6570\u636E\u8FDB\u884C\u8FC7\u6EE4\uFF1B</li><li>HAVING \u5B50\u53E5\u5728 GROUP BY \u5206\u7EC4\u548C\u6570\u636E<strong>\u6C47\u603B</strong>\u4E4B\u540E\u5BF9\u6570\u636E\u8FDB\u884C\u8FC7\u6EE4\uFF1B</li></ul><div class="language-mysql ext-mysql line-numbers-mode"><pre class="language-mysql"><code>SELECT col1, sum(col2)
FROM t
WHERE codition
GROUP BY col1
HAVING codition;
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><div class="language-mysql ext-mysql line-numbers-mode"><pre class="language-mysql"><code>SELECT dept_id, count(*)
FROM employee e
WHERE salary &gt; 10000
GROUP BY dept_id
HAVING count(*) &gt; 1;
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>\u8FDE\u63A5\u67E5\u8BE2\u4E2D\uFF0CWHERE \u548C ON \u7684\u4E3B\u8981\u533A\u522B\u5728\u4E8E\uFF1A</p><ul><li>\u5BF9\u4E8E\u5185\u8FDE\u63A5\u67E5\u8BE2\uFF0CWHERE \u5B50\u53E5\u548C ON \u5B50\u53E5\u7B49\u6548</li><li>\u5BF9\u4E8E\u5916\u8FDE\u63A5\u67E5\u8BE2\uFF0CON \u5B50\u53E5\u5728\u8FDE\u63A5\u64CD\u4F5C<strong>\u4E4B\u524D</strong>\u6267\u884C\uFF0CWHERE \u5B50\u53E5\u5728\uFF08\u903B\u8F91\u4E0A\uFF09\u5728\u8FDE\u63A5\u64CD\u4F5C<strong>\u4E4B\u540E</strong>\u6267\u884C\u3002</li></ul><div class="language-mysql ext-mysql line-numbers-mode"><pre class="language-mysql"><code>SELECT ...
FROM t1
JOIN t2 ON (codition)
WHERE codition;
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><div class="language-mysql ext-mysql line-numbers-mode"><pre class="language-mysql"><code>-- \u5BF9\u4E8E\u5185\u8FDE\u63A5\u67E5\u8BE2\uFF0CWHERE \u5B50\u53E5\u548C ON \u5B50\u53E5\u7B49\u6548
SELECT * 
FROM department d, employee e
WHERE d.dept_id = e.dept_id
AND d.dept_name = &#39;\u8D22\u52A1\u90E8&#39;;

SELECT * 
FROM department d
JOIN employee e ON (d.dept_id = e.dept_id AND d.dept_name = &#39;\u8D22\u52A1\u90E8&#39;);

SELECT * 
FROM department d
JOIN employee e ON (d.dept_id = e.dept_id)
WHERE d.dept_name = &#39;\u8D22\u52A1\u90E8&#39;;

-- \u5BF9\u4E8E\u5916\u8FDE\u63A5\u67E5\u8BE2\uFF0CON \u5B50\u53E5\u5728\u8FDE\u63A5\u64CD\u4F5C\u4E4B\u524D\u6267\u884C\uFF0CWHERE \u5B50\u53E5\uFF08\u903B\u8F91\u4E0A\uFF09\u5728\u8FDE\u63A5\u64CD\u4F5C\u4E4B\u540E\u6267\u884C\u3002
-- ON \u6761\u4EF6\u6267\u884C\u540E\uFF0C\u5DE6\u94FE\u63A5\u4F9D\u7136\u8FD4\u56DE\u57FA\u51C6\u8868\u6240\u6709\u4FE1\u606F\uFF0C\u6761\u4EF6\u8FC7\u6EE4\u5931\u6548
SELECT * 
FROM department d
LEFT JOIN employee e ON (d.dept_id = e.dept_id AND d.dept_name = &#39;\u4FDD\u536B\u90E8&#39;);
-- \u5DE6\u8FDE\u63A5\u8FD4\u56DE\u57FA\u51C6\u8868\u6240\u6709\u4FE1\u606F\u540E\uFF08\u903B\u8F91\u4E0A\u662F\u8FDE\u63A5\u64CD\u4F5C\u540E\u8FC7\u6EE4\uFF0C\u5B9E\u9645\u662F\u626B\u63CF\u65F6\u5C31\u8FC7\u6EE4\uFF09\uFF0CWHERE \u8FC7\u6EE4\u6709\u6548
SELECT * 
FROM department d
LEFT JOIN employee e ON (d.dept_id = e.dept_id)
WHERE d.dept_name = &#39;\u4FDD\u536B\u90E8&#39;;
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br></div></div>`,10);function l(r,p){return a}var d=n(s,[["render",l],["__file","WHERE\u3001HAVING\u4EE5\u53CAON.html.vue"]]);export{d as default};
