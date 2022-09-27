import { ICurrency } from './../models/ICurrency';
import { ISelectProduct } from './../models/ISelectProduct';
import { useMemo } from 'react';

export const useTotalPrice = (
  products: ISelectProduct[],
  currentCurrency: ICurrency | null,
) => {
  return useMemo(() => {
    if (currentCurrency && products.length > 0) {
      const priceLabels = products[0].prices.map((price) => {
        return price.currency.label;
      })
      const findCurrentIndexByLabel = priceLabels.findIndex((label) => label === currentCurrency.label)
      const AllPricesByCurrentCurrency = products.map((product) => {
        if (product.amount > 1) {
          return product.prices[findCurrentIndexByLabel].amount * product.amount;
        } else {
          return product.prices[findCurrentIndexByLabel].amount;
        }
      })
      const result = AllPricesByCurrentCurrency.reduce(
        (previousValue, currentValue) => previousValue + currentValue, 0
      );
      return (Math.round(result * 100) / 100);
    } else {
      return 0;
    }
  }, [currentCurrency, products])
}