import './cartPage.scss';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import PrimBtn from '../../components/buttons/primary-btn/PrimBtn';
import ProductInfo from '../Product/product-info/ProductInfo';

const CartPage = () => {
  const { products, totalAmount, totalPrice } = useAppSelector(state => state.cartReducer)
  console.log(products);
  // const []
  return (
    <div className='cart-page'>
      <h3 className='cart-page__title'>cart</h3>
      <div className='cart-page__content'>
        <div className='cart-page__product'>
          {/* {products.map(i => (
            <div key={i.Id}>
              <ProductInfo
                product={i}
                attributes={Object.keys(i)}
              />
            </div>
          ))} */}
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
            <span className='total-price--value'>{totalPrice}</span>
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