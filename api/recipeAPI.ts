import { RESTDataSource, RequestOptions } from "apollo-datasource-rest"
import { authorType, ingredientType, RecipeType } from "../constants/types"
class RecipeAPI extends RESTDataSource {
  constructor() {
    super()
    this.baseURL = "https://internship-recipe-api.ckpd.co/"
  }

  willSendRequest(request: RequestOptions) {
    request.headers.set(
      "X-Api-Key",
      process.env.NEXT_PUBLIC_RECIPES_APIKEY as string,
    )
  }

  async getRecipeById(id: number) {
    return this.get(`recipes/${id}`)
  }

  async getRecipesByPageAndKeyword(page?: number, keyword?: string) {
    const response =
      keyword === null
        ? this.get(`recipes?page=${page}&keyword=${keyword}`)
        : this.get(`search?page=${page}&keyword=${keyword}`)
    return response
  }

  async postRecipe(
    title: string,
    description: string,
    author: authorType,
    image_url: string,
    steps: string[],
    ingredients: ingredientType[],
  ) {
    return this.post("recipes", {
      title,
      description,
      author,
      image_url,
      steps,
      ingredients,
    })
  }
}

export default RecipeAPI
