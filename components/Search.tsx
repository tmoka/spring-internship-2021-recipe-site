import { FC } from "react"
import styled from "styled-components"
import * as color from "../constants/colors"

export type SearchProps = {
  keyword: string
}

const Search: FC = () => {
  return (
    <SearchContainer>
      <form>
        <Input />
        <ConfirmButton>検索</ConfirmButton>
      </form>
    </SearchContainer>
  )
}

export default Search

const SearchContainer = styled.div`
  width: 100%;
`

const Input = styled.input`
  display: block;
  width: 80%;
  margin-bottom: 8px;
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

export const Button = styled.button.attrs({ type: "button" })`
  width: 10%;
  border: solid 1px ${color.Silver};
  border-radius: 3px;
  padding: 6px 8px;
  background-color: ${color.LightSilver};
  background-image: linear-gradient(${color.White}, ${color.LightSilver});
  color: ${color.Black};
  font-size: 14px;
  text-align: center;
  display: inline-block;

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
