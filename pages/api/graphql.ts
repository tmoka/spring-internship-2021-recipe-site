import { RESTDataSource, RequestOptions } from "apollo-datasource-rest"
import { ApolloServer } from "apollo-server-micro"
import typeDefs from "../../api/schema"

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

const Query = {
  recipes: async (
    _: any,
    query: any,
    { dataSources }: { dataSources: { api: RecipeAPI } },
  ): Promise<any> => {
    return dataSources.api.getRecipesByPageAndKeyword(
      query.page ? query.page : 1,
      query.keyword ? query.keyword : null,
    )
  },
  recipe: async (
    _: any,
    query: any,
    { dataSources }: { dataSources: { api: RecipeAPI } },
  ): Promise<any> => {
    return dataSources.api.getRecipeById(query.id)
  },
}

export const resolvers = {
  Query,
}

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    api: new RecipeAPI(),
  }),
})

export const config = {
  api: {
    bodyParser: false,
  },
}

export default apolloServer.createHandler({ path: "/api/graphql" })
/*
  async willSendRequest(req: RequestOptions) {
    req.headers.set("X-Api-Key", process.env.COOKPAD_API_KEY as string)
  }

  async getLaunchById(id: number) {
    const response = await this.get("recipes/${id}")
    return this.recipeReducer(response[0])
  }

  recipeReducer(recipe: RecipeType) {
    return {
      id: recipe.id,
      title: recipe.title,
      description: recipe.description,
      author: {
        user_name: recipe.author.user_name,
      },
      image_url: recipe.image_url,
      published_at: recipe.published_at,
      steps: recipe.steps,
      ingredients: recipe.ingredients,
      related_recipes: recipe.related_recipes,
    }
  }*/
