import styled from "styled-components"
import * as color from "../constants/colors"

const Input = styled.input`
  display: block;
  width: 66%;
  margin-bottom: 8px;
  margin-left: 10px;
  margin-right: 10px;
  border: solid 1px ${color.Silver};
  border-radius: 3px;
  padding: 6px 8px;
  background-color: ${color.White};
  font-size: 14px;
  line-height: 1.7;
  display: inline-block;

  :focus {
    outline: none;
    border-color: ${color.Blue};
  }
`

export default Input
