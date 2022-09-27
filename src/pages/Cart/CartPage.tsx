import './cartPage.scss';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import Button from '../../components/Button/Button';
import CartProduct from './CartProduct/CartProduct';
import { updateTotalPrice } from '../../store/reducers/СartSlice';
import { useEffect } from 'react';
import { orderHandler } from '../../helpers/orderHandler';


const CartPage = () => {
  const { products, totalAmount, totalPrice } = useAppSelector(state => state.cartReducer)
  const { currentCurrency } = useAppSelector(store => store.currencyReducer);
  const dispatch = useAppDispatch();


  useEffect(() => {
    if (currentCurrency && products.length > 0) {
      const priceLabels = products[0].prices.map((price) => {
        return price.currency.label;
      })
      const findCurrentIndexByLabel = priceLabels.findIndex((label) => label === currentCurrency.label)
      const AllPricesByCurrentCurrency = products.map((product) => {
        if (product.amount > 1) {
          return product.prices[findCurrentIndexByLabel].amount * product.amount;
        } else {
          return product.prices[findCurrentIndexByLabel].amount;
        }
      })
      const result = AllPricesByCurrentCurrency.reduce(
        (previousValue, currentValue) => previousValue + currentValue, 0
      );
      dispatch(updateTotalPrice(Math.round(result * 100) / 100))
    } else {
      dispatch(updateTotalPrice(0))
    }
  }, [currentCurrency, totalAmount, dispatch, products])

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
            <span className="total-price--title">
              Total:
            </span>
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