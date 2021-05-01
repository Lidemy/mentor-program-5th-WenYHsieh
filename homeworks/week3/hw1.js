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
  const starContainer = []
  for (let i = 1; i <= N; i++) {
    starContainer.push('*'.repeat(i))
  }
  starContainer.forEach((star) => console.log(star))
}

generateStars2(5)
