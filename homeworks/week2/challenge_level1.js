// 現在有一個排序好的陣列 arr，裡面的元素都是正整數而且保證不會重複。

// 給你一個數字 n，請寫出一個函式 search 回傳 n 在這個陣列裡面的 index，沒有的話請回傳 -1。

// 使用 binary search
/*
目的: 找 n 在 arr 中的 index
1. arr 排序
2. 取出位於 arr 中間的元素 (mid), 跟 n 比大小:
    - 若 n > mid, 表示 n 在 mid 的右邊，縮小搜尋範圍至 [index(mid)+1, arr.length-1]
    - 若 n < mid, 表示 n 在 mid 的左邊，縮小搜尋範圍至 [0, index(mid)-1]
    - 若 n = mid, 直接回傳 index(mid)。
3. 若找到最後都沒找到就回傳 -1, 代表 n 不在 arr 裡面。
*/ 

function search(arr, n){
    // arr.sort(function(a, b){return a-b}) // 若 arr 沒排序過需加
    let startIndex = 0;
    let endIndex = arr.length-1;
    while (endIndex >= startIndex){
        let midIndex = Math.floor((startIndex+endIndex)/2);
        if (n === arr[midIndex]){
            console.log(midIndex);
            return
        }else if (n > arr[midIndex]){
            startIndex = midIndex+1;
        }else{
            endIndex = midIndex-1;
        }
    }
    console.log(-1);
    return
}


var readline = require('readline');
var rl = readline.createInterface({
  input: process.stdin
});

var lines = []

// 輸入時的行為:讀取到一行，先把這一行加進去 lines 陣列，最後再一起處理
rl.on('line', function (line) {
  lines.push(line)
});

// 輸入結束後的行為:開始針對 lines 做處理
rl.on('close', function() {
  solve(lines)
})

// 上面都不用管，只需要完成這個 function 就好，可以透過 lines[i] 拿取內容
function solve(lines) {
    let arrLen = lines[0].split(' ')[0];
    let arr = [];
    for (let i=1; i<=arrLen;i++){ arr.push(lines[i]) };
    for (let j=Number(arrLen)+1; j<lines.length; j++){ search(arr, lines[j])}
    return
} 
