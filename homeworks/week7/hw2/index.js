function addEventListenerToQuestions(questionsNumber) {
  for (let i = 0; i < questionsNumber; i++) {
    const questionsTitle = document.querySelector(`.title-q${i + 1}`)
    questionsTitle.addEventListener('click', () => {
      const questionsContent = document.querySelector(`.content-q${i + 1}`)
      questionsContent.classList.toggle('toggleClass')
    }
    )
  }
}

addEventListenerToQuestions(6)
