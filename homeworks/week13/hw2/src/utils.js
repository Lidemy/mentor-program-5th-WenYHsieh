import { getComments } from './api'

export function escape(toOutput){
  return toOutput.replace(/\&/g, '&amp;')
      .replace(/\</g, '&lt;')
      .replace(/\>/g, '&gt;')
      .replace(/\"/g, '&quot;')
      .replace(/\'/g, '&#x27')
      .replace(/\//g, '&#x2F')
}

export function render(apiUrl, siteKey, limit){
  getComments((data)=>{
    if (!data.ok) {
      alert(data.message)
      return
    }
    let discussions = data.discussions
    $(`.discussions-${siteKey}`).empty()
    for (let comment of discussions){
      $(`.discussions-${siteKey}`).append(
        `
        <div class="card">
          <h5 class="card-header"> ${escape(comment['nickname'])} <span class='card-created-at'> ${escape(comment['created_at'])} </span></h5>
          <div class="card-body">
            <p class="card-text"> ${escape(comment['content'])} </p>
          </div>
        </div>
        `
      )
    }
  },
  apiUrl, siteKey, limit)
}

export function getCssTemplate(cssTemplate){
  const styleElement = document.createElement('style')
  styleElement.type = 'text/css'
  styleElement.appendChild(document.createTextNode(cssTemplate))
  document.head.appendChild(styleElement)
}