import { IAttributeSet } from "./IAttributeSet";
import { IPrice } from "./IPrice";

export interface IProduct {
  id: string
  name: string
  gallery: string[]
  description: string
  category: string
  attributes: IAttributeSet[]
  prices: IPrice[]
  brand: string
}