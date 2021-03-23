import Link from "next/link"
import { FC } from "react"

const linkStyle = {
  marginRight: 15,
}

const Header: FC = () => (
  <div>
    <Link href="/">
      <a>
        <h1>COOKING SITE</h1>
      </a>
    </Link>
  </div>
)

export default Header
