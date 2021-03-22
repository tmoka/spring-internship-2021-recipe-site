import { useRouter } from "next/router"

const RecipePage = () => {
  const router = useRouter()
  return <h1>Recipe ID: {router.query.id}</h1>
}

export default RecipePage
