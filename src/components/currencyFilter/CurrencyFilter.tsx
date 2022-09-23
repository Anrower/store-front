import { useAppSelector } from '../../hooks/redux';
import './currencyFilter.scss';
import { useState } from 'react';
import { ICurrency } from '../../models/ICurrency';
import { useAppDispatch } from '../../hooks/redux';
import { changeCurrentCurrency } from '../../store/reducers/CurrencySlice';

const CurrencyFilter = () => {
  const dispatch = useAppDispatch()
  const { currentCurrency: current, currenciesList } = useAppSelector(store => store.currencyReducer)
  const [open, setOpen] = useState(false);

  const toggle = () => setOpen(!open);
  const handleClick = (item: ICurrency) => {
    dispatch(changeCurrentCurrency(item));
    toggle();
  }

  return (
    <div className="currency-filter">
      <div className="dd-wrapper">
        <div
          className="dd-header"
          onClick={() => toggle()}
        >
          <div className="dd-header__title">
            <p className="dd-header__title_current">
              {current?.symbol}
            </p>
            <p className="dd-header__title_action">
              {open ? '\u02C4' : '\u02C5'}
            </p>
          </div>
        </div>
        {open && (
          <ul className="dd-list">
            {currenciesList?.map(item => (
              <li className="dd-list-item" key={item.label}>
                <button onClick={() => handleClick(item)}>
                  <span>{item.symbol}</span>
                  <span>{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default CurrencyFilter