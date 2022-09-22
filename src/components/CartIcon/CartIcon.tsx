import './cartIcon.scss'
import cart_img from '../../images/cart.svg';
import { useAppSelector } from '../../hooks/redux';
import Popup from '../Popup/Popup';
import { useState } from 'react';
import CartOverlay from '../CartOverlay/CartOverlay';

const Cart = () => {
  const { totalAmount } = useAppSelector(store => store.cartReducer)
  const [buttonPopup, setButtonPopup] = useState<boolean>(false)
  return (
    <>
      <div
        className="cart"
        onClick={() => setButtonPopup(!buttonPopup)}
      >
        {totalAmount <= 0 ? null :
          <div className="cart__count">{totalAmount}</div>
        }
        <img src={cart_img} alt="Cart" />
      </div>
      <div>
        <Popup trigger={buttonPopup}>
          <CartOverlay />
        </Popup>
      </div>
    </>

  )
}

export default Cart