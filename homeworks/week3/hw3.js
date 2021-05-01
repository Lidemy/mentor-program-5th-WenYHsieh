/*
目標: 每個數字進來我要判斷他是否是質數 => 大於 1 的整數，除了 1 和自己以外沒有其他數字能整除就是質數
質數: log 'Prime'
合數 & 1: log 'Composite'
*/

/* 判斷是否為 Prime, 是: true, 否: false */
function isPrime(N) {
  if (N === 1) {
    return false
  }
  for (let i = 2; i <= N - 1; i++) { // 列舉 2 ~ 除了自己以外的所有數字
    if (N % i === 0) { // 如果被其他數字除之後能整除，就是 Composite
      return false
    }
  }
  return true
}

/* 依據 isPrime() 印出這個數字是 'Prime' or 'Composite' */
function logPrime(N) {
  return isPrime(N) ? 'Prime' : 'Composite'
}

console.log(logPrime(8))
