/*
比大小 input 'A B -1/1' => 印出在規則底下獲勝的那方
1:   A 跟 B 比大 => A > B => A; A < B => B
-1:  A 跟 B 比小 => A > B => B; A < B => A
兩種規則，A == B => DRAW

*/

function showdown(A, B, rule) {
  if (A === B) { return 'DRAW' }
  if (rule === 1) {
    if (A > B) { return 'A' } else { return 'B' }
  }
  if (rule === -1) {
    if (A > B) { return 'B' } else { return 'A' }
  }
}

showdown(1, 2, -1)
