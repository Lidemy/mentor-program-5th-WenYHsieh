/* 不用內建函式 String.repeat() 的寫法 */
function generateStars(N) {
  let starContainer
  for (let i = 1; i <= N; i++) {
    starContainer = ''
    for (let j = 1; j <= i; j++) {
      starContainer += '*'
    }
    console.log(starContainer)
  }
}

generateStars(5)

/* 使用 String.repeat()，只用一層 for 的寫法 */
function generateStars2(N) {
  for (let i = 1; i <= N; i++) {
    console.log('*'.repeat(i))
  }
}

generateStars2(5)
