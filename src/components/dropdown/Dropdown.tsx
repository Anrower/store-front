import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { currencyChange } from '../../store/reducers/CurrencySlice';
import { IDropdownItem } from '../../models/IDropdownItem';
import { ICurrency } from '../../models/ICurrency';
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
  const handleClick = (item: ICurrency) => {
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
          <p className='dd-header__title_bold'>{currency}</p>
          <p className='dd-header__title_action'>
            {open ? "\u02C4" : '\u02C5'}</p>
        </div>
      </div>
      {open && (
        <ul className='dd-list'>
          {items.map(item => (
            <li className='dd-list-item' key={item.id}>
              <button onClick={() => handleClick(item.value)}>
                <span>{item.value}</span>
                <span>{item.title}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default Dropdown