import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import CartProduct from '../../pages/Cart/CartProduct/CartProduct';
import { updateTotalPrice } from '../../store/reducers/СartSlice';
import Btn from '../Button/Btn';
import styles from './cartOverlay.module.scss';

const CartOverlay = () => {
  const navigate = useNavigate()
  const { products, totalAmount, totalPrice } = useAppSelector(state => state.cartReducer)
  const { current } = useAppSelector(store => store.currencyReducer);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const prices = products.map((product) => (
      product.amount === 1
        ? product.priceValue
        : product.amount * product.priceValue
    ));
    const newTotalPrice = prices.reduce(
      (previousValue, currentValue) => previousValue + currentValue,
      0
    );
    dispatch(updateTotalPrice(Math.round(newTotalPrice * 100) / 100))
  }, [current, totalAmount])

  const viewBagHandler = () => {
    navigate('/cart')
  }

  return (
    <div className={styles.cart__overlay}>
      <p className={styles.cart__overlay_title}>
        My Bag,
        <span >{` ${totalAmount}`}</span>
        <span >{totalAmount > 1 ? ' items' : ' item'}</span>
      </p>
      <div
        className={products.length > 2 ?
          `${styles.cart__overlay_products}
           ${styles.cart__overlay_products_scroll}` :
          `${styles.cart__overlay_products}`
        }>
        {products.map((i, productIndex) => (
          <CartProduct
            key={productIndex}
            product={i}
            productIdx={productIndex}
            overlay={true}
          />
        ))}
      </div>
      <div className={styles.cart__overlay_total}>
        <span className={styles.cart__overlay_total_title}>Total</span>
        <span className={styles.cart__overlay_total_price}>
          {current?.symbol}
          <span>{totalPrice}</span>
        </span>
      </div>
      <div className={styles.cart__overlay_btns}>
        <Btn
          title="view bag"
          size="overlay"
          important="secondary"
          customClick={viewBagHandler}
        />
        <Btn
          title="check out"
          size="overlay"
          important="primary"
        />
      </div>

    </div>
  )
}

export default CartOverlay