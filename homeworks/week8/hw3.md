## 什麼是 Ajax？

AJAX (Asynchronous JavaScript And XML) 是一種透過 JavaScript  達成非同步資料交換的技術。

要和 server 交換資料，可以透過 node.js 或瀏覽器發送 request，在瀏覽器上發送 request 就需透過 AJAX 技術。

## 用 Ajax 與我們用表單送出資料的差別在哪？

**form**

- 可利用表單來傳資料到 server，在這個方法當中，瀏覽器會直接 render response

**透過 ajax 技術**

- response 不會給瀏覽器直接拿去 render，而是會由瀏覽器交給瀏覽器上的 JS

## JSONP 是什麼？

JSONP (JSON with Padding)，是一個透過某寫 html tag 好特性 (如：<script>, <image>) 來達成規避同源政策限制的資料交換方法。

例如: server 有一個包含 JSON 的 JS 檔，操作 JSONP 時並提供讓我們可以帶入 callback function 參數，如此一來就可以在 callback 裡面取得 JSON 資料。

## 要如何存取跨網域的 API？

- same origin policy 同源政策規範了 response 只能給同源的 domain

    - 同源: 相同協定 (http/https)、埠號、主機位置 (domain)
    - 不同源發的 response 就會被擋掉
- 存取跨網域的 API -> 跨來源資源共用 (CORS)
    - 透過 server 端 header 設定: access-control-allow-origin: * (代表甚麼來源都可以拿到 response)
    - 發 request 時瀏覽器會在你的 header 帶上 origin，通常就是你的網域，所以你若跟 server 在同網域，就能拿到 response。
    
    


## 為什麼我們在第四週時沒碰到跨網域的問題，這週卻碰到了？

第四周時我們是透過 node.js 發送 request 給 server，並不受到瀏覽器的管轄，也就不會受到同源政策的限制，而這週是透過了瀏覽器發送 request，瀏覽器主要因為安全考量所以加上了這些限制，使得我們無法隨意存取跨網域的 API。

