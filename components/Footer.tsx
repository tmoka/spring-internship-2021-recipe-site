import Link from "next/link"
import { FC } from "react"
import styled from "styled-components"
import * as color from "../constants/colors"

const Footer: FC = () => (
    <FooterContainer>
      <p>created by Tomoichiro Watari</p>
    </FooterContainer>
  )
  
  export default Footer

  const FooterContainer = styled.div`
  background-color:${color.CookpadOrange};
  text-align:center;
  font-size: 12px;
  height: 2rem;
  line-height: 2rem;
  `