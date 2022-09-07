import { ICurrency } from "./ICurrency"
// export interface IPrice {
//   currency: Currency!
//   amount: Float!
// }

export interface IPrice {
  currency: ICurrency
  amount: number
}