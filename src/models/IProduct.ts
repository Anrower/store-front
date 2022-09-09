import { IAttributeSet } from "./IAttributeSet";
import { IPrice } from "./IPrice";

export interface IProduct {
  id: string
  name: string
  gallery: string[]
  description: string
  category: string
  inStock: boolean
  attributes: IAttributeSet[]
  prices: IPrice[]
  brand: string
}