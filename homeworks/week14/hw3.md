## 什麼是 DNS？Google 有提供的公開的 DNS，對 Google 的好處以及對一般大眾的好處是什麼？

### 什麼是 DNS？

DNS (網域名稱系統，Domain Name System) 是一個網路世界的電話簿那樣的存在，簡單來說，他會接收一個人類能讀懂的 domain （如：www.amazon.com），將他解析成電腦能懂得 ip 位置 (如：192.0.2.44)。 

DNS server 會依據網域 (Domain) 的層級高到低，範圍大到小下去查詢，Domain 的層級可分類為以下：

- 根網域（Root domain）：DNS 架構最上層的伺服器，全球共約 16 台，當下層 DNS server 無法查出對應的 IP 時會向最上層負責根網域的 DNS 伺服器查詢。

- 頂層網域（Top level domain）：使用國際標準組織（ISO）所制定的國碼（Country code）來區分頂層網域。不同國家會有不同的 TLD，例如：美國使用「us」、台灣使用「tw」、中國大陸使用「cn」、日本使用「jp」，
- 第二層網域（Second level domain）：由使用單位向各國的網址註冊中心申請。 例如：教育單位台大使用 ntu.edu、政府單位台北市政府使用 taipei.gov、營利單位 Google 使用 google.com 等等。
- 主機網域（Host domain）：主機網域為依照實際需要自行細分成許多主機使用，每一台主機可以設定一個網域名稱，例如：主要網頁使用 www、提供資訊網頁使用 info、郵件伺服器使用 mail 等等。

### DNS 如何運作？

假設我們現在想連到 www.amazon.com，也就必須先取得的 IP

1. 瀏覽器會先檢查 DNS cache 有無 www.amazon.com 的 IP 紀錄，若有，就會直接發 request 給那個位置
2. 若無的話就呼叫 C 語言，C 語言呼叫作業系統找 DNS cache，看看是否有 www.amazon.com 的 IP 紀錄，若有，就會直接發 request 給那個位置
3. 若還是沒有，這時候 request 會路由到根網域的 DNS server，他雖然不知道，但可以告訴你管理 .com 的 TLD DNS server 的 IP 
4. 轉向到管理 .com 的 TLD DNS server 查詢，接著又收到回應說不知道 www.amazon.com 的 IP，但告訴你管理 amazon.com 的Amazon Route 53 name servers 的 IP
5. 轉向到 Amazon Route 53 name servers，查到 www.amazon.com 的 IP 為 192.0.2.44
6. 192.0.2.44 會回傳到瀏覽器，在快取存放，這樣方便短時間內如果想要再去 www.amazon.com
7. 瀏覽器發 request 到 192.0.2.44
8. amazon server 回傳 帶有網頁資源的 response，瀏覽器收到後渲染畫面

### Google 有提供的公開的 DNS，對 Google 的好處以及對一般大眾的好處是什麼？

對一般大眾而言，使用的 google DNS server 的好處包括他們聲稱的，解析快速、安全及正確性，並且他可以自動篩選並過濾掉惡意網站。 

對 google 而言，提供免費的 DNS server 對他們亦有好處，在解析 domain 時，一定會有 domain 輸入，這使得他們有辦法去追蹤使用者的瀏覽偏好，即便使用的是無痕模式。根據使用者訪問的網站類型、頻率等等資訊加以分析，對於精準投放廣告或優化服務來說都是很重要的資源。



## 什麼是資料庫的 lock？為什麼我們需要 lock？

### Transaction

資料庫系統在交易 Transaction 時，為了確保過程的正確性及可靠性，會遵循 ACID 的特性進行工作，所謂的 Transaction 是指對資料庫下動作指令，由各種資料庫語法 (Select、Insert…等) 所組成，因此 Transaction 可能包含了多個資料庫語法來完成一次動作。

### 為什麼我們需要 lock？

多筆 Transaction 進行時會互相影響，lock 即是為了實現 Isolation (如最後一題敘述) 所存在的。

### 什麼是資料庫的 lock？

Lock 就是一個標記用的東西，他標記了一資料的狀態 (讀取中或寫入中)，Transaction 就可以依據 lock 來決定是否要等待到該紀錄狀態結束或是直接讀取該資料。



