## hw2：Event Loop + Scope

請說明以下程式碼會輸出什麼，以及盡可能詳細地解釋原因。

``` js
for(var i=0; i<5; i++) {
  console.log('i: ' + i)
  setTimeout(() => {
    console.log(i)
  }, i * 1000)
}
```

1. Global execution context (Global EC) 被放進 call stack。

2. Global EC 開始 creation phase，給定變數 i 一個記憶體位置，設定初始值為 undefined。

3. Global EC 進入 code execution phase

   - 遇到 for，判斷 i 有沒有小於 5，有，進到迴圈內
     - 執行`console.log('i ': + i)`，`console.log('i ': + i)` EC 被放到 call stack。透過瀏覽器提供的 web api 取用 console 物件，呼叫方法 log，在  console 上印出 `i: 0` (取到了全域的 i)。`console.log('i ': + i)` EC 從 call stack 被 pop out。
     - 接著`setTimeout()`  EC 被放入 call stack， `setTimeout()` 這個 web api 也被取用，瀏覽器將我們寫的 callback function `() => {console.log(i)}` 存起來不執行，並計時 0 ms 。`setTimeout()` EC 從 call stack 被 pop out。後續程式碼繼續執行。
   - i++，i 變成 1，判斷 i 有沒有小於 5，有，進到迴圈內 
     - 執行`console.log('i ': + i)`，`console.log('i ': + i)` EC 被放到 call stack。透過瀏覽器提供的 web api 取用 console 物件，呼叫方法 log，在  console 上印出 `i: 1`。`console.log('i ': + i)` EC 從 call stack 被 pop out。
     - 接著`setTimeout()`  EC 被放入 call stack， `setTimeout()` 這個 web api 也被取用，瀏覽器將我們寫的 callback function `() => {console.log(i)}` 存起來不執行，並計時 1000 ms 。`setTimeout()` EC 從 call stack 被 pop out。後續程式碼繼續執行。
   - i++，i 變成 2，判斷 i 有沒有小於 5，有，進到迴圈內 
     - 執行`console.log('i ': + i)`，`console.log('i ': + i)` EC 被放到 call stack。透過瀏覽器提供的 web api 取用 console 物件，呼叫方法 log，在  console 上印出 `i: 2`。`console.log('i ': + i)` EC 從 call stack 被 pop out。
     - 接著 `setTimeout()`  EC 被放入 call stack，`setTimeout()` 這個 web api 也被取用，瀏覽器將我們寫的 callback function `() => {console.log(i)}` 存起來不執行，並計時 2000 ms 。`setTimeout()` EC 從 call stack 被 pop out。後續程式碼繼續執行。

   - i++，i 變成 3，判斷 i 有沒有小於 5，有，進到迴圈內 
     - 執行`console.log('i ': + i)`，`console.log('i ': + i)` EC 被放到 call stack。透過瀏覽器提供的 web api 取用 console 物件，呼叫方法 log，在  console 上印出 `i: 3`。`console.log('i ': + i)` EC 從 call stack 被 pop out。
     - 接著 `setTimeout()`  EC 被放入 call stack， `setTimeout()` 這個 web api 也被取用，瀏覽器將我們寫的 callback function `() => {console.log(i)}` 存起來不執行，並計時 3000 ms 。`setTimeout()` EC 從 call stack 被 pop out。後續程式碼繼續執行。
   - i++，i 變成 4，判斷 i 有沒有小於 5，有，進到迴圈內 
     - 執行`console.log('i ': + i)`，`console.log('i ': + i)` EC 被放到 call stack。透過瀏覽器提供的 web api 取用 console 物件，呼叫方法 log，在  console 上印出 `i: 4`。`console.log('i ': + i)` EC 從 call stack 被 pop out。
     - 接著`setTimeout()`  EC 被放入 call stack， `setTimeout()` 這個 web api 也被取用，瀏覽器將我們寫的 callback function `() => {console.log(i)}` 存起來不執行，並計時 4000 ms 。`setTimeout()` EC 從 call stack 被 pop out。後續程式碼繼續執行。
   - i++，i 變成 5，判斷 i 有沒有小於 5，沒有，跳出迴圈 

4. Global 程式碼都執行完了，Global EC 從 call stack 被 pop out。

5. 至少過了 0 ms (立即) 後， callback function `() => {console.log(i)}` (cb1) 就會被移到 callback queue 等待。

6. 滿足 「callback queue 裡面有待執行任務」以及「目前 call stack 已清空」這兩個條件，Event loop 就會把 callback queue 裡面的任務一次拿一個出來 (先進來的先被拿出來 )，放到 call stack 裡面。 

7. cb1 execution context 從 callback queue 被拿出來塞到 call stack。 

8. 執行 cb1  `console.log(i)`，透過瀏覽器提供的 web api 取用 console 物件，呼叫方法 log，在  console 上印出 5 (Global 的 i 現在是 5)。

9. cb1 execution context 執行完畢，從 call stack被 pop out。

10. 至少過了 1000 ms 後 (就是上一步驟印完之後過一秒)， callback function `() => {console.log(i)}` (cb2) 就會被移到 callback queue 等待。

11. 再度滿足 「callback queue 裡面有待執行任務」以及「目前 call stack 已清空」這兩個條件。

12. cb2 execution context 從 callback queue 被拿出來塞到 call stack。 

13. 執行 cb2  `console.log(i)`，透過瀏覽器提供的 web api 取用 console 物件，呼叫方法 log，在  console 上印出 5。

14. cb2 execution context 執行完畢，從 call stack被 pop out。

15. 至少過了 2000 ms 後 (就是上一步驟印完之後又過一秒)， callback function `() => {console.log(i)}` (cb3) 就會被移到 callback queue 等待。

16. 再度滿足 「callback queue 裡面有待執行任務」以及「目前 call stack 已清空」這兩個條件。

17. cb3 execution context 從 callback queue 被拿出來塞到 call stack。 

18. 執行 cb3  `console.log(i)`，透過瀏覽器提供的 web api 取用 console 物件，呼叫方法 log，在  console 上印出 5。

19. cb3 execution context 執行完畢，從 call stack被 pop out。

20. 至少過了 3000 ms 後 (就是上一步驟印完之後又過一秒)， callback function `() => {console.log(i)}` (cb4) 就會被移到 callback queue 等待。

21. 再度滿足 「callback queue 裡面有待執行任務」以及「目前 call stack 已清空」這兩個條件。

22. cb4 execution context 從 callback queue 被拿出來塞到 call stack。 

23. 執行 cb4  `console.log(i)`，透過瀏覽器提供的 web api 取用 console 物件，呼叫方法 log，在  console 上印出 5。

24. cb4 execution context 執行完畢，從 call stack被 pop out。

25. 至少過了 4000 ms 後 (就是上一步驟印完之後又過一秒)， callback function `() => {console.log(i)}` (cb5) 就會被移到 callback queue 等待。

26. 再度滿足 「callback queue 裡面有待執行任務」以及「目前 call stack 已清空」這兩個條件。

27. cb5 execution context 從 callback queue 被拿出來塞到 call stack。 

28. 執行 cb5  `console.log(i)`，透過瀏覽器提供的 web api 取用 console 物件，呼叫方法 log，在  console 上印出 5。

29. cb5 execution context 執行完畢，從 call stack被 pop out。

 

console

```
i: 0
i: 1
i: 2
i: 3
i: 4
5
過一秒
5
過一秒
5
過一秒
5
過一秒
5
```

