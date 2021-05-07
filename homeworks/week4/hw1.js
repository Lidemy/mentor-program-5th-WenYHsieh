const request = require('request')

request('https://lidemy-book-store.herokuapp.com/books?_limit=10',
  (error, response, body) => {
    JSON.parse(body)
      .forEach((book) => console.log(book.id, book.name, response))
  }
)
