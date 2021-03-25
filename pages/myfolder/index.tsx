import React, { FC, Suspense, useEffect, useState } from "react"
import Header from "../../components/Header"
import { RecipesType } from "../../constants/types"
import Indexeddb from "../../db/indexeddb"
import { useRouter } from "next/router"
import Search from "../../components/Search"

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
    <div>
      <Header></Header>
      <Search keyword={""} onSubmit={handleSubmit} />
      <h1>MyFolder</h1>

      {favoredRecipes && favoredRecipes.map(recipe => <h1>{recipe.title}</h1>)}
    </div>
  )
}

export default MyFolder
