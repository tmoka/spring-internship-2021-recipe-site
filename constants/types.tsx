// 個々のレシピを表す型
export interface RecipeType {
  id: number
  title: string
  description: string
  image_url: string | null
  author: authorType
  published_at: string
  ingredients: ingredientsType
  related_recipes: number[]
}

export interface RecipesType {
  map(
    arg0: (recipe: any) => any,
  ):
    | string
    | number
    | boolean
    | {}
    | import("react").ReactElement<
        any,
        string | import("react").JSXElementConstructor<any>
      >
    | import("react").ReactNodeArray
    | import("react").ReactPortal
    | null
    | undefined
  Recipes: RecipeType[]
}

export type LinksType = {
  name: string
}

export interface APIResponseType {
  links: LinksType
  recipes: RecipesType
}

export type authorType = {
  user_name: string
}

export type stepsType = {
  steps: string[]
}

export type ingredientType = {
  name: string
  quantity: string
}

export type ingredientsType = {
  ingredients: ingredientType[]
}
