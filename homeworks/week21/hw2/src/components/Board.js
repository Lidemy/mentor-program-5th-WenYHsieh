import { useState, useRef, useEffect } from 'react'
import styled from 'styled-components';
import Square from './Square';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRetweet } from '@fortawesome/free-solid-svg-icons'
import calculateWinner from '../calculateWinner';

const SquareWrapper = styled.div`
  width: 950px;
  display: grid;
  grid-template-rows: repeat(19, 1fr);
  grid-template-columns: repeat(19, 1fr);
  gap: 0px;
  margin: 0 auto
`

const BoardOutlne = styled.div`
  width: 1000px;
  height: 1000px;
  border: 3px solid black;
  background-color: #eaae5a;
  box-shadow: 0px 3px 4px 0px rgba(0, 0, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px auto;
  position: relative;
`
const BoardGrid = styled.div`
    width: 908px;
    height: 908px;
    border-right: 1px solid black;
    border-bottom: 1px solid black;
    background-size: 51px 51px;
    background-image:
    linear-gradient(to right, black 1px, transparent 1px),
    linear-gradient(to bottom, black 1px, transparent 1px);
    position: absolute;
    top: 48px;
    left: 48px;
`
const Background = styled.div`
  background-color: #878847;
  overflow: auto;
`
const Status = styled.span`
  font-size: 30px;
  font-weight: bold;
  text-align: center;
  font-style: italic;
`
const ControlPanel = styled.div`
  width: 950px;
  display: flex;
  margin: 20px auto;
  justify-content: space-between;
  align-items: center;
`
const GameoverBanner = styled.div`
  width: 100%;
  height: 0px;
  font-size: 50px;
  color: white;
  text-align: center;
  line-height: 200px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 2;
  overflow: hidden;
  transition: 0.8s linear;
  ${props => {
    if (props.$winner) return `height: 200px`
  }}
`

function Board() {
  const [BoardInfo, setBoardInfo] = useState({
    squares: Array(19).fill(Array(19).fill(null)),
  })

  const blackIsNext = useRef(true)

  useEffect(() => {
    calculateWinner(BoardInfo.squares)
    setWinner(calculateWinner(BoardInfo.squares))
  }, [BoardInfo])

  const [winner, setWinner] = useState(null)

  const handleClick = (x, y) => {
    const squares = JSON.parse(JSON.stringify(BoardInfo.squares))
    if (!(squares[x][y] === null) || winner) return
    squares[x][y] = blackIsNext.current ? 'black' : 'white';
    setBoardInfo({
      squares: squares
    });
    blackIsNext.current = !blackIsNext.current
  }

  const handleRestartGame = () => {
    setBoardInfo({
      squares: Array(19).fill(Array(19).fill(null))
    })
  }

  let status = 'Next player: ' + (blackIsNext.current ? 'black' : 'white');
  return <>
    <Background>
    <GameoverBanner $winner={winner}> Game Over  the Winner is {winner} </GameoverBanner>
    <ControlPanel>
      <Status $status={status}> {status} </Status>
      <FontAwesomeIcon icon={faRetweet} size="3x" onClick={handleRestartGame}/>
    </ControlPanel>
      <BoardOutlne>
        <BoardGrid />
        <SquareWrapper>
          {
            BoardInfo.squares.map((boardRow, rowIndex) => {
              return boardRow.map((boardCol, colIndex) => {
                let key = (rowIndex * 19) + colIndex
                return <Square
                          key={key}
                          value={BoardInfo.squares[rowIndex][colIndex]}
                          onClick={() => handleClick(rowIndex, colIndex)}
                      />
              })
            })
          }
        </SquareWrapper>
      </BoardOutlne>
    </Background>
  </>
}

export default Board
