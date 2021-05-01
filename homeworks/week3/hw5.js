/*
比大小 input 'A B -1/1' => 印出在規則底下獲勝的那方
1:   A 跟 B 比大 => A > B => A; A < B => B
-1:  A 跟 B 比小 => A > B => B; A < B => A
兩種規則，A == B => DRAW

*/

function guessWhoWins(A, B, rule) {
  if (A === B) { return 'DRAW' }
  if (rule === 1) {
    return A > B ? 'A' : 'B'
    // if (A > B) { return 'A' } else { return 'B' }
  }
  if (rule === -1) {
    return A > B ? 'B' : 'A'
    // if (A > B) { return 'B' } else { return 'A' }
  }
}

guessWhoWins(1, 2, -1)

const readline = require('readline')

const rl = readline.createInterface({
  input: process.stdin
})

const lines = []

rl.on('line', (line) => {
  lines.push(line)
})

rl.on('close', () => {
  solve(lines)
})

function solve(lines) {
  lines.shift()
  let params = []
  for (let i = 0; i < lines.length; i++) {
    params = lines[i].split(' ')
    guessWhoWins(BigInt(params[0]), BigInt(params[1]), Number(params[2]))
  }
}
