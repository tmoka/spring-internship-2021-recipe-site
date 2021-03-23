import Link from "next/link"
import Header from "../components/Header"
import Search from "../components/Search"
import { APIResponseType, LinksType, RecipesType } from "../constants/types"
import { GetStaticProps, NextPage } from "next"
import { useRouter } from "next/dist/client/router"

type Props = {
  recipes: RecipesType
  links: LinksType
}

const TopPage: NextPage<Props> = (props: APIResponseType) => {
  const recipes = props.recipes
  console.log(props)

  return (
    <div>
      <Header />
      <Search />
      {recipes.length > 0 ? (
        recipes.map(recipe => (
          <div>
            <Link href="/recipes/[id]" as={`/recipes/${recipe.id}`}>
              <a>
                <h1>{recipe.title}</h1>
                <p>{recipe.description}</p>
                <img src={recipe.image_url} />
              </a>
            </Link>
          </div>
        ))
      ) : (
        <p>レシピが見つかりませんでした。</p>
      )}
    </div>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const url = "https://internship-recipe-api.ckpd.co/recipes"
  const encodeUrl = encodeURI(url)
  console.log(encodeUrl)
  const res = await fetch(encodeUrl, {
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

export default TopPage
