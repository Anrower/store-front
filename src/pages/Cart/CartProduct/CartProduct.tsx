import { useState } from 'react';
import { getClassName } from '../../../helpers/getClassName';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { usePrice } from '../../../hooks/usePrice';
import { ISelectProduct } from '../../../models/ISelectProduct';
import {
  decreaseTotalAmount,
  decrementProductAmount,
  increaseTotalAmount,
  incrementProductAmount,
  updateProductParam,
  updateProducts
} from '../../../store/reducers/СartSlice';
import AttributeType from '../../Product/ProductInfo/AttributeType/AttributeType';
import ProductTitle from '../../Product/ProductInfo/ProductTitle/ProductTitle';
import styles from './cartProduct.module.scss';

interface IProps {
  product: ISelectProduct,
  productIdx: number,
  overlay?: boolean,
}

const CartProduct = (props: IProps) => {
  const { product, productIdx, overlay } = props;
  const dispatch = useAppDispatch();
  const { currentCurrency } = useAppSelector(store => store.currencyReducer);
  const currentPrice = usePrice(product, currentCurrency);
  const { products } = useAppSelector(state => state.cartReducer);
  const [imgIdx, setImgIdx] = useState<number>(0);

  const updateCartProductOptions = (
    attributeName: string,
    atributeValue?: string,
    productIndex?: number,
  ): void => {

    if (atributeValue !== undefined && productIndex !== undefined) {
      const temp = [...products];
      const result = (temp[productIndex] = {
        ...temp[productIdx],
        selectAtt: {
          ...products[productIdx].selectAtt,
          [attributeName]: atributeValue
        },
      });

      temp[productIdx] = result;
      dispatch(updateProductParam(temp));
    }
  }

  const swipe = (direction: string, gallery: string[]): void => {
    let currentIndex = imgIdx;

    if (gallery.length !== 1) {
      if (direction === 'right' && currentIndex + 1 === gallery.length) {
        currentIndex = 0;
      }

      if ((direction === 'left') && currentIndex === 0) {
        currentIndex = gallery.length - 1;
      }

      if (direction === 'right') {
        currentIndex += 1;

      }
      if (direction === 'left') {
        currentIndex -= 1;
      }

      setImgIdx(currentIndex);
    }
  }

  const removeProductAmount = (productIdx: number) => {
    if (currentPrice) {
      if (product.amount === 1) {
        const result = products.filter((product, index) => index !== productIdx);
        dispatch(updateProducts(result));
      } else {
        dispatch(decrementProductAmount(productIdx));
      }

      dispatch(decreaseTotalAmount());
    }
  }
  const addProductAmount = (productIdx: number) => {
    if (currentPrice) {
      dispatch(increaseTotalAmount());
      dispatch(incrementProductAmount(productIdx));
    }
  }

  return (
    <div
      className={getClassName({
        [styles.product_overlay]: overlay,
        [styles.product]: !overlay
      })}
    >
      <div className={overlay ? `${styles.product_inner_overlay}` : undefined}>
        <ProductTitle
          title={product.brand}
          subtitle={product.name}
          overlay={overlay}
        />
        <p
          className={getClassName({
            [styles.price_overlay]: overlay,
            [styles.price]: !overlay
          })}
        >
          {currentPrice?.currency.symbol}
          <span>{currentPrice?.amount}</span>
        </p>

        {product.attributes.map((product) => (
          <div key={product.id}>
            <AttributeType
              attributeName={product.id}
              attributesOptions={product.items}
              selectType={updateCartProductOptions}
              productIdx={productIdx}
              overlay={overlay}
            />
          </div>
        ))}
      </div>

      <div
        className={getClassName({
          [styles.amount_overlay]: overlay,
          [styles.amount]: !overlay
        })}
      >
        <div
          className={getClassName({
            [styles.amount__btns_overlay]: overlay,
            [styles.amount__btns]: !overlay
          })}
        >
          <button
            onClick={() => removeProductAmount(productIdx)}>
            -
          </button>

          <span>{product.amount}</span>

          <button
            onClick={() => addProductAmount(productIdx)}>
            +
          </button>
        </div>

        <div
          className={getClassName({
            [styles.swiper_overlay]: overlay,
            [styles.swiper]: !overlay
          })}
        >
          <div
            className={getClassName({
              [styles.swiper_overlay__image__wrapper]: overlay,
              [styles.swiper__image__wrapper]: !overlay
            })}
          >
            <img src={product.gallery[imgIdx]} alt={product.name}></img>
          </div>
          {!overlay ?
            <div className={styles.swiper__btn__wrapper}>
              <button
                className={styles.swiper__btn}
                onClick={() => swipe('left', product.gallery)}>
                <i className={`${styles.arrow} ${styles.arrow_left}`}></i>
              </button>

              <button
                className={styles.swiper__btn}
                onClick={() => swipe('right', product.gallery)}>
                <i className={`${styles.arrow} ${styles.arrow_right}`}></i>
              </button>
            </div> : null
          }
        </div>
      </div>
    </div >
  )
}

export default CartProduct