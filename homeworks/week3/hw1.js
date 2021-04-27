function starGenerator(N) {
  let starContainer
  for (let i = 1; i <= N; i++) {
    starContainer = ''
    for (let j = 1; j <= i; j++) {
      starContainer += '*'
    }
    console.log(starContainer)
  }
}
starGenerator(5)
