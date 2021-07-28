## 請簡單解釋什麼是 Single Page Application

Single Page Application (SPA) 是一種透過載入單一 HTML 頁面，透過使用者和頁面的互動作為基礎來動態更新頁面，因為不存在頁面跳轉，使用體驗如同 APP 一般。

## SPA 的優缺點為何

優點：

- 因不須因為有畫面一小部分需要更動，就經過整個網頁跳轉，如此增加了使用者體驗

- 前後端分離提升拓展性及維護效率。由前端負責畫面生成，後端負責資料生成，互不干擾。

  

缺點：

- 由於 client-side render，index.html 幾乎沒有東西，導致瀏覽器爬不到資料而產生 SEO 方面困難

- 第一次載入會較久，因為會需要將產生所有頁面的 JS 檔及 Html template 都下載下來

  

## 這週這種後端負責提供只輸出資料的 API，前端一律都用 Ajax 串接的寫法，跟之前透過 PHP 直接輸出內容的留言板有什麼不同？

如下圖比較，不同於傳統的網頁設計，最大的不同點在於，每次發送 Request 給 Server，得到的並非 html，在 SPA 的設計當中採用 ajax 技術，每次的 response 都會是純資料 (多為 JSON 格式)，再經由 JavaScript 處理過後放到頁面上，因此除了第一次 request 得到基本 html 架構以外，之後都不需要重新跳轉就可達成頁面互動的目的。 簡而言之就是將 render 的工作由 sever-side 轉移到 client-side。

<img src=".\page_lifecycle.png" style="zoom:50%;" />

### References

[ASP.NET - Single-Page Applications: Build Modern, Responsive Web Apps with ASP.NET](https://docs.microsoft.com/en-us/archive/msdn-magazine/2013/november/asp-net-single-page-applications-build-modern-responsive-web-apps-with-asp-net)

[單一頁面應用程式](https://mybaseball52.medium.com/%E5%96%AE%E4%B8%80%E9%A0%81%E9%9D%A2%E6%87%89%E7%94%A8%E7%A8%8B%E5%BC%8F-c98c8a17081)

[前後端分離與 SPA](https://blog.techbridge.cc/2017/09/16/frontend-backend-mvc/)

