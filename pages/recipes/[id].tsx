import { FC } from "react"
import { RecipeType } from "../../constants/types"
import Head from "next/head"
import { GetServerSideProps } from "next"
import styled from "styled-components"
import Header from "../../components/Header"
import Search from "../../components/Search"
import { useRouter } from "next/router"

const RecipePage: FC<RecipeType> = (props: RecipeType) => {
  const recipe: RecipeType = props
  const date = new Date(recipe.published_at)
  const dateString =
    date.getFullYear() +
    "年" +
    (date.getMonth() + 1) +
    "月" +
    date.getDate() +
    "日 " +
    date.getHours() +
    "時" +
    date.getMinutes() +
    "分"

  const router = useRouter()
  const handleSubmit = (searchKeyword: string) => {
    searchKeyword ? router.push(`/?keyword=${searchKeyword}`) : router.push("/")
  }

  return (
    <AppContainer>
      <RecipeContainer>
        <Head>
          <title>{props.title}</title>
          <meta property="og:title" content={props.title} />
          <meta property="og:type" content="article" />
          <meta
            property="og:url"
            content={
              "https://internship-recipe-api.ckpd.co/recipes/" + props.id
            }
          />
          <meta
            property="og:image"
            content={props.image_url === null ? "" : props.image_url}
          />
          <meta property="og:site_name" content="Cooking Site" />
          <meta property="og:country-name" content="Japan" />
          <meta property="og:description" content={props.description} />
          <meta
            property="og:article:published_time"
            content={props.published_at}
          />
          <meta property="og:article:author" content={props.author.user_name} />
          <meta property="og:article:section" content="cooking" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content={props.title} />
          <meta name="twitter:description" content={props.description} />
        </Head>
        <Header />
        <Search keyword={""} onSubmit={handleSubmit} />
        <h1>レシピ詳細</h1>

        {recipe && (
          <main>
            <h2>{recipe.title}</h2>

            {recipe.image_url && (
              <img src={recipe.image_url} alt="レシピ画像" width="300" />
            )}
            <p>作者：{recipe.author.user_name}</p>
            <p>作成日時：{dateString}</p>

            <p>{recipe.description}</p>

            <h3>材料</h3>
            <ol>
              {recipe.ingredients.map((ing, i) => (
                <li key={i}>
                  {ing.name} : {ing.quantity}
                </li>
              ))}
            </ol>

            <h3>手順</h3>
            <ol>
              {recipe.steps.map((step, i) => (
                <li key={i}>{step}</li>
              ))}
            </ol>
          </main>
        )}
      </RecipeContainer>
    </AppContainer>
  )
}

export const getServerSideProps: GetServerSideProps = async context => {
  const id = Number(context.params?.id)
  if (id === 0 || isNaN(id)) {
    return {
      notFound: true,
    }
  } else {
    const res = await fetch(
      `https://internship-recipe-api.ckpd.co/recipes/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "X-API-KEY": `${process.env.NEXT_PUBLIC_RECIPES_APIKEY}`,
        },
      },
    )
    const recipeJson = await res.json()
    return {
      props: {
        id,
        title: recipeJson.title,
        description: recipeJson.description,
        image_url: recipeJson.image_url,
        author: recipeJson.author,
        published_at: recipeJson.published_at,
        steps: recipeJson.steps,
        ingredients: recipeJson.ingredients,
        related_recipes: recipeJson.related_recipes,
      },
    }
  }
}

const AppContainer = styled.div`
  width: 100%;
  background-color: #f0f0f0;
`

const RecipeContainer = styled.div`
  width: 60%;
  @media screen and (max-width: 768px) {
    width: 100%;
  }
  background-color: white;
  margin: 0 auto;
`

export default RecipePage
