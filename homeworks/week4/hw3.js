/*
你的好麻吉小立是一個很愛到處旅遊的人，在前一陣子才靠著便宜的 bug 機票以及特價的商務艙玩遍了許多地方。不過小立一直有個困擾，那就是他希望了解更多跟國家有關的知識，因此他來請你幫忙寫一個搜尋國家資訊的小程式。

這個程式很簡單，只要輸入國家的英文名字，就能夠查詢符合的國家的資訊，會輸出以下幾項：

1. 國家名稱
2. 首都
3. 使用的貨幣名稱
4. 電話國碼

另外，如果沒有找到任何符合的國家，請輸出：「找不到國家資訊」。

*/

const request = require('request')

const divider = '============'

function logQueryInfo(query) {
  if (query === undefined || query.length === 0) return console.log('請輸入國家全名或部份名')

  request(`https://restcountries.eu/rest/v2/name/${query}`,
    (error, response, body) => {
      if (error) return console.log(error)
      if (response.statusCode === 404) return console.log('找不到國家資訊')

      const jsonData = JSON.parse(body)
      jsonData.forEach((result) => {
        console.log(divider)
        console.log(`國家：${result.name}`)
        console.log(`首都：${result.capital}`)
        console.log(`貨幣：${result.currencies[0].code}`)
        console.log(`國碼：${result.callingCodes[0]}`)
      }
      )
    }
  )
}

logQueryInfo('')
