import { IAttribute } from "./IAttribute"

export interface IAttributeSet {
  id: string
  name?: string
  type?: string
  items: IAttribute[]
}