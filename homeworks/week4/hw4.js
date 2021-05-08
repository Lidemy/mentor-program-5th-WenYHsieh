const request = require('request')

const clientID = '6vlusvplvbxvb1xrut6lbqj9msndbo'
const header = {
  method: 'GET',
  url: 'https://api.twitch.tv/kraken/games/top',
  headers:
  {
    'Client-ID': clientID,
    Accept: 'application/vnd.twitchtv.v5+json'
  }
}

function handleResponse(error, response, body) {
  try {
    const jsonData = JSON.parse(body)
    const topGameInfo = jsonData.top // array of game info objs
    topGameInfo.forEach((currentGame) => { console.log(currentGame.viewers, currentGame.game.name) })
  } catch (error) {
    console.log(error)
  }
}

request(header, handleResponse)
