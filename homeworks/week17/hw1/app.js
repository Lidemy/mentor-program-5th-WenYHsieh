const express = require('express')

const app = express()
const port = 8888 //  指定一個 port 給這個 app

app.listen(port, () => {
  //  加上一個監聽器來監聽這個 port
  console.log(`Example app listening at http://localhost:${port}`)
})
app.get('/', (req, res) => {
  res.send('Hello World!') // 設定 response
})
