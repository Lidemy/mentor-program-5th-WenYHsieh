const inputToDo = document.querySelector('input[type="text"]')
const todoWrapper = document.querySelector('.todo-wrapper')
let todos = []

function render() { // 清空, 為每個 todo 都產生相對應的 html elements
  todoWrapper.innerHTML = ''
  todos.forEach((newToDo, id) => {
    todoWrapper.innerHTML += `<br><div class="todo-container todo-${id}">
                              <input type="checkbox" id="checkbox-no${id}">
                              <label for="checkbox-no${id}">${newToDo}</label>
                              <label class="delete del-${id}"></label>
                              </div>`
    const newToDoContainer = document.querySelector(`.todo-${id}`)
    newToDoContainer.style.position = 'relative'
  })
  const newDelBtns = document.querySelectorAll('.delete')
  newDelBtns.forEach((newDelBtn) => monitorDel(newDelBtn))
}

function monitorAdd() { // 如果按下 enter 且有輸入值 => 取輸入值，存到 todos，把 input 清空，更新畫面
  inputToDo.addEventListener('keydown',
    (e) => {
      if (e.keyCode === 13 && inputToDo.value !== '') {
        todos.push(inputToDo.value)
        inputToDo.value = ''
        render()
      }
    }
  )
}

function monitorDel(newDelBtn) { // 如果按下刪除鍵 => 得到刪除鍵的 ID, 刪除那個位置的 todo, 更新畫面
  newDelBtn.addEventListener('click',
    (e) => {
      const delId = e.target.getAttribute('class').split(' ')[1].split('-')[1]
      todos.splice(parseInt(delId), 1)
      render()
    }
  )
}

function init() {
  monitorAdd()
  todos = ['clean desktop', 'meet milu', 'play with cats',
    'report revision', 'Take the package', 'visit dentist']
  render()
}

init()
