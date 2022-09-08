import Dropdown from '../dropdown/Dropdown';
import { useAppSelector } from '../../hooks/redux';
import { useQuery } from '@apollo/client';
import { ICategoriesData } from '../../models/ICategoriesData';
import './currencyFilter.scss';
import { GET_CURRENCY } from '../../query/query';
import { useEffect, useState } from 'react';
import { ICurrency } from '../../models/ICurrency';
import { useAppDispatch } from '../../hooks/redux';
import { updateCurrencyList } from '../../store/reducers/CurrencySlice';

const CurrencyFilter = () => {

  const dispatch = useAppDispatch()
  const { loading, error, data } = useQuery<ICategoriesData>(GET_CURRENCY);
  const { current, currencyList } = useAppSelector(store => store.currencyReducer)

  useEffect(() => {
    if (!loading && !error && data) {
      const arr = [];
      const temp = data.categories[0].products[0].prices
      for (let i = 0; i < temp.length; i++) {
        arr.push(temp[i].currency)
      }
      dispatch(updateCurrencyList(arr))
    }
  }, [data])


  return (
    <div className='currency-filter'>
      <Dropdown currentCurrency={current} currencyList={currencyList} />
    </div>
  )
}

export default CurrencyFilter