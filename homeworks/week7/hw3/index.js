const inputToDo = document.querySelector('input[type="text"]')
const todoWrapper = document.querySelector('.todo-wrapper')
let todos = {}

function render() {
  todoWrapper.innerHTML = ''
  const arrToDos = Object.entries(todos)
  arrToDos.forEach((newToDoArr) => {
    todoWrapper.innerHTML += `<div class="todo-container todo-${newToDoArr[0]}">
                              <input type="checkbox" id="checkbox-no${newToDoArr[0]}">
                              <label for="checkbox-no${newToDoArr[0]}">${newToDoArr[1]}</label>
                              <label class="delete del-${newToDoArr[0]}"></label>
                              </div>`
    const newToDoContainer = document.querySelector(`.todo-${newToDoArr[0]}`)
    newToDoContainer.style.position = 'relative'
  })
  const newDelBtns = document.querySelectorAll('.delete')
  newDelBtns.forEach((newDelBtn) => monitorDel(newDelBtn))
}

function monitorAdd() {
  inputToDo.addEventListener('keydown',
    (e) => {
      if (e.keyCode === 13 && inputToDo.value !== '') {
        const nextId = Object.keys(todos).unshift() + 1
        todos[nextId] = inputToDo.value
        inputToDo.value = ''
        render()
      }
    }
  )
}

function monitorDel(newDelBtn) {
  newDelBtn.addEventListener('click',
    (e) => {
      const delId = e.target.getAttribute('class').split(' ')[1].split('-')[1]
      const delToDoContainer = document.querySelector(`.todo-${delId}`)
      delToDoContainer.remove()
      delete todos[delId]
    }
  )
}

function init() {
  todos = {
    1: 'play with cats',
    2: 'report revision',
    3: 'visit dentist',
    4: 'clean desktop',
    5: 'take packages'
  }
  monitorAdd()
  render()
}

init()
