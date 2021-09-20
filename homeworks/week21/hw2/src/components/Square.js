import React from "react";
import styled from "styled-components"
import Chessman from './Chessman';

const SquareComponent = styled.div`
  width: 48px;
  height: 48px;
  border: 1px solid transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 0;
  border-radius: 50%;
  transition: .4s;
  &:hover{
    background-color: rgba(0, 0, 0, 0.12);
  }
`
function Square({value, onClick}) {
  return <>
    <SquareComponent onClick={onClick}>
      <Chessman color={value} />
    </SquareComponent>
  </>

}

export default Square 