import { RecipeType } from "../constants/types"
import RecipeAPI from "./recipeAPI"

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

const Mutation = {
  post: async (
    _: any,
    { title, description, author, image_url, steps, ingredients }: RecipeType,
  ): Promise<any> => {
    const recipe = { title, description, author, image_url, steps, ingredients }
    return recipe
  },
}

export const resolvers = {
  Query,
  Mutation,
}
