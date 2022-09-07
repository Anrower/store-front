import { useState } from 'react';
import { IDropdownItem } from '../../models/IDropDownItem';

interface IDdProps {
  currency: string
  items: IDropdownItem[]
}

const Dropdown = (props: IDdProps) => {
  const { currency = '$', items } = props;
  const [open, setOpen] = useState(false);
  const [selection, setSelection] = useState('$');

  const toggle = () => setOpen(!open);

  // function handleClick(item) {}

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
        </div>
      </div>
      <div className='dd-header__action'>
        <p>{open ? 'Close' : 'Open'}</p>
      </div>
      {open && (
        <ul className='dd-list'>
          {items.map(item => (
            <li className='dd-list-item' key={item.id}>
              <button > {/* {onClick={() => handleOnClick(item)}} */}
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