## NoSQL 跟 SQL 的差別在哪裡？

資料庫系統是專們處理資料的程式，他在底層幫你把資料儲存在硬碟，依照類型類型分為兩種，一種是關聯式資料庫 RDBMS (Relational Database Management System)，另一種為 NoSQL (Not only SQL) 資料庫。關聯式資料庫如 MySQL、PostgreSQL 及 Microsoft SQL Server，提供一個程式語言讓你去存儲資料庫的資料，我們稱為 SQL (Structured Query Language)，大多的關聯式資料庫都採用類似的 SQL 語言，只是語法細節稍有不同。

由上可知，NoSQL 為資料庫系統，SQL 並非資料庫系統，而是關聯式資料庫當中用於操作資料的程式語言，兩者不是同個層級的東西。

MySQL 這樣的關聯式資料庫系統通常會具有結構化的特性，依照訂定的 schme ，使用 SQL 語言來作資料管理，並能夠利用不同資料表當中的欄位來建立關聯性。而 NoSQL 是不限定為關聯式資料庫的通稱，他是沒有結構的，不存在 scheme，多為使用 JSON 來存儲資料，他顯而易見的好處和壞處都來自於沒有結構這個特性，壞處為存取速度慢，好處為因為不需要事先知道資料的結構，存就去就是了，因此很方便用於作一些資料蒐集的工作。面對不同的需求，應當選擇較為合適的資料庫系統來使用，而沒有優劣之分。



更多關於關聯式及非關聯式資料庫的比較可參考:

 [了解NoSQL不可不知的5項觀念](https://www.ithome.com.tw/news/92506) 及[關於NoSQL與SQL的區別](https://read01.com/GPnEx.html) 




## 資料庫的 ACID 是什麼？

**A (Atomicity) 原子性**

Transaction 已有兩種可能的狀態，全部完成 (commit) 或全部不完成 (rollback)。意即在 Transaction 當中多個 SQL 指令依序執行之下，若當中有一個出錯就會 rollback，資料庫會全部回到未更變的狀態，而不會有執行到一半的狀況出現。只有所有的指令都正確執行，才會 commit，提交更變。

**C (Consistency) 一致性**

Transaction 中進行的資料更變必須遵守資料庫的 scheme，才能 commit，否則會全部 rollback。

**I (Isolation) 隔離性** 

一個 Transaction 未完成的情況下，資料庫不會被另外的 Transaction 使用，以避免 race condition 造成資料同時被改動到而造成的資料不一致。 

**D (Durability) 持續性**

Transaction 對於資料庫當中資料的更變是永久的、持續不變的，即便系統錯誤也不會有變化，除非存放空間的硬體受損，否則資料永遠不會流失。即使在資料寫入的當下當機引發寫入時的資料流失，資料庫系統也要有機制在之後復原資料。



### Reference

[what is DNS?](https://aws.amazon.com/route53/what-is-dns/?nc1=h_ls)

[DNS 伺服器是什麼？如何運用？](https://www.stockfeel.com.tw/dns-%E4%BC%BA%E6%9C%8D%E5%99%A8%E6%98%AF%E4%BB%80%E9%BA%BC%EF%BC%9F%E5%A6%82%E4%BD%95%E9%81%8B%E7%94%A8%EF%BC%9F/)

[What are the advantages of changing your DNS to Google's Public server?](https://www.quora.com/What-are-the-advantages-of-changing-your-DNS-to-Googles-Public-server)

[│資料庫│淺談關聯式資料庫與ACID特性](https://medium.com/appxtech/%E8%B3%87%E6%96%99%E5%BA%AB-%E6%B7%BA%E8%AB%87%E9%97%9C%E8%81%AF%E5%BC%8F%E8%B3%87%E6%96%99%E5%BA%AB%E8%88%87acid%E7%89%B9%E6%80%A7-83a1b4178981)

[SQL 大小事](https://totoroliu.medium.com/%E8%B3%87%E6%96%99%E5%BA%AB-acid-bb87324035a8)

[閃開！讓專業的來：SQL 與 NoSQL](https://ithelp.ithome.com.tw/articles/10187443)

[資料庫的交易鎖定 Locks](https://www.qa-knowhow.com/?p=383)
