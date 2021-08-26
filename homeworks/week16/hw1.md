## hw1：Event Loop

在 JavaScript 裡面，一個很重要的概念就是 Event Loop，是 JavaScript 底層在執行程式碼時的運作方式。請你說明以下程式碼會輸出什麼，以及盡可能詳細地解釋原因。

``` js
console.log(1)
setTimeout(() => {
  console.log(2)
}, 0)
console.log(3)
setTimeout(() => {
  console.log(4)
}, 0)
console.log(5)
```

> 單執行續、同步執行的對象為 JS engine，我們的 code 運行在瀏覽器這個 runtime 上，除了 JS engine 還有其他由瀏覽器所提供的法寶，這些法寶使得我們能夠在 JS 做到非同步的行為，而這些法寶通稱為 Web api，包括了常用的 console 和 setTimeout()，通常可透過 window 這個全域物件來取得，因為在全域，所以也可省略 window。

1. Global execution context (GEC) 被放進 call stack。
2. 執行第一行 `console.log(1)`，`console.log(1)` EC 被放到 call stack。透過瀏覽器提供的 web api 取用 console 物件，呼叫方法 log，在  console 上印出 1。`console.log(1)` EC 從 call stack 被 pop out。
3. 接著 `setTimeout()`  EC 被放入 call stack， `setTimeout()` 這個 web api 被取用，瀏覽器將我們寫的 callback function `() => {console.log(2)}` 存起來不執行，並計時 0 ms 。`setTimeout()` EC 從 call stack 被 pop out。後續程式碼繼續執行。
4. 執行下一行 `console.log(3)`，`console.log(3)` EC 被放到 call stack。透過瀏覽器提供的 web api 取用 console 物件，呼叫方法 log，在  console 上印出 3。`console.log(3)` EC 從 call stack 被 pop out。
5. 再次`setTimeout()`  EC 被放入 call stack， `setTimeout()` 這個 web api 被取用，瀏覽器將我們寫的 callback function `() => {console.log(4)}` 存起來不執行，並計時 0 ms。`setTimeout()` EC 從 call stack 被 pop out。後續程式碼繼續執行。
6. 執行下一行 `console.log(5)`，`console.log(5)` EC 被放到 call stack。透過瀏覽器提供的 web api 取用 console 物件，呼叫方法 log，在  console 上印出 5。`console.log(5)` EC 從 call stack 被 pop out。
7. 程式碼執行到底了，Global execution context 從 call stack被 pop out。
8. 至少過了 0 ms 後， callback function `() => {console.log(2)}` (簡稱 cb1) 就會被移到 callback queue 等待。
9. 滿足 「callback queue 裡面有待執行任務」以及「目前 call stack 已清空」這兩個條件，Event loop 就會把 callback queue 裡面的任務一次拿一個出來 (先進來的先被拿出來 )，放到 call stack 裡面。 
10. cb1 execution context 從 callback queue 被拿出來塞到 call stack。 
11. 執行 cb1  `console.log(2)`，透過瀏覽器提供的 web api 取用 console 物件，呼叫方法 log，在  console 上印出 2。
12. cb1 execution context 執行完畢，從 call stack被 pop out。
13. 至少過了 0 ms 後， callback function `() => {console.log(4)}` (簡稱 cb2) 就會被移到 callback queue 等待。
14. 再度滿足 「callback queue 裡面有待執行任務」以及「目前 call stack 已清空」這兩個條件。
15. cb2 execution context 從 callback queue 被拿出來塞到 call stack。 
16. 執行 cb2  `console.log(4)`，透過瀏覽器提供的 web api 取用 console 物件，呼叫方法 log，在  console 上印出 4。
17. Cb2 execution context 執行完畢，從 call stack被 pop out。



console:

```
1
3
5
2
4
```

