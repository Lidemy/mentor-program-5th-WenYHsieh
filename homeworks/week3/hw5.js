/*
比大小 input 'A B -1/1' => 印出在規則底下獲勝的那方
1:   A 跟 B 比大 => A > B => A; A < B => B
-1:  A 跟 B 比小 => A > B => B; A < B => A
兩種規則，A == B => DRAW

*/

function showdown(A, B, rule) {
  if (A === B) { return console.log('DRAW') }
  if (rule === 1) {
    if (A > B) { return console.log('A') } else { console.log('B') }
  }
  if (rule === -1) {
    if (A > B) { return console.log('B') } else { console.log('A') }
  }
}

showdown(1, 2, -1)
/*
var readline = require('readline');
var rl = readline.createInterface({
  input: process.stdin
});

var lines = []

rl.on('line', function (line) {
  lines.push(line)
});

rl.on('close', function() {
  solve(lines)
})

function solve(lines) {
  lines.shift()
  let params = []
  for (let i = 0; i < lines.length; i++) {
    params = lines[i].split(' ')
    showdown(BigInt(params[0]), BigInt(params[1]), Number(params[2]))
  }
}
*/
