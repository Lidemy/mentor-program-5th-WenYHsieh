// 想比較一個區間當中的某個數字，經過轉換後跟轉換前的數值不是一樣
// => if number = number[0]**3 + number[1]**3 + number[2]**3
/*
1. for loop 列舉出區間中每個數
2. 計算轉換後數
  2.1 得到他共有幾位數 => 轉換成字串後 .length
  2.2 for loop 列舉出每個位數數字 => 得到每個位數數字的位數次方，累加到變數當中存著，直到列完
3. if 這個轉換後的數字等於原本的 => 他就是水仙花數字，印出來
*/
function logNarcissisticNumber(start, end) {
  let power
  let temp
  let currentNumber
  for (let i = start; i <= end; i++) {
    temp = 0
    currentNumber = i.toString()
    power = currentNumber.length
    for (let j = 0; j < power; j++) temp += Number(currentNumber[j]) ** power
    if (temp === i) console.log(i)
  }
}

logNarcissisticNumber(5, 200)
