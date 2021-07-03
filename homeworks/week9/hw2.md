## 資料庫欄位型態 VARCHAR 跟 TEXT 的差別是什麼
在資料庫結構當中，有許多種字串 (String) 型態，其中常見的為 CHAR, VARCHAR, TEXT。以下為差異比較：

|         | 字元上下限 | 其他差異                                                     | Storage                                  | 常用場合                                                     | 查詢速度 |
| :-----: | ---------- | ------------------------------------------------------------ | :--------------------------------------- | ------------------------------------------------------------ | -------- |
|  CHAR   | 0~255      | 為固定長度，因此當字元不滿你設定的長度時，會在右邊以空格補齊剩餘字元 | 固定，依照設定 scheme 時決定的長度所決定 | 已知有固定長度的時候。(如: 手機號碼或身分證字號)             | 快       |
| VARCHAR | 0~65,535   | 可設定長度，可設置 default。不滿設定長度時                   | 變動，依照寫入長度決定                   | 已知字元會落在一個較小範圍內的情況。(如: 帳號密碼或暱稱，通常會限制長度後再存到資料庫。) | 中       |
|  TEXT   | <65,535-1  | 不可設定長度                                                 | 變動，依照寫入長度決定                   | 已知字元較多，且不知道會有多少的情況。 (如: 存部落格文章、留言等等) | 慢       |



## Cookie 是什麼？在 HTTP 這一層要怎麼設定 Cookie，瀏覽器又是怎麼把 Cookie 帶去 Server 的？

HTTP protocol 是無狀態的 (stateful)，意即無法保存每個來自 client 的 request 或操作的狀態，因此 Server 會將每個 request 都視為獨立的新事件。然而有時我們會希望 request 它是有狀態的，能記住 request 之間的某些關聯。例如：希望在一段時間內，即便關閉頁面再打開可以維持登入，這時候就需要 Session 系統這樣的識別證機制來幫助，而 Cookie 就是實作 Session 系統的一種方法。

#### Cookie 是甚麼？

- 一個小型文字檔，為實作 Session 而生，基本的模樣會有加密過的 Session (一對 key/value ) 組成。
- Cookie 本身是個儲存容器，身分識別只是其中一個用途。

#### 在 HTTP 這一層要怎麼設定 Cookie，瀏覽器又是怎麼把 Cookie 帶去 Server 的？

- 通常由 Server 產生，會在 Set-Cookie response header 帶著，瀏覽器收到後會將裡面的資訊存在我們的硬碟或是記憶體中。
- expire: Cookie 是有期限的，只要還在期限內每次發 request 瀏覽器都會自動把 Cookie 帶在 Cookie request header。若無特別設定 Cookie 的期限十分短，在關閉瀏覽器後就會消失了。
- path: Cookie 的存取是有範圍的，這個 path 底下的路徑都能夠共享 Cookie 。
- domain: 和 path 類似，規範了可以共享 Cookie 的 domains。



## 我們本週實作的會員系統，你能夠想到什麼潛在的問題嗎？

1. 使用我們的留言版的人的帳號密碼都會記錄在我們的 database，開發人員能掌握所有資訊，這可能是個潛在的資安問題。

   - 能想到的方法可能是去對使用者的密碼做某種加密處理，不可逆的那種。如此一來就只有使用者自己知道。

2. 目前的留言版的留言處沒有特別對輸入 HTML tag 做處理，會直接被瀏覽器以標籤來渲染

   - 在 php 當中有 htmlspecialchars() 這個內建 function 可以將 html elements 來跳脫 "<" 和 ">" 。

     (ref: [htmlspecialchars](https://www.php.net/manual/en/function.htmlspecialchars.php))

