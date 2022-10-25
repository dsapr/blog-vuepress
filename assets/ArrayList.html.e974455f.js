import{_ as a,e as n}from"./app.340c2b94.js";const s={},e=n(`<h1 id="\u5173\u4E8E-arraylist-\u90A3\u4E9B\u4E8B" tabindex="-1"><a class="header-anchor" href="#\u5173\u4E8E-arraylist-\u90A3\u4E9B\u4E8B" aria-hidden="true">#</a> \u5173\u4E8E ArrayList \u90A3\u4E9B\u4E8B</h1><h2 id="new-arraylist-0-\u662F\u4EC0\u4E48\u64CD\u4F5C" tabindex="-1"><a class="header-anchor" href="#new-arraylist-0-\u662F\u4EC0\u4E48\u64CD\u4F5C" aria-hidden="true">#</a> new ArrayList&lt;&gt;(0) \u662F\u4EC0\u4E48\u64CD\u4F5C</h2><p>\u9996\u5148\u6211\u4EEC\u8981\u77E5\u9053 ArrayList \u4E2D\u7684\u4E24\u4E2A\u6210\u5458\u53D8\u91CF\uFF1A</p><ul><li>Object[] elementData;</li><li>Object[] EMPTY_ELEMENTDATA = {};</li><li>Object[] DEFAULTCAPACITY_EMPTY_ELEMENTDATA</li></ul><p>\u8FD9\u4E24\u4E2A\u6210\u5458\u53D8\u91CF\u4E4D\u4E00\u770B\u540D\u5B57\u90FD\u662F\u9ED8\u8BA4\u6210\u5458\u53D8\u91CF\u6570\u7EC4\uFF0C\u597D\u50CF\u90FD\u4E00\u6837\uFF0C\u4F46\u662F\u4E3A\u4EC0\u4E48\u8981\u5B9A\u4E49\u4E24\u4E2A\u7A7A\u7684\u6210\u5458\u53D8\u91CF\u6570\u7EC4\u5462\uFF1F</p><p>\u6E90\u7801\uFF1A</p><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code><span class="token doc-comment comment">/**
 * Constructs an empty list with the specified initial capacity.
 *
 * <span class="token keyword">@param</span>  <span class="token parameter">initialCapacity</span>  the initial capacity of the list
 * <span class="token keyword">@throws</span> <span class="token reference"><span class="token class-name">IllegalArgumentException</span></span> if the specified initial capacity
 *         is negative
 */</span>
<span class="token keyword">public</span> <span class="token class-name">ArrayList</span><span class="token punctuation">(</span><span class="token keyword">int</span> initialCapacity<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>initialCapacity <span class="token operator">&gt;</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>elementData <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Object</span><span class="token punctuation">[</span>initialCapacity<span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>initialCapacity <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// \u4F20\u5165 0 \u540E\u7684\u903B\u8F91</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>elementData <span class="token operator">=</span> EMPTY_ELEMENTDATA<span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
        <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">IllegalArgumentException</span><span class="token punctuation">(</span><span class="token string">&quot;Illegal Capacity: &quot;</span><span class="token operator">+</span>
                                           initialCapacity<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br></div></div><h3 id="\u8BF7\u95EE\u4E00\u5171\u6269\u5BB9\u4E86\u51E0\u6B21" tabindex="-1"><a class="header-anchor" href="#\u8BF7\u95EE\u4E00\u5171\u6269\u5BB9\u4E86\u51E0\u6B21" aria-hidden="true">#</a> \u8BF7\u95EE\u4E00\u5171\u6269\u5BB9\u4E86\u51E0\u6B21\uFF1F</h3>`,8);function p(t,c){return e}var i=a(s,[["render",p],["__file","ArrayList.html.vue"]]);export{i as default};
