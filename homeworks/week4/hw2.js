/*
node  hw2 . js list  //印出前二十本書的id與書名
node  hw2 . js  read  1  //輸出id為1的書籍
node  hw2 . js delete  1  //刪除id為1的書籍
node  hw2 . js  create  "I love coding"  //新增一本名為I love coding的書
node  hw2 . js  update  1  "new name"  //更新id為1的書名為new name
*/
const request = require('request')
const process = require('process')

const action = process.argv
const baseURL = 'https://lidemy-book-store.herokuapp.com/books'

switch (action[2]) {
  case 'list': list()
    break

  case 'read': read(action[3])
    break

  case 'update': update(action[3], action[4])
    break

  case 'delete': del(action[3])
    break

  case 'create': create(action[3])
    break
}

function list() {
  request(
    `${baseURL}?_limit=20`,
    (err, response, body) => {
      JSON.parse(body)
        .forEach((book) => console.log(book.id, book.name))
    }
  )
}

function read(n) {
  request(
    `${baseURL}/${n}`,
    (err, response, body) => {
      console.log(JSON.parse(body).id, JSON.parse(body).name)
    }
  )
}

function update(n, updatedName) {
  request.patch(
    {
      url: `${baseURL}/${n}`,
      form: { name: updatedName }
    }
  )
}

function del(n) {
  request.delete(
    `${baseURL}/${n}`
  )
}

function create(newBookName) {
  request.post(
    {
      url: baseURL,
      form: { name: newBookName }
    }
  )
}
