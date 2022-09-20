import { IPrice } from './IPrice';
import { ICurrencySymbol } from "./ICurrencySymbol";
import { IAttributeSet } from "./IAttributeSet";
import { ISelectAtt } from "./ISelectAtt";

export interface ISelectProduct {
  id: string;
  name: string;
  gallery: string[];
  instock: boolean;
  prices: IPrice[]
  priceCurrency: ICurrencySymbol;
  attributes: IAttributeSet[];
  selectAtt: ISelectAtt;
  amount: number;
  brand: string;
  priceValue: number;
}
