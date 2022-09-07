import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { currencyChange } from '../../store/reducers/CurrencySlice';
import { IDropdownItem } from '../../models/IDropdownItem';
import { ICurrencySymbol } from '../../models/ICurrencySymbol';
import './dropdown.scss';

interface IDdProps {
  currency: string
  items: IDropdownItem[]
}

const Dropdown = (props: IDdProps) => {
  const { currency, items } = props;
  const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch()

  const toggle = () => setOpen(!open);
  const handleClick = (item: ICurrencySymbol) => {
    dispatch(currencyChange(item))
    console.log(item);
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
          <p className='dd-header__title_current'>{currency}</p>
          <p className='dd-header__title_action'>
            {open ? "\u02C4" : '\u02C5'}</p>
        </div>
      </div>
      {open && (
        <ul className='dd-list'>
          {items.map(item => (
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