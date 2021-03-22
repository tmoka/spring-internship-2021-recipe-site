import { FC } from "react"
import Link from "next/link"
import Header from "../components/Header"
import { APIResponseType, RecipeType } from "../constants/types"

type RecipeLinkType = {
  id: number
}

const RecipeLink = (props: RecipeLinkType) => (
  <Link href={`/recipe?id=${props.id}`}>
    <p>{props.id}</p>
  </Link>
)

export const getStaticProps = async () => {
  const res = await fetch(`https://internship-recipe-api.ckpd.co/recipes`, {
    headers: {
      "Content-Type": "application/json",
      "X-API-KEY": `${process.env.NEXT_PUBLIC_RECIPES_APIKEY}`,
    },
  })
  const json = await res.json()
  const links = json?.links
  const recipes = json?.recipes
  return {
    props: {
      links,
      recipes,
    },
  }
}

const TopPage = (props: APIResponseType) => {
  const recipes = props.recipes
  console.log(props.recipes)
  return (
    <div>
      <Header />
      {recipes.map(recipe => (
        <div>
          <h1>{recipe.title}</h1>
          <p>{recipe.description}</p>
          <img src={recipe.image_url} />
        </div>
      ))}
      <RecipeLink id={2} />
    </div>
  )
}

export default TopPage
