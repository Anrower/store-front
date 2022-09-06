import { IProduct } from "./IProduct";

export interface ICategoryData {
  category: {
    name: string;
    products: IProduct[];
  }
}