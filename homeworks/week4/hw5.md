## 請以自己的話解釋 API 是什麼

API 是為了程式之間交換資料 (功能) 而存在的一種介面，介面會規範明確的資料交換規則，例如: 內容、資料格式及標準化的溝通代號等等。

## 請找出三個課程沒教的 HTTP status code 並簡單介紹

- 201 Created: 是成功建立資料的代碼，通常是在 PUT 或 POST 成功後回傳的代碼。
- 401 Unauthorized: 需要授權才能獲得資源的情況，如果沒有出示身分驗證就會出現這個代碼。
- 405 Method Not Allowed: 使用了目標 API 目前不支援的 method。

!(MDN - HTTP status code)[https://developer.mozilla.org/zh-TW/docs/Web/HTTP/Status]

## 假設你現在是個餐廳平台，需要提供 API 給別人串接並提供基本的 CRUD 功能，包括：回傳所有餐廳資料、回傳單一餐廳資料、刪除餐廳、新增餐廳、更改餐廳，你的 API 會長什麼樣子？請提供一份 API 文件。

|                  | Method | Path             | 參數                           | 範例            |
| :--------------- | ------ | ---------------- | ------------------------------ | --------------- |
| 回傳所有餐廳資料 | GET    | /restaurants     | -                              | /restaurants    |
| 回傳單一餐廳資料 | GET    | /restaurants/:id | -                              | /restaurants/22 |
| 刪除餐廳         | DELETE | /restaurants/:id | -                              | -               |
| 新增餐廳         | POST   | /restaurants     | id: 22, name: 'new restaurant' | -               |
| 更改餐廳         | PATCH  | /restaurants/:id | name: 'renew restaurant'       | -               |

