import React, { FC, useState } from "react"
import Input from "../../components/Input"
import Header from "../../components/Header"
import { gql } from "@apollo/client"
import { useMutation } from "@apollo/client"
import { ConfirmButton } from "../../components/Button"

const PostRecipe: FC = props => {
  const [formState, setFormState] = useState({
    title: "",
    description: "",
  })
  console.log(formState)

  const POST_RECIPE = gql`
    mutation PostRecipe($title: String, $description: String, $author:AuthorInput,$image_url:String, $ingredients:[IngredientInput], $steps:[String]) {
      post(title: $title, description: $description, author:$author,image_url:$image_url, ingredients:$ingredients,steps:$steps) {

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
  const [postRecipe, { data }] = useMutation(POST_RECIPE)
  /*const [createRecipe] = useMutation(mutation, {
    variables: {
      description: formState.description,
      title: formState.title,
    },
  })*/
  console.log(data)

  return (
    <div>
      <Header />
      <h1>レシピを投稿する（未完成）</h1>
      <form
        method="POST"
        onSubmit={e => {
          e.preventDefault()
          postRecipe({
            variables: {
              title: formState.title,
              description: formState.description,
              author: {user_name:"www"},
              image_url: "",
              ingredients: [{name:"じゃがいも",quantity:"いっぱい"}],
              steps: ["皮を剥きます","食べます"]
            },
          })
          console.log(data)
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
        <button type="submit">追加</button>
      </form>
    </div>
  )
}

export default PostRecipe
