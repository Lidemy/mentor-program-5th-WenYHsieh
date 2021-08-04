const errorMsg = 'Oops! 出錯囉，請再試一次！'
const streamApiURL = 'https://api.twitch.tv/kraken/streams'
const topGameApiURL = 'https://api.twitch.tv/kraken/games/top'
const clientID = '6vlusvplvbxvb1xrut6lbqj9msndbo'
const gameBlockWrapper = document.querySelector('.game__block-wrapper')
const showMoreBtn = document.querySelector('.show-more-btn')
const navOptionWrapper = document.querySelector('.nav__option-wrapper')
let ciikShowMoretimes = 0

function getTopGame() {
  return fetch(topGameApiURL, {
    headers: {
    'Accept': 'application/vnd.twitchtv.v5+json',
    'Client-ID': clientID
    }})
    .then((result) => {
      return result.json()
    })
}

function getData(gameName, numberLimit) {
  const params = `game=${gameName}&limit=${numberLimit}`
  return fetch(`${streamApiURL}?${params}`, {
    headers: {
    'Accept': 'application/vnd.twitchtv.v5+json',
    'Client-ID': clientID
    }})
    .then((result) => {
      return result.json()
    })
}

function renderData(gameName, numberLimit) {
  getData(gameName, numberLimit).then((data) => {
    document.querySelector('.main__game-title').innerHTML = gameName
    showMoreBtn.setAttribute('name', gameName)
    gameBlockWrapper.innerHTML = ''
    data.streams.forEach((game) => {
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
  })
  .catch((err) => {
    console.error(err)
  })
}

function init() {
  // get top 5 game data, render navagation bar and default page
  getTopGame().then((data)=>{
    const topFiveData = data.top.slice(0, 5)
    renderData(data.top[0].game.name, 20)
    for (const game of topFiveData) {
      navOptionWrapper.innerHTML += `<div class="nav__option">${game.game.name}</div>`
    }
  })
  .catch((err) => {
    console.error(err)
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
