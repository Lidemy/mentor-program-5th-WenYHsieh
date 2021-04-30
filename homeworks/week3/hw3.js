/*
目標: 每個數字進來我要判斷他是否是質數 => 大於 1 的整數，除了 1 和自己以外沒有其他數字能整除就是質數
質數: log 'Prime'
合數 & 1: log 'Composite'
*/
function isPrime(N) {
  if (N === 1) {
    return 'Composite'
  }
  for (let i = 2; i <= N - 1; i++) { // 列舉 2 ~ 除了自己以外的所有數字
    if (N % i === 0) { // 如果被其他數字除之後能整除，就是 Composite
      return 'Composite'
    }
  }
  return 'Prime'
}

console.log(isPrime(2))
