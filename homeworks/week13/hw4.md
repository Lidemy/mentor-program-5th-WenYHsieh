## Webpack 是做什麼用的？可以不用它嗎？

**Webpack 是什麼以及他的功能概述**

Webpack 是一個用來實現模組化開發的打包工具，他提供 export/import 讓我們在不同功能的程式碼模組之間共享資源，會依照我們 在 webpack.config.js 所寫好的設定來進行編譯打包的動作，將所有模組組合成瀏覽器能解讀的模樣。

**為何我們需要 Webpack？可以不用他嗎？**

現在是一個資訊爆炸又競爭的時代，前端工具的演進快速，我們期望一個網頁應具備的功能比以早期還要多很多，這導致要讓一個網站跑起來需要做的預處理可能更多，程式碼自然只會更龐大不會更小。因應這樣的變化，在公司當中一定會出現需要和他人協作完成一個專案的情況，甚至一位工程師可能只會負責一小塊的功能。在協作情況底下，如果我們將所有的程式碼寫在一寫，不去做模組化設計，很容易會使得專案變得萬劫不復。 另一方面，瀏覽器也可能並不支援某些新語法，導致開發上多了許多限制需要解決。

Webpack 就是為了解決這些的窘境而出現的，他不但使得我們能實踐模組化開發，補足了瀏覽器不支援 require 語法的問題，也能自動化預處理動作，例如轉換 ES6 語法到瀏覽器能支援的新語法。

最後，當我們是一人開發一個小專案，或者不在乎是否能夠使用瀏覽器可能不支援的新語法等等，我們當然能夠不去使用 Webpack，完全沒有問題。



## gulp 跟 webpack 有什麼不一樣？

gulp 是 task menager，負責管理各種 task 的自動化運行，這些 tasks 就包括了 babel, sass 等等預處理器的編譯，基本上只要能夠寫出指令， gulp 都能達成。 而 Webpack 就不同了，他的主要使命就是 bundler，靠 loader 來 bundle 不同模組，將之轉換成瀏覽器能理解的模樣。容易將兩者混淆的原因在於他們能夠達成的事情有部分重疊，最大的差異在於，gulp 並不是本身執行 task 的角色，他只是管理的角色，而 webpack 本身就是執行 task (bundle) 的人，因此也能是 gulp 管理的 task 之一。

因應場合不同，應該選擇合適的一方來使用，沒有一定必須使用哪一個。




## CSS Selector 權重的計算方式為何？

**權重計算的基本規則**

權重由高到低的排名為以下，權重高的選擇器會優先被套用為最終樣式

- !important，是當中權重最大的一種修飾詞，因此一般來說不會輕易使用。
- inline style 也就是 tag 內定義的 style，會是次優先的
- id
- class/pseudo-calss/attribute
- tag

基本原則為越詳細的越優先，計算方式即把這五種選擇器有或無以一個五個 0/1 組成的 array `[0/1, 0/1, 0/1, 0/1, 0/1]` 來表示，之後加以比較。如果優先順序一樣就是後面加上的會被套用。



### References

[Webpack教學 (一) ：什麼是Webpack? 能吃嗎？](https://medium.com/i-am-mike/%E4%BB%80%E9%BA%BC%E6%98%AFwebpack-%E4%BD%A0%E9%9C%80%E8%A6%81webpack%E5%97%8E-2d8f9658241d)

[可以幫我自動化嗎，拜託：Gulp](https://ithelp.ithome.com.tw/articles/10185976)

[Webpack document](https://webpack.js.org/concepts/)

[webpack 新手教學之淺談模組化與 snowpack](https://blog.huli.tw/2020/01/21/webpack-newbie-tutorial/)

[W3C- CSS selector specificity](https://www.w3.org/TR/CSS2/cascade.html#specificity)
