import './cartPage.scss';
import { useAppSelector } from '../../hooks/redux';
import PrimBtn from '../../components/buttons/primary-btn/PrimBtn';
import CartProduct from './CartProduct/CartProduct';

const CartPage = () => {
  const { products, totalAmount, totalPrice } = useAppSelector(state => state.cartReducer)

  return (
    <div className='cart-page'>
      <h3 className='cart-page__title'>cart</h3>
      <div className='cart-page__content'>
        <div className='cart-page__products'>
          {products.map((i, productIndex) => (
            <CartProduct
              key={productIndex}
              product={i}
              productIdx={productIndex}
            />
          ))}
        </div>
        <div className='cart-page__total-box'>
          <p className='discont total-item'>
            <span className='discont--title'>Tax 21%:</span>
            <span className='discont--value'>10</span>
          </p>
          <p className='quantity total-item'>
            <span className='quantity--title'>Qantity:</span>
            <span className='quantity--value'>{totalAmount}</span>
          </p>
          <p className='total-price total-item'>
            <span className='total-price--title'>Total:</span>
            <span className='total-price--value'>{ }{totalPrice}</span>
          </p>
          <div className='order-btn'>
            <PrimBtn title='order' />
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartPage