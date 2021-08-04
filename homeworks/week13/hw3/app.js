const errorMsg = 'Oops! 出錯囉，請再試一次！'
const streamApiURL = 'https://api.twitch.tv/kraken/streams'
const topGameApiURL = 'https://api.twitch.tv/kraken/games/top'
const clientID = '6vlusvplvbxvb1xrut6lbqj9msndbo'
const gameBlockWrapper = document.querySelector('.game__block-wrapper')
const showMoreBtn = document.querySelector('.show-more-btn')
const navOptionWrapper = document.querySelector('.nav__option-wrapper')
let ciikShowMoretimes = 0

function getTopGame(callBack) {
  fetch(topGameApiURL, {
    headers: {
    'Accept': 'application/vnd.twitchtv.v5+json',
    'Client-ID': clientID
    }})
    .then((result) => {
      return result.json()
    })
    .then((data) => {
      callBack(null, data.top)
    })
    .catch((err) => {
      console.error(err)
      callBack(err)
    }) 
}

function getData(callBack, gameName, numberLimit) {
  const params = `game=${gameName}&limit=${numberLimit}`
  fetch(`${streamApiURL}?${params}`, {
    headers: {
    'Accept': 'application/vnd.twitchtv.v5+json',
    'Client-ID': clientID
    }})
    .then((result) => {
      return result.json()
    })
    .then((data) => {
      callBack(null, data.streams)
    })
    .catch((err) => {
      console.error(err)
      callBack(err)
    })
}

function renderData(gameName, numberLimit) {
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

function init() {
  // get top 5 game data, render navagation bar and default page
  getTopGame((err, data) => {
    if (err) return alert(err)
    const topFiveData = data.slice(0, 5)
    renderData(data[0].game.name, 20)
    for (const game of topFiveData) {
      navOptionWrapper.innerHTML += `<div class="nav__option">${game.game.name}</div>`
    }
  })
  // add eventlistener to show more btn
  showMoreBtn.addEventListener('click', (e) => {
    ciikShowMoretimes++
    renderData(e.target.getAttribute('name'), 20 + (20 * ciikShowMoretimes))
  })
  // add eventlistener to parent element, event delegation for switch game option
  navOptionWrapper.addEventListener('click', (e) => {
    ciikShowMoretimes = 0
    gameBlockWrapper.innerHTML = ''
    renderData(e.target.innerHTML, 20)
  })
}

init()
