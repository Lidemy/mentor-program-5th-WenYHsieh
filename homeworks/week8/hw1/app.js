const errorMsg = 'Oops! 出錯囉，請再試一次！'
function getPrize(callBack) {
  const request = new XMLHttpRequest() // 實體化 XMLHttpRequest 物件

  request.onload = function() { // 當 onload 事件發生，呼叫後面的函式
    let json
    if (request.status >= 200 && request.status < 400) { // 錯誤處理
      try {
        json = JSON.parse(request.response)
      } catch (error) {
        callBack(errorMsg)
      }

      if (!json.prize) { return callBack(errorMsg) }

      callBack(null, json.prize)
    } else {
      callBack(errorMsg)
    }
  }

  request.onerror = () => { callBack(errorMsg) }

  request.open('GET', 'https://dvwhnbka7d.execute-api.us-east-1.amazonaws.com/default/lottery', true) // 用 GET 發 request 到 google.com， 使用非同步
  request.send() // 真正傳出 request
}

const prizeInfos = {
  FIRST: ['prize__first', '恭喜你中頭獎了！日本東京來回雙人遊！'],
  SECOND: ['prize__second', '二獎！90吋電視一台！'],
  THIRD: ['prize__third', '恭喜你抽中三獎：知名YouTuber簽名握手會入場券一張，bang！'],
  NONE: ['prize__none', '銘謝惠顧 QAQ ～']
}

document.querySelector('.lottery_btn').addEventListener('click', () => {
  getPrize((err, data) => {
    if (err) return alert(err)
    const [className, info] = prizeInfos[data]
    document.querySelector('.lottery__background').classList.add('hide')
    document.querySelector('.prize__result').classList.remove('hide')
    document.querySelector('.prize__info').innerHTML = info
    document.querySelector('.prize__result').classList.add(className)
  })
})

document.querySelector('.reDraw').addEventListener('click', () => {
  window.location.reload()
})
