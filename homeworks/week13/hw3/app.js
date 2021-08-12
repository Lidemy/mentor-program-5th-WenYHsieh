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
const TOP_GAME_QUANTITY = 5
const CARD_QUANTITY = 20

let ciikShowMoretimes = 0

function getTopGame() {
  return fetch(topGameApiURL, {
    headers: {
      Accept: 'application/vnd.twitchtv.v5+json',
      'Client-ID': clientID
    }
  })
    .then((result) => result.json())
    .catch((err) => console.log(err))
}

function getData(gameName, numberLimit) {
  const params = `game=${gameName}&limit=${numberLimit}`
  return fetch(`${streamApiURL}?${params}`, {
    headers: {
      Accept: 'application/vnd.twitchtv.v5+json',
      'Client-ID': clientID
    }
  })
    .then((result) => result.json())
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

async function init() {
  // get top 5 game data, render navagation bar and default page
  const topGameData = await getTopGame()
  const topFiveData = topGameData.top.slice(0, TOP_GAME_QUANTITY)
  const topGameName = topGameData.top[0].game.name
  const data = await getData(topGameName, CARD_QUANTITY)
  renderData(data, topGameName)
  for (const game of topFiveData) {
    navOptionWrapper.innerHTML += `<div class="nav__option">${game.game.name}</div>`
  }
  // add eventlistener to show more btn
  showMoreBtn.addEventListener('click', async(e) => {
    ciikShowMoretimes++
    const activeGameName = e.target.getAttribute('name')
    const data = await getData(activeGameName, CARD_QUANTITY + (CARD_QUANTITY * ciikShowMoretimes))
    renderData(data, activeGameName)
  })
  // add eventlistener to parent element, event delegation for switch game option
  navOptionWrapper.addEventListener('click', async(e) => {
    ciikShowMoretimes = 0
    gameBlockWrapper.innerHTML = ''
    const data = await getData(e.target.innerHTML, CARD_QUANTITY)
    renderData(data, e.target.innerHTML)
  })
}

init()
