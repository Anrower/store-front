import './cart.scss'
import cart_img from '../../images/cart.svg';
import { useAppSelector } from '../../hooks/redux';

const Cart = () => {
  const { totalAmount } = useAppSelector(store => store.cartReducer)
  return (
    <div className='cart'>
      {totalAmount <= 0 ? null :
        <div className='cart__count'>{totalAmount}</div>
      }
      <img src={cart_img} alt="Cart" />
    </div>
  )
}

export default Cart