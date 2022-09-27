import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { orderHandler } from '../../../helpers/orderHandler';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import CartProduct from '../CartProduct/CartProduct';
import { updateTotalPrice, toggleOverlay } from '../../../store/reducers/СartSlice';
import Button from '../../../components/Button/Button';
import styles from './cartOverlay.module.scss';
import { useTotalPrice } from '../../../hooks/useTotalPrice';

const CartOverlay = () => {
  const navigate = useNavigate()
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

  const viewBagHandler = () => {
    dispatch(toggleOverlay());
    navigate('/cart');
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
        }
      >
        {products.map((product, productIndex) => (
          <CartProduct
            key={productIndex}
            product={product}
            productIdx={productIndex}
            overlay={true}
          />
        ))}
      </div>

      <div className={styles.cart__overlay_total}>
        <span className={styles.cart__overlay_total_title}>Total</span>

        <span className={styles.cart__overlay_total_price}>
          {currentCurrency?.symbol}

          <span>{totalPrice}</span>
        </span>
      </div>

      <div className={styles.cart__overlay_btns}>
        <Button
          title="view bag"
          size="overlay"
          important="secondary"
          handleClick={viewBagHandler}
        />

        <Button
          title="check out"
          size="overlay"
          important="primary"
          handleClick={orderHandler}
        />
      </div>
    </div>
  )
}

export default CartOverlay