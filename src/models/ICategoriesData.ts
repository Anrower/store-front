import { IProduct } from "./IProduct"

export interface ICategoriesData {
  categories: category[];
}

interface category {
  products: IProduct[];
}