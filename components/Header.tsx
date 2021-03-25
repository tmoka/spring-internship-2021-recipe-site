import Link from "next/link"
import { FC } from "react"
import styled from "styled-components"
import * as color from "../constants/colors"

const Header: FC = () => (
  <HeaderContainer>
    <Link href="/">
      <a>
        <h1>COOKING SITE</h1>
      </a>
    </Link>
  </HeaderContainer>
)

export default Header

const HeaderContainer = styled.div`
  background-color: ${color.Gray};
`
