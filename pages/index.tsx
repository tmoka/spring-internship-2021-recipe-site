import Link from "next/link"
import Image from "next/image"
import Head from "next/head"
import Header from "../components/Header"
import Search from "../components/Search"
import { APIResponseType, LinksType, RecipesType } from "../constants/types"
import { GetServerSideProps, GetStaticProps, NextPage } from "next"
import { useRouter } from "next/router"
import styled from "styled-components"

type Props = {
  recipes: RecipesType
  links: LinksType
}

const TopPage: NextPage<Props> = (props: APIResponseType) => {
  const recipes = props.recipes
  console.log(props)
  const router = useRouter()

  //const composePageQuery = (pageNumber: number) =>
  //   pageNumber === 0 ? "" : `?page=${pageNumber}`
  // const composeSearchKeywordQuery = (searchKeyword: string) =>
  //  searchKeyword === "" ? "" : `?keyword=${encodeURI(searchKeyword)}`

  // const composeQuery = (pageNumber?: number, searchKeyword?: string) => {}

  const handleSubmit = (searchKeyword: string) => {
    router.push(`/?keyword=${searchKeyword}`)
  }

  return (
    <>
      <Head>
        <title>Cooking Site</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"
        ></meta>
      </Head>
      <AppContainer>
        <RecipeListContainer>
          <Header />
          <Search keyword={""} onSubmit={handleSubmit} />
          {recipes ? (
            recipes.map(recipe => (
              <div>
                <Link href="/recipes/[id]" as={`/recipes/${recipe.id}`}>
                  <a>
                    {recipe.image_url === null ? (
                      <></>
                    ) : (
                      <ImageWrapper>
                        <Image
                          src={recipe.image_url}
                          alt={recipe.description}
                          height={400}
                          width={600}
                        />
                      </ImageWrapper>
                    )}
                    <TitleWrapper>
                      <h1>{recipe.title}</h1>
                      <p>{recipe.description}</p>
                    </TitleWrapper>
                  </a>
                </Link>
              </div>
            ))
          ) : (
            <p>レシピが見つかりませんでした。</p>
          )}
          {!props.links?.prev ? (
            <></>
          ) : (
            <Link href={"/?" + props.links.prev.split("?")[1]}>前のページ</Link>
          )}
          {!props.links?.next ? (
            <></>
          ) : (
            <Link href={"/?" + props.links.next.split("?")[1]}>次のページ</Link>
          )}
        </RecipeListContainer>
      </AppContainer>
    </>
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
const AppContainer = styled.div`
  width: 100%;
  background-color: green;
`

const RecipeListContainer = styled.div`
  width: 60%;
  @media screen and (max-width: 500px) {
    width: 100%;
  }
  background-color: yellow;
  margin: 0 auto;
`

const ImageWrapper = styled.div`
  width: 80%;
  height: 80%;
  display: inline-block;
`

const TitleWrapper = styled.div`
  width: 80%;
  height: 80%;
  display: inline-block;
`

export default TopPage
