import React, { FC, Suspense, useEffect, useState } from "react"
import Header from "../../components/Header"
import { RecipesType } from "../../constants/types"
import Indexeddb from "../../db/indexeddb"
import { useRouter } from "next/router"
import Search from "../../components/Search"
import Image from "next/image"
import Link from "next/link"
import { AppContainer, RecipeListContainer, TitleWrapper } from "../index"
import Head from "next/head"
import Footer from "../../components/Footer"

const MyFolder: FC = props => {
  const PAGENATION: number = 10
  const [favoredRecipes, setFavoredRecipes] = useState<RecipesType>()
  const router = useRouter()
  const handleSubmit = (searchKeyword: string) => {
    searchKeyword ? router.push(`/?keyword=${searchKeyword}`) : router.push("/")
  }

  useEffect(() => {
    ;(async () => {
      const database = new Indexeddb("myFolder")
      await database.createObjectStore(["favoredRecipeTable"])
      const values: RecipesType | null = await database.getAllValue(
        "favoredRecipeTable",
      )
      if (!(values === null)) setFavoredRecipes(values)
    })()
  }, [])
  console.log(favoredRecipes)

  return (
    <AppContainer>
      <RecipeListContainer>
        <Head>
          <title>Cooking Site - 新規レシピ投稿</title>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"
          ></meta>
        </Head>
        <Header />
        <Search keyword={""} onSubmit={handleSubmit} />
        <h1>お気に入り一覧</h1>

        {favoredRecipes &&
          favoredRecipes.map(recipe => (
            <Link href="/recipes/[id]" as={`/recipes/${recipe.id}`}>
              <a>
                <div>
                  <TitleWrapper>
                    <h1>{recipe.title}</h1>
                    <p>{recipe.description}</p>
                  </TitleWrapper>
                  {recipe.image_url === null ? (
                    <Image
                      src={"/images/no_image.png"}
                      alt="レシピ画像はありません"
                      height={500}
                      width={500}
                      className="center-image"
                    />
                  ) : (
                    <Image
                      src={recipe.image_url}
                      alt={recipe.description}
                      height={400}
                      width={600}
                    />
                  )}
                  <hr />
                </div>
              </a>
            </Link>
          ))}
        <Footer />
      </RecipeListContainer>
    </AppContainer>
  )
}

export default MyFolder
