/* eslint-disable no-alert, no-undef, object-shorthand, prefer-destructuring, dot-notation */
const siteKey = 2222
// const addCommentsApi = 'http://mentor-program.co/mtr04group2/yu/week12/hw1/api_add_comments.php'
// const getCommentApi = 'http://mentor-program.co/mtr04group2/yu/week12/hw1/api_comments.php'
const addCommentsApi = 'http://localhost/message_board_ajax/api_add_comments.php'
const getCommentApi = 'http://localhost/message_board_ajax/api_comments.php'
let limit = 5
let clickCounter = 0

function getComments(callback) {
  $.ajax({
    type: 'GET',
    url: `${getCommentApi}?site_key=${siteKey}&limit=${limit}`
  }).done((res) => {
    callback(res)
  })
}

function render() {
  getComments((data) => {
    if (!data.ok) {
      alert(data.message)
      return
    }
    const discussions = data.discussions
    $('.discussions').empty()
    for (const comment of discussions) {
      $('.discussions').append(
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
  })
}

function addComment(nickname, content) {
  $.ajax({
    type: 'POST',
    url: addCommentsApi,
    data: {
      nickname: nickname,
      content: content,
      site_key: siteKey
    },
    success: function() {
      $('input[type="text"]').val('')
      $('textarea').val('')
      render()
    }
  })
}

function escape(toOutput) {
  return toOutput
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

$(document).ready(() => {
  render()
  $('.submit').click(() => {
    const nickname = $('input[type="text"]').val()
    const content = $('textarea').val()
    if (!nickname || !content) {
      alert('暱稱或內容不得為空，請檢查後再送出唷！')
      return
    }
    addComment(nickname, content)
  })

  $('.load-more').click(() => {
    clickCounter++
    limit = limit + (5 * clickCounter)
    render()
  })
})
