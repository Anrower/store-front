import { IPrice } from './IPrice';
import { ICurrencySymbol } from "./ICurrencySymbol";
import { IAttributeSet } from "./IAttributeSet";
import { ISelectAtt } from "./ISelectAtt";
import { IProduct } from './IProduct';

export interface ISelectProduct extends IProduct {
  selectAtt: ISelectAtt
  amount: number
}
