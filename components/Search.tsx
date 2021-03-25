import { FC, useState } from "react"
import styled from "styled-components"
import * as color from "../constants/colors"
import { useRouter } from "next/router"

export type SearchProps = {
  keyword: string
  onSubmit: (keyword: string) => void
}

const Search: FC<SearchProps> = (props: SearchProps) => {
  const router = useRouter()
  const [searchKeyword, setSearchKeyword] = useState("")

  const clickButton = () => {
    router.push({
      pathname: "/", //URL
      query: { keyword: searchKeyword }, //検索クエリ
    })
  }

  return (
    <SearchContainer>
      <form
        onSubmit={e => {
          e.preventDefault()
          props.onSubmit(searchKeyword)
        }}
      >
        <Input
          type="text"
          placeholder="検索したいワードを入力してください"
          value={searchKeyword}
          onChange={e => setSearchKeyword(e.target.value)}
        />

        <ConfirmButton onClick={clickButton}>検索</ConfirmButton>
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

export const Button = styled.button.attrs({ type: "button" })`
  width: 16%;
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
