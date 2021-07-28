/* eslint-disable no-alert, no-undef, object-shorthand, prefer-destructuring, dot-notation */
const params = (new URL(document.location)).searchParams
const id = params.get('user_key')

$(document).ready(() => {
  if (id) {
    $.ajax({
      type: 'GET',
      // url: `http://localhost/todo_list_ajax/api_handle_requst.php?user_key=${id}`
      url: `http://mentor-program.co/mtr04group2/yu/week12/hw2/api_handle_requst.php?user_key=${id}`
    }).done((res) => {
      const resContent = JSON.parse(res.discussions[0].content)
      const resChecked = JSON.parse(res.discussions[0].checked)
      for (let i = 0; i < resContent.length; i++) {
        renderTodo(escape(resContent[i]), resChecked[i])
      }
    })
  }
  updateUncheckedNumber()
  const inputTodo = $('.board__input-todo')
  inputTodo.keypress((e) => {
    if (e.keyCode === 13) {
      const todo = inputTodo.val()
      if (todo) {
        inputTodo.val('')
        renderTodo(escape(todo))
        updateUncheckedNumber()
      }
    }
  })
  $('.board__todo-container').click((e) => {
    if ($(e.target).hasClass('btn-close')) {
      $(e.target).parent().remove()
      updateUncheckedNumber()
    }
    if ($(e.target).is('input[type="checkbox"]')) {
      updateUncheckedNumber()
      $(e.target).parent().parent().find('input[type="text"]').toggleClass('checked')
    }
  })

  $('.completed').click(() => {
    $('input[type="checkbox"]:not(:checked)').parent().parent().addClass('hide')
    $('input[type="checkbox"]:checked').parent().parent().removeClass('hide')
    updateUncheckedNumber()
  })
  $('.active').click(() => {
    $('input[type="checkbox"]:checked').parent().parent().addClass('hide')
    $('input[type="checkbox"]:not(:checked)').parent().parent().removeClass('hide')
    updateUncheckedNumber()
  })
  $('.all').click(() => {
    if ($('.board__todo-block').hasClass('hide')) {
      $('.board__todo-block').removeClass('hide')
      updateUncheckedNumber()
    }
  })
  $('.clear-completed').click(() => {
    $('input[type="checkbox"]:checked').parent().parent().remove()
    updateUncheckedNumber()
  })
  $('.save-todo').click(() => {
    const todos = []
    const checked = []
    let userKey
    $('.board__todo-container').find('.board__todo').each((index, val) => {
      todos.push($(val).val())
      checked.push($(val).hasClass('checked') ? 1 : 0)
    })
    if (id == null) {
      userKey = generateUserKey()
    } else {
      userKey = id
      sendPostReq(userKey)
    }
    sendPostReq(userKey, todos, checked)
    // alert(`儲存成功！ 以下為您的專屬連結：http://localhost/todo_list_ajax/index.html?user_key=${userKey}`)
    alert(`儲存成功！ 以下為您的專屬連結：http://mentor-program.co/mtr04group2/yu/week12/hw2/index.html?user_key=${userKey}`)
  })
})

function updateUncheckedNumber() {
  const result = $('input[type="checkbox"]:not(:checked)').length
  return $('.board__todo-number').text(`${result} items Left`)
}

function generateUserKey() {
  let result = ''
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  const charactersLength = characters.length
  for (let i = 0; i < 10; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
  }
  return result
}

function renderTodo(todo, checked) {
  if (checked === 1) {
    $('.board__todo-container').append(`
      <div class="input-group mb-3 board__todo-block">
        <div class="input-group-text">
          <input class="form-check-input mt-0" type="checkbox" checked>
        </div>
        <input type="text" class="form-control board__todo checked" value=${todo}>
        <button type="button" class="btn-close"></button>
      </div>
      `
    )
    return
  }
  $('.board__todo-container').append(`
      <div class="input-group mb-3 board__todo-block">
        <div class="input-group-text">
          <input class="form-check-input mt-0" type="checkbox">
        </div>
        <input type="text" class="form-control board__todo" value=${todo}>
        <button type="button" class="btn-close"></button>
      </div>
      `
  )
}

function sendPostReq(userKey, todos = 0, checked = 0) {
  $.ajax({
    type: 'POST',
    // url: 'http://localhost/todo_list_ajax/api_handle_requst.php',
    url: 'http://mentor-program.co/mtr04group2/yu/week12/hw2/api_handle_requst.php',
    data: {
      user_key: userKey,
      content: JSON.stringify(todos),
      checked: JSON.stringify(checked)
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
