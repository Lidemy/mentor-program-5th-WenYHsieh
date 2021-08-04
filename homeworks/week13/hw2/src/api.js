import $ from 'jquery'

export function getComments(callback, apiUrl, siteKey, limit) {
  $.ajax({
    type: 'GET',
    url: `${apiUrl}/api_comments.php?site_key=${siteKey}&limit=${limit}`
  }).done((res)=>{
    callback(res)
  })
}

export function addComment(nickname, content, apiUrl, siteKey, callback){
  $.ajax({
    type: "POST",
    url: `${apiUrl}/api_add_comments.php`,
    data: {
      nickname:nickname,
      content:content,
      site_key:siteKey
    },
    success: function(data) {
      callback(data)
    }
  })
}