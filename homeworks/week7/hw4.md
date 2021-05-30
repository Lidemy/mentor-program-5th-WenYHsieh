## 什麼是 DOM？

**Document Object Model (DOM)，文件物件模型**。這個模型定義 Document 為一個物件的型態，這個物件為一個由多個節點組成的樹狀的結構 (如下圖所示)，這就提供了一個介面使得人們能夠透過程式語言去操縱 Document 的內容。

<img src="C:\Users\Wendy\Desktop\Lidemy_program\dom.png" style="zoom:30%;" />

為了達到動態操縱頁面的目的，以 HTML 來說，當瀏覽器載入 HTML 文件，瀏覽器會將之轉換成 Document 這個物件，HTML 當中個元素，例如: header, div, 文字等等，會以 node 形式存在。 透過 JavaScript 物件操縱的方法，我們能夠存取 HTML 的元素、更改樣式，甚至是加上事件監聽。



## 事件傳遞機制的順序是什麼；什麼是冒泡，什麼又是捕獲？

當事件發生 (例如使用者點按元素或者按下 enter 鍵)，這事件在 DOM 當中傳遞的過程可以分為三個階段 (如下圖所示): 

1. 捕獲階段 (Capturing phase)

   - 由 window 開始，由上到下發生捕獲，直到傳到觸發事件的目標元素 (target)。此上到下傳遞之行為稱為捕獲。

2. 目標階段 (Target phase)

   - 在過去的 chrome 版本，目標元素不具有捕獲和冒泡之分，因此監聽捕獲冒泡哪個階段，端看早加上的哪個 lisener 是監聽哪個階段，哪個階段就先發生。

   - 新版本的 chrome 中，這樣的行為已經改變了，目標元素觸發事件順序按照先捕獲再冒泡的順序。

     (ref: [Chrome 89 更新事件觸發順序，導致99%的文章都錯了（包括MDN）](https://juejin.cn/post/6965682915141386254))

3. 冒泡階段 (Bubbling phase) 

   - 從目標元素開始向上傳遞，發生冒泡，直到傳到 window。此下到上傳遞之行為稱為冒泡。

<img src="C:\Users\Wendy\Desktop\Lidemy_program\W3C_event_flow.png" style="zoom: 50%;" />



## 什麼是 event delegation，為什麼我們需要它？

依據事件傳遞的機制我們可得知，上游的父元素能夠知道底下所有元素發生的事件，如果我們可以直接對父元素加上事件監聽，這樣就稱為 event delegation (事件代理)。利用 event delegation 在一些情況底下會較為有優勢：

1.  當父元素底下有眾多性質相似的元素，若想對底下所有元素都加上相同事件監聽器，會十分沒有效率。

2.  若對個別元素加上監聽器，使用 JS 動態新增性質相似的元素時，會需要額外額外處理新元素的事件監聽問題，若直接交由父元素代理就可以不必。

   

## event.preventDefault() 跟 event.stopPropagation() 差在哪裡，可以舉個範例嗎？

**event** 是一個事件物件，當元素上監聽的事件被觸發，瀏覽器會生成這個 event 事件物件，將之當作參數傳遞到我們定義的一個 event handle function，既然是參數，在這個 function 裡面我們就可以去對這個事件物件進行操作。

event.preventDefault() 跟 event.stopPropagation() 是其中的兩個例子，以下為比較。

**event.preventDefault()**

- 阻止元素發生事件後的預設行為。例如: 表單 (form) 發生點擊事件的預設行為就是送出表單，藉由這個 preventDefault() 就能使他不送出。
- 只是阻止預設行為發生，並非阻止事件傳遞。所以如果在上游 window 物件加上 preventDefault()，下游元素的預設行為都會被阻止。

**event.stopPropagation()**

- 代表只要事件傳遞到被加上了 stopPropergation 的元素就好，不要繼續傳遞了。
  - 若在捕獲階段會阻止事件往下傳遞
  - 若在冒泡階段會阻止事件向上傳遞
- 只是阻止傳遞，並非阻止事件被觸發。