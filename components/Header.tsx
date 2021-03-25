import Link from "next/link"
import { FC } from "react"
import styled from "styled-components"
import * as color from "../constants/colors"

const Header: FC = () => (
  <HeaderContainer>
    <Link href="/">
      <a>
        <HeaderLogo>🍙COOKING SITE</HeaderLogo>
      </a>
    </Link>
  </HeaderContainer>
)

export default Header

const HeaderContainer = styled.div`
  background-color: ${color.CookpadOrange};
`

const HeaderLogo = styled.h1`
  margin-left: 10px;
  font-weight: bold;
`
