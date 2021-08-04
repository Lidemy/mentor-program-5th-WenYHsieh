import { addComment } from './api'
import { render, getCssTemplate } from './utils'
import { cssTemplate, getFormTemplate } from './template'
import $ from 'jquery'

export function init (options){
  let limit = 5
  let clickCounter = 0
  let siteKey = ''
  let apiUrl = ''
  let containerElement = null
  let formSelector = ''
  let loadMoreBtnelector = ''

  siteKey = options.siteKey.toString()
  apiUrl = options.apiUrl
  containerElement = $(options.containerElement)
  formSelector = `.form-${siteKey}`
  loadMoreBtnelector = `.load-more-${siteKey}`

  containerElement.append(getFormTemplate(siteKey))
  render(apiUrl, siteKey, limit)

  $(`${formSelector} .submit`).click(()=>{
    const nickname = $(`${formSelector} input[type="text"]`).val()
    const content = $(`${formSelector} textarea`).val()
    if (!nickname || !content) {
      alert('暱稱或內容不得為空，請檢查後再送出唷！')
      return
    }

    addComment(nickname, content, apiUrl, siteKey, (data) => {
      if (!data.ok) {
        alert(data.message)
        return
      }
      $(`${formSelector} input[type="text"]`).val('')
      $(`${formSelector} textarea`).val('')
      render(apiUrl, siteKey, limit)
    })
  })
  
  $(loadMoreBtnelector).click(()=>{
    clickCounter ++
    limit = limit + (5*clickCounter)
    render(apiUrl, siteKey, limit)
  })

  getCssTemplate(cssTemplate)

}
