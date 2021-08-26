## hw4：What is this?

請說明以下程式碼會輸出什麼，以及盡可能詳細地解釋原因。

``` js
const obj = {
  value: 1,
  hello: function() {
    console.log(this.value)
  },
  inner: {
    value: 2,
    hello: function() {
      console.log(this.value)
    }
  }
}
  
const obj2 = obj.inner
const hello = obj.inner.hello
obj.inner.hello() // ??
obj2.hello() // ??
hello() // ??
```

`obj.inner.hello()`

obj.inner 為一個物件，obj.inner.hello() 的 this 指到的是 obj.inner，因此 console.log(this.value) 相當於 console.log(obj.inner.value)，會印出 2。

`obj2.hello()`

obj2 = obj.inner，和 obj.inner 是指一樣的東西，因此也是印出  console.log(obj.inner.value)，印出 2。

`hello()`

hello = obj.inner.hello，在 Global 寫 hello()，等同於在 console.log(this.value)。在非嚴格模式之下， this 為 window，window 沒有 value，因此會印出 undefined。

