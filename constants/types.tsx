// 個々のレシピを表す型
export interface RecipeType {
  id: number
  title: string
  description: string
  image_url?: string
  author: authorType
  published_at: string
  ingredients: ingredientsType
  related_recipes: number[]
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
