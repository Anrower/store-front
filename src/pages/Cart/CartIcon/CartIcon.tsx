import './cartIcon.scss'
import cart_img from '../../../images/cart.svg';
import { useAppSelector } from '../../../hooks/redux';
import Popup from '../CartPopup/Popup';
import CartOverlay from '../CartOverlay/CartOverlay';
import { useDispatch } from 'react-redux';
import { toggleOverlay } from '../../../store/reducers/СartSlice';

const Cart = () => {
  const dispatch = useDispatch();

  const { totalAmount } = useAppSelector(store => store.cartReducer)
  return (
    <>
      <div
        className="cart"
        onClick={() => dispatch(toggleOverlay())}
      >
        {totalAmount <= 0 ? null :
          <div className="cart__count">{totalAmount}</div>
        }
        <img src={cart_img} alt="Cart" />
      </div>
      <div>
        <Popup>
          <CartOverlay />
        </Popup>
      </div>
    </>

  )
}

export default Cart