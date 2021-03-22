import { FC } from "react"
import Link from "next/link"
import Header from "../components/Header"
import { RecipeType } from "../constants/types"

type RecipeLinkType = {
  id: number
}

const RecipeLink = (props: RecipeLinkType) => (
  <Link href={`/recipe?id=${props.id}`}>
    <p>{props.id}</p>
  </Link>
)

export const getStaticProps = async() => {
  const res = await fetch(`https://internship-recipe-api.ckpd.co/recipes`, {
    headers: {
      'Content-Type': 'application/json',
      'X-API-KEY': `${process.env.COOKPAD_SPRING_INTERN_APIKEY}`
    },
  })
  const recipesObj = await res.json()
  return {
    props: {
      recipesObj
    }
  }
}


const TopPage: FC = (props) => {
  console.log(props)
  return (
    <div>
      <Header />
      <RecipeLink id={2} />
    </div>
  )
}

export default TopPage
