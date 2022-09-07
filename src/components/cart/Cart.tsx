import './cart.scss'
import cart_img from '../../images/cart.svg';

const count = '10'

const Cart = () => {
  return (
    <div className='cart'>
      <div className='cart__count'>{count}</div>
      <img src={cart_img} alt="Cart" />
    </div>
  )
}

export default Cart