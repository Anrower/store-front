import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { changeCurrentCurrency, updateCurrencyIndex } from '../../store/reducers/CurrencySlice';
import { ICurrencySymbol } from '../../models/ICurrencySymbol';
import { ICurrency } from '../../models/ICurrency';
import './dropdown.scss';

interface IDdProps {
  currentCurrency: ICurrencySymbol;
  currencyList: ICurrency[];
}

const Dropdown = (props: IDdProps) => {

  const { currentCurrency, currencyList } = props;
  const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch()

  const toggle = () => setOpen(!open);
  const handleClick = (item: ICurrencySymbol) => {
    const CurrencyIndex = currencyList.findIndex(value => value.symbol === item);
    dispatch(changeCurrentCurrency(item));
    dispatch(updateCurrencyIndex(CurrencyIndex));
    toggle();
  }
  return (
    <div className='dd-wrapper'>
      <div tabIndex={0}
        className='dd-header'
        role='button'
        onKeyPress={() => toggle()}
        onClick={() => toggle()}
      >
        <div className='dd-header__title'>
          <p className='dd-header__title_current'>{currentCurrency}</p>
          <p className='dd-header__title_action'>
            {open ? "\u02C4" : '\u02C5'}</p>
        </div>
      </div>
      {open && (
        <ul className='dd-list'>
          {currencyList?.map(item => (
            <li className='dd-list-item' key={item.label}>
              <button onClick={() => handleClick(item.symbol)}>
                <span>{item.symbol}</span>
                <span>{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default Dropdown