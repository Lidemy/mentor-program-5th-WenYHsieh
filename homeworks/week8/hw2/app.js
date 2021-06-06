const errorMsg = 'Oops! 出錯囉，請再試一次！'
const apiURL = 'https://api.twitch.tv/kraken/streams'
const clientID = '6vlusvplvbxvb1xrut6lbqj9msndbo'
const gameBlockWrapper = document.querySelector('.game__block-wrapper')
const showMoreBtn = document.querySelector('.show-more-btn')
let ciikShowMoretimes = 0

function getData(callBack, gameName, numberLimit) {
  const request = new XMLHttpRequest() // 實體化 XMLHttpRequest 物件
  request.onload = function() { // 當 onload 事件發生，呼叫後面的函式
    let json
    if (request.status >= 200 && request.status < 400) { // 錯誤處理
      try {
        json = JSON.parse(request.response)
      } catch (error) {
        callBack(errorMsg)
      }

      if (!json) { return callBack(errorMsg) }

      callBack(null, json.streams)
    } else {
      callBack(errorMsg)
    }
  }

  request.onerror = () => { callBack(errorMsg) }
  const params = `game=${gameName}&limit=${numberLimit}`
  request.open('GET', `${apiURL}?${params}`, true) // 用 GET 發 request 到 google.com， 使用非同步
  request.setRequestHeader('Client-ID', clientID)
  request.setRequestHeader('Accept', 'application/vnd.twitchtv.v5+json')
  request.send() // 真正傳出 request
}

function render(gameName, numberLimit) {
  getData((err, data) => { // api 是按照觀看人數高到低回傳的，不用處理排序
    if (err) return alert(err)
    document.querySelector('.main__game-title').innerHTML = gameName
    showMoreBtn.setAttribute('name', gameName)
    gameBlockWrapper.innerHTML = ''
    data.forEach((game) => {
      gameBlockWrapper.innerHTML += `<div class="main__game-block">
      <a href=${game.channel.url}><img class="main__game-preview" src=${game.preview.medium} border="0"></a>
        <div class="main__game-channel-wrapper">
          <img class="main__game-channel-logo" src=${game.channel.logo}></img>
          <div class="main__game-name-wrapper"> 
            <div class='main__game-stream-name'>${game.channel.status.substring(0, 15)} ...</div>
            <div class="main__game-channel-name">${game.channel.name}</div>
          </div>
        </div>
    </div>
  `
    })
  }, gameName, numberLimit)
}

function switchGame() {
  ciikShowMoretimes = 0
  gameBlockWrapper.innerHTML = ''
  const allGameOptions = document.querySelectorAll('.nav__option')
  allGameOptions.forEach((gameOption) => {
    gameOption.addEventListener('click', (e) => { render(e.target.innerHTML, 20) })
  })
}

function showMoreGame() {
  showMoreBtn.addEventListener('click', (e) => {
    ciikShowMoretimes++
    render(e.target.getAttribute('name'), 20 + (20 * ciikShowMoretimes))
  })
}

function init() {
  switchGame()
  showMoreGame()
  render('League of Legends', 20)
}

init()
