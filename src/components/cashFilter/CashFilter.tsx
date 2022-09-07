import Dropdown from '../dropdown/Dropdown';
import { useAppSelector } from '../../hooks/redux';
import { IDropdownItem } from '../../models/IDropdownItem';
import './cashFilter.scss';

const CashFilter = () => {
  const items: IDropdownItem[] = [{
    id: 1,
    title: 'USD',
    value: '$'
  },
  {
    id: 2,
    title: 'EUR',
    value: '€'
  },
  {
    id: 3,
    title: 'JPY',
    value: '¥'
  }]

  const currency = useAppSelector(state => state.currencyReducer.current)

  return (
    <div className='cash-filter'>
      <Dropdown currency={currency} items={items} />
    </div>
  )
}

export default CashFilter