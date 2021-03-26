import styled from "styled-components"
import * as color from "../constants/colors"

export const Button = styled.button.attrs({ type: "button" })`
  border: solid 1px ${color.Silver};
  border-radius: 3px;
  padding: 6px 8px;
  background-color: ${color.LightSilver};
  background-image: linear-gradient(${color.White}, ${color.LightSilver});
  color: ${color.Black};
  font-size: 14px;
  text-align: center;
  display: inline-block;
  margin: 4px 4px 4px 4px;

  :hover:not(:disabled) {
    border-color: ${color.Gray};
    background-position-y: -0.5em;
  }
  :disabled {
    opacity: 0.5;
    cursor: default;
  }
`

export const ConfirmButton = styled(Button)`
  border-color: ${color.Blue};
  background-color: ${color.Navy};
  background-image: linear-gradient(${color.Blue}, ${color.Navy});
  color: ${color.White};

  :hover:not(:disabled) {
    border-color: ${color.Navy};
  }
`
export const NextButton = styled(Button)`
  float: right;
  clear: both;
`
export const BackButton = styled(Button)``

export const ButtonsContainer = styled.div`
  padding: 2px 8px 8px 8px;
  overflow: auto;
`
