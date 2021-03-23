import Link from "next/link"
import Header from "../components/Header"
import Search from "../components/Search"
import { APIResponseType, LinksType, RecipesType } from "../constants/types"
import { GetServerSideProps, GetStaticProps, NextPage } from "next"
import { useRouter } from "next/router"

type Props = {
  recipes: RecipesType
  links: LinksType
}

const TopPage: NextPage<Props> = (props: APIResponseType) => {
  const recipes = props.recipes
  console.log(props)
  const router = useRouter()

  const composePageQuery = (pageNumber: number) =>
    pageNumber === 0 ? "" : `?page=${pageNumber}`
  const composeSearchKeywordQuery = (searchKeyword: string) =>
    searchKeyword === "" ? "" : `?keyword=${encodeURI(searchKeyword)}`

  const composeQuery = (pageNumber?: number, searchKeyword?: string) => {}

  const handleSubmit = (searchKeyword: string) => {
    router.push(`/?search=${searchKeyword}`)
  }

  return (
    <div>
      <Header />
      <Search keyword={""} onSubmit={handleSubmit} />
      {recipes ? (
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

export const getServerSideProps: GetServerSideProps = async context => {
  const baseURL = "https://internship-recipe-api.ckpd.co"
  console.log(typeof context.query.page)
  const page = Number(context.query.page)
  const pageNumber = Number.isNaN(page) ? 1 : page
  const searchKeywordOrArray =
    context.query.keyword === undefined ? "" : context.query.keyword
  const encodedKeyword = Array.isArray(searchKeywordOrArray)
    ? searchKeywordOrArray.forEach(searchKeyword => encodeURI(searchKeyword))
    : encodeURI(searchKeywordOrArray)

  //const endpointAndQuery = ``
  const endpointAndQuery =
    encodedKeyword === ""
      ? `/recipes\?page=${pageNumber}`
      : `/search\?keyword=${encodedKeyword}\&page=${pageNumber}`
  console.log(baseURL + endpointAndQuery)
  const res = await fetch(baseURL + endpointAndQuery, {
    headers: {
      "Content-Type": "application/json",
      "X-API-KEY": `${process.env.NEXT_PUBLIC_RECIPES_APIKEY}`,
    },
  })
  const json = await res.json()
  if (json?.recipes === undefined) {
    return {
      props: {},
    }
  }
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
