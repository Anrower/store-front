import Dropdown from '../dropdown/Dropdown';
import { useAppSelector } from '../../hooks/redux';
import { IDropdownItem } from '../../models/IDropdownItem';
import './currencyFilter.scss';

const CurrencyFilter = () => {

  const items: IDropdownItem[] = [{
    label: "USD",
    symbol: "$"
  },
  {
    label: "GBP",
    symbol: "£"
  },
  {
    label: "AUD",
    symbol: "A$"
  },
  {
    label: "JPY",
    symbol: "¥"
  },
  {
    label: "RUB",
    symbol: "₽"
  }]

  const currency = useAppSelector(state => state.currencyReducer.current)

  return (
    <div className='currency-filter'>
      <Dropdown currency={currency} items={items} />
    </div>
  )
}

export default CurrencyFilter