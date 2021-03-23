// 個々のレシピを表す型
export interface RecipeType {
  id: number
  title: string
  description: string
  image_url: string | null
  author: authorType
  published_at: string
  steps: string[]
  ingredients: ingredientType[]
  related_recipes: number[]
}

export interface RecipesType {
  length: number
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
  recipes: RecipeType[]
}

export type LinksType = {
  prev: string | null
  next: string | null
}

export interface APIResponseType {
  links: LinksType
  recipes: RecipesType
}

export type authorType = {
  user_name: string
}

export type ingredientType = {
  name: string
  quantity: string
}
