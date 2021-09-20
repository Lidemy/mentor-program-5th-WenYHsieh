import styled from "styled-components";

const ChessmanItem = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid black;
  box-shadow: 0px 2px 2px 2px rgba(0, 0, 0, 0.12);
  ${ (props) =>
    (props.$color === 'white' && `background-color: white`) ||
    (props.$color === 'black' && `background-color: #111110`) ||
    `display: none`
  }
`

export default function Chessman({color}) {
  return <>
    <ChessmanItem $color={color}/>
  </>
}
