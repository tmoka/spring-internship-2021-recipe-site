import { FC } from "react"
import { useRouter } from "next/router"
import { RecipeType } from "../../constants/types"
import Head from "next/head"

const RecipePage: FC<RecipeType> = (props: RecipeType) => {
  const router = useRouter()
  return (
    <div>
      <Head>
        <title>{props.title}</title>
      </Head>
      <h1>Recipe ID: {router.query.id}</h1>
    </div>
  )
}

export default RecipePage
