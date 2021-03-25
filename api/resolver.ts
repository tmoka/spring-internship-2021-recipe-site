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

export const resolvers = {
  Query,
}
