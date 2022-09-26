import './cartIcon.scss'
import cart_img from '../../images/cart.svg';
import { useAppSelector } from '../../hooks/redux';
import Popup from '../Popup/Popup';
import CartOverlay from '../CartOverlay/CartOverlay';
import { useDispatch } from 'react-redux';
import { togglePopup } from '../../store/reducers/PopupSlice';

const Cart = () => {
  const dispatch = useDispatch();

  const { totalAmount } = useAppSelector(store => store.cartReducer)
  return (
    <>
      <div
        className="cart"
        onClick={() => dispatch(togglePopup())}
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