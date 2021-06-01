function getElement(seletor) {
  const element = document.querySelector(seletor)
  return element
}

const nickName = getElement('.nickName')
const email = getElement('input[type="email"]')
const phoneNumber = getElement('input[type="number"]')
const option1 = getElement('.option1')
const option2 = getElement('.option2')
const answer = getElement('.answer')
const submitBtn = getElement('form')
const warning = document.querySelectorAll('input~span')
const questions = [nickName, email, phoneNumber, [option1, option2], answer]

function isEmpty() {
  const emptyCount = []
  for (let i = 0; i < questions.length; i++) {
    if (i !== 3) {
      if (questions[i].value === '') emptyCount.push(i)
    } else {
      if (!questions[i][0].checked && !questions[i][1].checked) emptyCount.push(i)
    }
  }

  if (emptyCount.length !== 0) {
    emptyCount.forEach((index) => { warning[index].innerHTML = '欄位不得為空 !' })
    return true
  }
  return false
}

submitBtn.addEventListener('submit', (e) => {
  if (isEmpty()) {
    e.preventDefault()
  } else {
    const typeAns = []
    if (option1.checked) typeAns.push(option1.nextSibling.nodeValue)
    if (option2.checked) typeAns.push(option2.nextSibling.nodeValue)
    alert(
      `
      報名資訊如下:

      暱稱: ${nickName.value}
      電子郵件: ${email.value}
      手機號碼: ${phoneNumber.value} 
      報名類型: ${typeAns}
      怎麼知道這個活動: ${answer.value}
      `
    )
  }
})
