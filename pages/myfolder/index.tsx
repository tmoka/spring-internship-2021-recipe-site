import React, { FC, Suspense, useEffect, useState } from "react"
import Header from "../../components/Header"
import { RecipesType } from "../../constants/types"
import Indexeddb from "../../db/indexeddb"

const MyFolder: FC = props => {
  const PAGENATION: number = 10
  const [favoredRecipes, setFavoredRecipes] = useState<RecipesType>()

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
      <h1>MyFolder</h1>

      {favoredRecipes && favoredRecipes.map(recipe => <h1>{recipe.title}</h1>)}
    </div>
  )
}

export default MyFolder
