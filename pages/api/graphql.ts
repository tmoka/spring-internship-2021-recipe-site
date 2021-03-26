import { ApolloServer } from "apollo-server-micro"
import typeDefs from "../../api/schema"
import RecipeAPI from "../../api/recipeAPI"
import { resolvers } from "../../api/resolver"
import { GraphQLRequestContext } from "apollo-server-types"
import { LoggerExtension } from "apollo-server-logger"

const loggingPlugin = {
  // Fires whenever a GraphQL request is received from a client.
  requestDidStart(requestContext: GraphQLRequestContext) {
    console.log("Request started! Query:\n" + requestContext.request.query)

    return {
      // Fires whenever Apollo Server will parse a GraphQL
      // request to create its associated document AST.
      parsingDidStart(requestContext: GraphQLRequestContext) {
        console.log("Parsing started!")
      },

      // Fires whenever Apollo Server will validate a
      // request's document AST against your GraphQL schema.
      validationDidStart(requestContext: GraphQLRequestContext) {
        console.log("Validation started!")
      },
    }
  },
}

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    api: new RecipeAPI(),
  }),
  plugins: [loggingPlugin],
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
