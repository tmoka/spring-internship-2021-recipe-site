import React, { FC, useState } from "react"
import Input from "../../components/Input"
import Header from "../../components/Header"
import { gql } from "@apollo/client"
import { useMutation } from "@apollo/client"
import { ConfirmButton } from "../../components/Button"
import { RecipeInputType } from "../../constants/types"
import Head from "next/head"

const PostRecipe: FC = props => {
  const [formState, setFormState] = useState({
    title: "",
    description: "",
  })
  console.log(formState)

  // TODO: GraphQLに対応
  /*const POST_RECIPE = gql`
    mutation PostRecipe(
      $title: String
      $description: String
      $author: AuthorInput
      $image_url: String
      $ingredients: [IngredientInput]
      $steps: [String]
    ) {
      post(
        title: $title
        description: $description
        author: $author
        image_url: $image_url
        ingredients: $ingredients
        steps: $steps
      ) {
        title
        description
        author {
          user_name
        }
        image_url
        ingredients {
          name
          quantity
        }
        steps
      }
    }
  `
  */
  //const [postRecipe, { data }] = useMutation(POST_RECIPE)
  /*const [createRecipe] = useMutation(mutation, {
    variables: {
      description: formState.description,
      title: formState.title,
    },
  })*/
  //console.log(data)

  const postRecipeToAPI = (data: RecipeInputType) => {
    const res = fetch("https://internship-recipe-api.ckpd.co/recipes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-API-KEY": `${process.env.NEXT_PUBLIC_RECIPES_APIKEY}`,
      },
      body: JSON.stringify(data),
    })
  }

  const data: RecipeInputType = {
    title: formState.title,
    description: formState.description,
    image_url: null,
    ingredients: [
      { name: "人参", quantity: "1本" },
      { name: "じゃがいも", quantity: "3個" },
      { name: "カレールー", quantity: "一箱" },
    ],
    steps: [
      "野菜を切る",
      "じっくりに煮込む",
      "カレールーを入れてさらに煮込んだらできあがり",
    ],
  }

  return (
    <div>
      <Head>
        <title>Cooking Site - お気に入り一覧</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"
        ></meta>
      </Head>
      <Header />
      <h1>レシピを投稿する（未完成）</h1>
      <form
        method="POST"
        onSubmit={e => {
          e.preventDefault()
          /*postRecipe({
            variables: {
              title: formState.title,
              description: formState.description,
              author: { user_name: "西田幾多郎" },
              Image_url: null,
              ingredients: [
                { name: "人参", quantity: "1本" },
                { name: "じゃがいも", quantity: "3個" },
                { name: "カレールー", quantity: "一箱" },
              ],
              steps: [
                "野菜を切る",
                "じっくりに煮込む",
                "カレールーを入れてさらに煮込んだらできあがり",
              ],
            },
          })
          console.log(data)*/
        }}
      >
        <Input
          value={formState.title}
          onChange={e =>
            setFormState({
              ...formState,
              title: e.target.value,
            })
          }
          type="text"
          placeholder="レシピタイトル"
        />

        <Input
          value={formState.description}
          onChange={e =>
            setFormState({
              ...formState,
              description: e.target.value,
            })
          }
          type="text"
          placeholder="レシピの説明"
        />
        <ConfirmButton
          //type="submit"
          onClick={() => {
            postRecipeToAPI(data)
            console.log(JSON.stringify(data))
          }}
        >
          投稿する
        </ConfirmButton>
      </form>
    </div>
  )
}

export default PostRecipe
