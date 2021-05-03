/*
比大小 input 'A B -1/1' => 印出在規則底下獲勝的那方
1:   A 跟 B 比大 => A > B => A; A < B => B
-1:  A 跟 B 比小 => A > B => B; A < B => A
兩種規則，A == B => DRAW
*/

/* Use BigInt */
function guessWhoWins(A, B, rule) {
  if (A === B) return 'DRAW'
  if (rule === 1) return A > B ? 'A' : 'B'
  if (rule === -1) return A > B ? 'B' : 'A'
}

guessWhoWins(1, 2, -1)

/*
function solve(lines) {
  lines.shift()
  let params = []
  for (let i = 0; i < lines.length; i++) {
    params = lines[i].split(' ')
    guessWhoWins(BigInt(params[0]), BigInt(params[1]), Number(params[2]))
  }
}
*/

/* Use String Unicode 編碼位置來比較 */
function guessWhoWins2(A, B, rule) {
  if (A === B) return 'DRAW'
  if (rule === 1) return isNumber1Bigger(A, B) ? 'A' : 'B'
  if (rule === -1) return isNumber1Bigger(A, B) ? 'B' : 'A'
}

function isNumber1Bigger(num1, num2) {
  // 長度相同比字典序, 長度不同比長度
  if (num1.length === num2.length) return num1 > num2
  return num1.length > num2.length
}

guessWhoWins2(1, 2, -1)

/*
function solve2(lines) {
  lines.shift()
  let params = []
  for (let i = 0; i < lines.length; i++) {
    params = lines[i].split(' ')
    console.log(guessWhoWins2(params[0], params[1], Number(params[2])))
  }
}
*/
