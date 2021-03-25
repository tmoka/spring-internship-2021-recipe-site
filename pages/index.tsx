import Link from "next/link"
import Image from "next/image"
import Head from "next/head"
import Header from "../components/Header"
import Search from "../components/Search"
import { APIResponseType, LinksType, RecipesType } from "../constants/types"
import { GetServerSideProps, NextPage } from "next"
import { useRouter } from "next/router"
import styled from "styled-components"
import { Button } from "../components/Button"
import { gql } from "apollo-server-micro"
import client from "../api/apollo-client"

type Props = {
  recipes: RecipesType
  links: LinksType
}

const TopPage: NextPage<Props> = (props: APIResponseType) => {
  const recipes = props.recipes
  //console.log(props)
  const router = useRouter()

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
          <Link href="/myfolder">
            <a>
              <Button>マイフォルダ</Button>
            </a>
          </Link>
          <Link href="/create">
            <a>
              <Button>新規レシピ</Button>
            </a>
          </Link>
          {recipes ? (
            recipes.map(recipe => (
              <div>
                <Link href="/recipes/[id]" as={`/recipes/${recipe.id}`}>
                  <a>
                    <TitleWrapper>
                      <h1>{recipe.title}</h1>
                      <p>{recipe.description}</p>
                    </TitleWrapper>
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
                  </a>
                </Link>
                <hr />
              </div>
            ))
          ) : (
            <p>お探しのレシピは見つかりませんでした。</p>
          )}
          {!props.links?.prev ? (
            <></>
          ) : (
            <Link href={"/?" + props.links.prev.split("?")[1]}>
              <Button>前のページに戻る</Button>
            </Link>
          )}
          {!props.links?.next ? (
            <></>
          ) : (
            <Link href={"/?" + props.links.next.split("?")[1]}>
              <Button>次のページに進む</Button>
            </Link>
          )}
        </RecipeListContainer>
      </AppContainer>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async context => {
  const query = gql`
    query RecipesPage($page: Int, $keyword: String) {
      recipes(page: $page, keyword: $keyword) {
        recipes {
          id
          title
          description
          image_url
        }
        links {
          prev
          next
        }
      }
    }
  `
  const page = Number(context.query.page)
  const pageNumber = Number.isNaN(page) ? 1 : page
  const res = await client.query<any>({
    query,
    variables: { page: pageNumber, keyword: context.query.keyword },
  })

  const recipes: RecipesType = res.data.recipes.recipes
  const links: LinksType = res.data.recipes.links
  return {
    props: {
      recipes,
      links,
    },
  }

  /*const baseURL = "https://internship-recipe-api.ckpd.co"
  console.log(typeof context.query.page)
  const page = Number(context.query.page)
  const pageNumber = Number.isNaN(page) ? 1 : page
  const searchKeywordOrArray =
    typeof context.query.keyword === "undefined" ? "" : context.query.keyword
  const encodedKeyword = Array.isArray(searchKeywordOrArray)
    ? searchKeywordOrArray.forEach(searchKeyword => encodeURI(searchKeyword))
    : encodeURI(searchKeywordOrArray)

  const endpointAndQuery =
    encodedKeyword === ""
      ? `/recipes\?page=${pageNumber}`
      : `/search\?keyword=${encodedKeyword}\&page=${pageNumber}`
  console.log(baseURL + endpointAndQuery)
  const res = await fetch("baseURL + endpointAndQuery", {
    headers: {
      "Content-Type": "application/json",
      "X-API-KEY": `${process.env.NEXT_PUBLIC_RECIPES_APIKEY}`,
    },
  })
  const json = await res.json()
  if (typeof json?.recipes === "undefined") {
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
  */
}
const AppContainer = styled.div`
  width: 100%;
  background-color: #f0f0f0;
`

const RecipeListContainer = styled.div`
  width: 60%;
  @media screen and (max-width: 768px) {
    width: 100%;
  }
  background-color: white;
  margin: 0 auto;
`

const ImageWrapper = styled.div`
  //width: 80%;
  //height: 80%;
  //margin: 0 auto;
  //display: inline-block;
`

const TitleWrapper = styled.div`
  width: 100%;
  height: 80%;
  margin: 0 auto;
  text-align: center;
  display: inline-block;
`

export default TopPage
