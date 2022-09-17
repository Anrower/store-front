import { ICurrency } from './../models/ICurrency';
import { IProduct } from './../models/IProduct';
import { useMemo } from 'react';

export const usePrice = (product: IProduct, current: ICurrency | null) => {
  return useMemo(() => {
    return product.prices.find((price) => (price.currency.label === current?.label))
  }, [current, product])
}


