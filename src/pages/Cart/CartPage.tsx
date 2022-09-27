import './cartPage.scss';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import Button from '../../components/Button/Button';
import CartProduct from './CartProduct/CartProduct';
import { updateTotalPrice } from '../../store/reducers/СartSlice';
import { useEffect } from 'react';
import { orderHandler } from '../../helpers/orderHandler';
import { useTotalPrice } from '../../hooks/useTotalPrice';


const CartPage = () => {
  const { products, totalAmount, totalPrice } = useAppSelector(state => state.cartReducer)
  const { currentCurrency } = useAppSelector(store => store.currencyReducer);
  const dispatch = useAppDispatch();
  const calcTotalPrice = useTotalPrice(products, currentCurrency);

  useEffect(() => {
    if (calcTotalPrice === 0) {
      dispatch(updateTotalPrice(calcTotalPrice));
    } else {
      dispatch(updateTotalPrice(calcTotalPrice));
    }
  }, [dispatch, calcTotalPrice])

  const getTax = (percent: number) => {
    const result = (Math.round((totalPrice * (percent / 100)) * 100) / 100);
    return result;
  }

  return (
    <div className="cart-page">
      <h3 className="cart-page__title">cart</h3>

      <div className="cart-page__content">
        <div className="cart-page__products">
          {products.map((product, productIndex) => (
            <CartProduct
              key={productIndex}
              product={product}
              productIdx={productIndex}
            />
          ))}
        </div>
        <div className="cart-page__total-box">
          <p className="discont total-item">
            <span className="discont--title">Tax 21%:</span>

            <span className="discont--value">
              <span>{currentCurrency?.symbol}</span>
              {getTax(21)}
            </span>
          </p>
          <p className="quantity total-item">
            <span className="quantity--title">Qantity:</span>

            <span className="quantity--value">{totalAmount}</span>
          </p>
          <p className="total-price total-item">
            <span className="total-price--title">Total:</span>

            <span className="total-price--value">
              {currentCurrency?.symbol}

              <span>{totalPrice}</span>
            </span>
          </p>

          <div className="order-btn">
            <Button
              title="order"
              important="primary"
              handleClick={orderHandler}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartPage