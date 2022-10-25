import{_ as e,r as o,o as c,c as l,a as n,b as t,F as u,d as s,e as p}from"./app.340c2b94.js";const r={},i=n("h1",{id:"\u6811\u7684\u57FA\u7840\u7B97\u6CD5",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#\u6811\u7684\u57FA\u7840\u7B97\u6CD5","aria-hidden":"true"},"#"),s(" \u6811\u7684\u57FA\u7840\u7B97\u6CD5")],-1),k=n("h2",{id:"\u4E00\u3001\u57FA\u7840-\u904D\u5386",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#\u4E00\u3001\u57FA\u7840-\u904D\u5386","aria-hidden":"true"},"#"),s(" \u4E00\u3001\u57FA\u7840 + \u904D\u5386")],-1),d={id:"_144-\u4E8C\u53C9\u6811\u7684\u524D\u5E8F\u904D\u5386",tabindex:"-1"},b=n("a",{class:"header-anchor",href:"#_144-\u4E8C\u53C9\u6811\u7684\u524D\u5E8F\u904D\u5386","aria-hidden":"true"},"#",-1),m=s(),h={href:"https://leetcode.cn/problems/binary-tree-preorder-traversal",target:"_blank",rel:"noopener noreferrer"},_=s("144. \u4E8C\u53C9\u6811\u7684\u524D\u5E8F\u904D\u5386"),g=p(`<p>\u7ECF\u5178\u4E8C\u53C9\u6811\u524D\u5E8F\u904D\u5386</p><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code><span class="token keyword">class</span> <span class="token class-name">Solution</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">&gt;</span></span> <span class="token function">preorderTraversal</span><span class="token punctuation">(</span><span class="token class-name">TreeNode</span> root<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">&gt;</span></span> res <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token class-name">Stack</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">TreeNode</span><span class="token punctuation">&gt;</span></span> stack <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Stack</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>root <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> stack<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>root<span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token keyword">while</span><span class="token punctuation">(</span><span class="token operator">!</span>stack<span class="token punctuation">.</span><span class="token function">isEmpty</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        root <span class="token operator">=</span> stack<span class="token punctuation">.</span><span class="token function">pop</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        res<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>root<span class="token punctuation">.</span>val<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>root<span class="token punctuation">.</span>right <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> stack<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>root<span class="token punctuation">.</span>right<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>root<span class="token punctuation">.</span>left <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> stack<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>root<span class="token punctuation">.</span>left<span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
      <span class="token keyword">return</span> res<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br></div></div>`,2),f={id:"_94-\u4E8C\u53C9\u6811\u7684\u4E2D\u5E8F\u904D\u5386",tabindex:"-1"},w=n("a",{class:"header-anchor",href:"#_94-\u4E8C\u53C9\u6811\u7684\u4E2D\u5E8F\u904D\u5386","aria-hidden":"true"},"#",-1),y=s(),v={href:"https://leetcode.cn/problems/binary-tree-inorder-traversal/",target:"_blank",rel:"noopener noreferrer"},x=s("94. \u4E8C\u53C9\u6811\u7684\u4E2D\u5E8F\u904D\u5386"),L=p(`<p>left -&gt; node -&gt; right</p><p>\u548C\u975E\u9012\u5F52\u5148\u5E8F\u904D\u5386\u7C7B\u4F3C\uFF0C\u552F\u4E00\u533A\u522B\u662F\u8003\u5BDF\u5230\u5F53\u524D\u8282\u70B9\u65F6\uFF0C\u5E76\u4E0D\u77E5\u8282\u8F93\u51FA\u8BE5\u8282\u70B9\u3002</p><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">&gt;</span></span> <span class="token function">inorderTraversal</span><span class="token punctuation">(</span><span class="token class-name">TreeNode</span> root<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">&gt;</span></span> res <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token class-name">Stack</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">TreeNode</span><span class="token punctuation">&gt;</span></span> stack <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Stack</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  		
  		<span class="token keyword">while</span> <span class="token punctuation">(</span>root <span class="token operator">!=</span> <span class="token keyword">null</span> <span class="token operator">||</span> <span class="token operator">!</span>stack<span class="token punctuation">.</span><span class="token function">isEmpty</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">while</span> <span class="token punctuation">(</span>root <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
          	stack<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>root<span class="token punctuation">)</span><span class="token punctuation">;</span>
          	root <span class="token operator">=</span> root<span class="token punctuation">.</span>left<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        root <span class="token operator">=</span> stack<span class="token punctuation">.</span><span class="token function">pop</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        res<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>root<span class="token punctuation">.</span>val<span class="token punctuation">)</span><span class="token punctuation">;</span>
        root <span class="token operator">=</span> root<span class="token punctuation">.</span>right<span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
  
  		<span class="token keyword">return</span> res<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br></div></div>`,3),N={id:"_145-\u4E8C\u53C9\u6811\u7684\u540E\u5E8F\u904D\u5386",tabindex:"-1"},T=n("a",{class:"header-anchor",href:"#_145-\u4E8C\u53C9\u6811\u7684\u540E\u5E8F\u904D\u5386","aria-hidden":"true"},"#",-1),j=s(),S={href:"https://leetcode.cn/problems/binary-tree-postorder-traversal/",target:"_blank",rel:"noopener noreferrer"},I=s("145. \u4E8C\u53C9\u6811\u7684\u540E\u5E8F\u904D\u5386"),E=p(`<p>left -&gt; right -&gt; node</p><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code><span class="token keyword">class</span> <span class="token class-name">Solution</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">&gt;</span></span> <span class="token function">preorderTraversal</span><span class="token punctuation">(</span><span class="token class-name">TreeNode</span> root<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">&gt;</span></span> res <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token class-name">Stack</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">TreeNode</span><span class="token punctuation">&gt;</span></span> stack <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Stack</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>root <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> stack<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>root<span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token keyword">while</span><span class="token punctuation">(</span><span class="token operator">!</span>stack<span class="token punctuation">.</span><span class="token function">isEmpty</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        root <span class="token operator">=</span> stack<span class="token punctuation">.</span><span class="token function">pop</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        res<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> root<span class="token punctuation">.</span>val<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// \u53CD\u5411 add</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>root<span class="token punctuation">.</span>left <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> stack<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>root<span class="token punctuation">.</span>left<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>root<span class="token punctuation">.</span>right <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> stack<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>root<span class="token punctuation">.</span>right<span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
      <span class="token keyword">return</span> res<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br></div></div>`,2),V={id:"_102-\u4E8C\u53C9\u6811\u7684\u5C42\u5E8F\u904D\u5386",tabindex:"-1"},A=n("a",{class:"header-anchor",href:"#_102-\u4E8C\u53C9\u6811\u7684\u5C42\u5E8F\u904D\u5386","aria-hidden":"true"},"#",-1),B=s(),F={href:"https://leetcode.cn/problems/binary-tree-level-order-traversal",target:"_blank",rel:"noopener noreferrer"},C=s("102. \u4E8C\u53C9\u6811\u7684\u5C42\u5E8F\u904D\u5386"),q=n("p",null,"\u200B",-1);function z(D,G){const a=o("ExternalLinkIcon");return c(),l(u,null,[i,k,n("h3",d,[b,m,n("a",h,[_,t(a)])]),g,n("h3",f,[w,y,n("a",v,[x,t(a)])]),L,n("h3",N,[T,j,n("a",S,[I,t(a)])]),E,n("h3",V,[A,B,n("a",F,[C,t(a)])]),q],64)}var J=e(r,[["render",z],["__file","\u6811\u7684\u57FA\u7840\u7B97\u6CD5.html.vue"]]);export{J as default};
