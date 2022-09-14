import { ICurrencySymbol } from "./ICurrencySymbol";

export interface ISelectProduct {
  Id: string;
  Name: string;
  PriceValue: number;
  PriceCurrency: ICurrencySymbol;
  [index: number]: string;
}
