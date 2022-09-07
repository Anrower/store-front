import Dropdown from '../dropdown/Dropdown';
import './cashFilter.scss';

const CashFilter = () => {
  const items = [{
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
  }
  ]
  return (
    <div className='cash-filter'>
      <div className='current-currency'>$</div>
      <Dropdown currency='$' items={items} />
    </div>
  )
}

export default CashFilter