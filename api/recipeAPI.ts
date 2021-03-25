import { RESTDataSource, RequestOptions } from "apollo-datasource-rest"
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
}

export default RecipeAPI
