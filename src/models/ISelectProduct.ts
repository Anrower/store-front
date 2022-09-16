import { ICurrencySymbol } from "./ICurrencySymbol";
import { IAttributeSet } from "./IAttributeSet";
import { ISelectAtt } from "./ISelectAtt";

export interface ISelectProduct {
  id: string;
  name: string;
  instock: boolean;
  brand: string;
  priceValue: number;
  priceCurrency: ICurrencySymbol;
  attributes: IAttributeSet[];
  gallery: string[];
  selectAtt: ISelectAtt;
}
