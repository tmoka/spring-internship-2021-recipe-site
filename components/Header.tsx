import Link from "next/link"
import { FC } from "react"

const linkStyle = {
  marginRight: 15,
}

const Header: FC = () => (
  <div>
    <Link href="/">
      <a style={linkStyle}>Home</a>
    </Link>
    <Link href="/about">
      <a style={linkStyle}>About</a>
    </Link>
  </div>
)

export default Header
