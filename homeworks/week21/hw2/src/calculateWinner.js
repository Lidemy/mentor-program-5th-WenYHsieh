const generateAllURtoLLIndexArr = () => {
  let indexOfAllPoints = []
  let indexOfsingleLineOfPoints = []

  for (let pointerX = 4; pointerX <= 18; pointerX ++) {
    let currentX = pointerX
    let currentY = 0
    while (currentX >= 0) {
      indexOfsingleLineOfPoints.push([currentX, currentY])
      currentX -- 
      currentY ++
    }
    indexOfAllPoints.push(indexOfsingleLineOfPoints)
    indexOfsingleLineOfPoints = []
  }
  for (let pointerY = 1; pointerY <= 14; pointerY ++) {
    let currentX = 18
    let currentY = pointerY
    while (currentY <= 18) {
      indexOfsingleLineOfPoints.push([currentX, currentY])
      currentX -- 
      currentY ++
    }
    indexOfAllPoints.push(indexOfsingleLineOfPoints)
    indexOfsingleLineOfPoints = []
  }

  return indexOfAllPoints
}

const generateAllULtoLRIndexArr = () => {
  let indexOfAllPoints = []
  let indexOfsingleLineOfPoints = []

  for (let pointerX = 14; pointerX >= 0; pointerX --) {
    let currentX = pointerX
    let currentY = 0
    while (currentX <= 18) {
      indexOfsingleLineOfPoints.push([currentX, currentY])
      currentX ++
      currentY ++
    }
    indexOfAllPoints.push(indexOfsingleLineOfPoints)
    indexOfsingleLineOfPoints = []
  }
  for (let pointerY = 1; pointerY <= 14; pointerY ++) {
    let currentX = 0
    let currentY = pointerY
    while (currentY <= 18) {
      indexOfsingleLineOfPoints.push([currentX, currentY])
      currentX ++
      currentY ++
    }
    indexOfAllPoints.push(indexOfsingleLineOfPoints)
    indexOfsingleLineOfPoints = []
  }

  return indexOfAllPoints
}

const generateAllTopToBottomIndexArr = () => {
  let indexOfAllPoints = []
  let indexOfsingleLineOfPoints = []

  for (let pointerX = 0; pointerX <= 18; pointerX ++) {
    let currentX = pointerX
    let currentY = 0
    while (currentY <= 18) {
      indexOfsingleLineOfPoints.push([currentX, currentY])
      currentY ++
    }
    indexOfAllPoints.push(indexOfsingleLineOfPoints)
    indexOfsingleLineOfPoints = []
  }

  return indexOfAllPoints
}


const generateAllLeftToRightIndexArr = () => {
  let indexOfAllPoints = []
  let indexOfsingleLineOfPoints = []

  for (let pointerY = 0; pointerY <= 18; pointerY ++) {
    let currentX = 0
    let currentY = pointerY
    while (currentX <= 18) {
      indexOfsingleLineOfPoints.push([currentX, currentY])
      currentX ++
    }
    indexOfAllPoints.push(indexOfsingleLineOfPoints)
    indexOfsingleLineOfPoints = []
  }

  return indexOfAllPoints
}

const completeIndexArr = [...generateAllLeftToRightIndexArr(), ...generateAllTopToBottomIndexArr(),
                          ...generateAllULtoLRIndexArr(), ...generateAllURtoLLIndexArr()]

const isFiveContinuousChessmanIdentical = (arr) => {
  for (let i = 0; i < arr.length; i ++) {
    let subArr = [arr[i], arr[i+1], arr[i+2], arr[i+3], arr[i+4]]
    let subSetArr = [...new Set(subArr)]
    if ((subSetArr.length === 1) && (subSetArr[0] !== null)) return subSetArr[0]
  }
  return false
}

export default function calculateWinner(squares) {
  let chessmanArr = []
  for (let subIndexArr of completeIndexArr) {
    for (let coordination of subIndexArr) {
      chessmanArr.push(squares[coordination[0]][coordination[1]])
    }
    let result = isFiveContinuousChessmanIdentical(chessmanArr)
    if (result) return result
    chessmanArr = []
  }
  return false
}
