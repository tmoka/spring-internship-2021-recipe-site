import { gql, Config } from "apollo-server-micro"

const typeDefs: Config["typeDefs"] = gql`
  type Query {
    recipes(page: Int, keyword: String): APIResponse
    recipe(id: ID!): Recipe
  }

  type Mutation {
    post(
      title: String
      description: String
      author: AuthorInput
      image_url: String
      steps: [String]
      ingredients: [IngredientInput]
    ): Recipe
  }

  type Recipe {
    id: ID
    title: String
    description: String
    author: Author
    image_url: String
    published_at: String
    steps: [String]
    ingredients: [Ingredient]
    related_recipes: [Int]
  }

  type Ingredient {
    name: String!
    quantity: String!
  }

  type Author {
    user_name: String!
  }

  type Links {
    prev: String
    next: String
  }

  type APIResponse {
    recipes: [Recipe]
    links: Links
  }

  input AuthorInput {
    user_name: String
  }

  input IngredientInput {
    name: String
    quantity: String
  }
`

export default typeDefs
