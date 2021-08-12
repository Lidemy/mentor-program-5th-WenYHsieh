const errorMsg = 'Oops! 出錯囉，請再試一次！'
const streamApiURL = 'https://api.twitch.tv/kraken/streams'
const topGameApiURL = 'https://api.twitch.tv/kraken/games/top'
const clientID = '6vlusvplvbxvb1xrut6lbqj9msndbo'
const gameBlockWrapper = document.querySelector('.game__block-wrapper')
const showMoreBtn = document.querySelector('.show-more-btn')
const navOptionWrapper = document.querySelector('.nav__option-wrapper')
const template = `
  <div class="main__game-block">
    <a href=$gameChannelUrl><img class="main__game-preview" src=$gamePreviewMedium border="0"></a>
    <div class="main__game-channel-wrapper">
      <img class="main__game-channel-logo" src=$gameChannelLogo></img>
      <div class="main__game-name-wrapper"> 
        <div class='main__game-stream-name'>$gameChannelStatus</div>
        <div class="main__game-channel-name">$gameChannelName</div>
      </div>
    </div>
  </div>
`
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
    .catch((err) => {
      console.error(err)
    })
}

function renderData(data, gameName) {
  document.querySelector('.main__game-title').innerHTML = gameName
  showMoreBtn.setAttribute('name', gameName)
  gameBlockWrapper.innerHTML = ''
  data.streams.forEach((game) => {
    gameBlockWrapper.innerHTML += template
      .replace('$gameChannelUrl', game.channel.url)
      .replace('$gamePreviewMedium', game.preview.medium)
      .replace('$gameChannelLogo', game.channel.logo)
      .replace('$gameChannelStatus', game.channel.status.substring(0, 15))
      .replace('$gameChannelName', game.channel.name)
  })
}

function init() {
  // get top 5 game data, render navagation bar and default page
  getTopGame().then((data)=>{
    const topFiveData = data.top.slice(0, 5)
    const topGameName = data.top[0].game.name
    getData(topGameName, 20).then((data) => {renderData(data, topGameName)})
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
    let activeGameName = e.target.getAttribute('name')
    getData(activeGameName, 20 + (20 * ciikShowMoretimes)).then((data) => {renderData(data, activeGameName)})
  })
  // add eventlistener to parent element, event delegation for switch game option
  navOptionWrapper.addEventListener('click', (e) => {
    ciikShowMoretimes = 0
    gameBlockWrapper.innerHTML = ''
    getData(e.target.innerHTML, 20).then((data) => {renderData(data, e.target.innerHTML)})
  })
}

init()
