import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { usePrice } from '../../../hooks/usePrice';
import { ISelectProduct } from '../../../models/ISelectProduct';
import {
  additionTotalPrice,
  decreaseTotalAmount,
  decrementProductAmount,
  ICartProductAttUpd, ICartProductPriceUpd,
  increaseTotalAmount,
  incrementProductAmount,
  subtractionTotalPrice,
  updateProductParam,
  // updateProductPrice,
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

  const [img, setImage] = useState(['']);
  const [imgIdx, setImgIdx] = useState(0);

  const { product, productIdx, overlay } = props;
  const dispatch = useAppDispatch();
  const { currentCurrency } = useAppSelector(store => store.currencyReducer)
  const currentPrice = usePrice(product, currentCurrency);
  const { products } = useAppSelector(state => state.cartReducer);

  const updateCartProductType = (
    attributeName: string,
    atributeValue?: string,
    productIndex?: number | null,
  ) => {
    // const attValue = event.currentTarget.getAttribute('data-value');

    // if (attValue !== null && productIdx !== undefined) {
    //   const indexName = `${name}idx`
    //   const obj: ICartProductAttUpd = {
    //     productIndex: productIdx,
    //     selectAtt: {
    //       [name]: attValue,
    //       [indexName]: idx,
    //     }
    //   }
    //   dispatch(updateProductParam(obj));
    // }
  }

  const swipe = (dir: string, gallery: string[], productIdx: number) => {
    let currentIndex = imgIdx;
    if (gallery.length !== 1) {
      setImage(gallery);

      if (dir === 'right' && currentIndex + 1 === gallery.length) {
        currentIndex = 0;
      }

      if ((dir === 'left') && currentIndex === 0) {
        currentIndex = gallery.length - 1;
      }

      if (dir === 'right') {
        currentIndex += 1;

      }
      if (dir === 'left') {
        currentIndex -= 1;
      }
      setImgIdx(currentIndex);

    }
    return
  }

  useEffect(() => {
    if (currentCurrency && currentPrice) {
      const obj: ICartProductPriceUpd = {
        productIndex: productIdx,
        value: currentPrice.amount,
        symbol: currentCurrency.symbol,

      }
      // dispatch(updateProductPrice(obj))
    }
  }, [currentPrice, currentCurrency, dispatch, productIdx])

  const removeProductAmount = (productIdx: number) => {
    // const productPrice = product.priceValue;
    if (product.amount === 1) {
      const result = products.filter((item, index) => {
        if (index !== productIdx) {
          return true;
        }
      });
      dispatch(updateProducts(result));
    } else {
      dispatch(decrementProductAmount(productIdx));
    }
    // dispatch(subtractionTotalPrice(productPrice));
    dispatch(decreaseTotalAmount());
  }
  const addProductAmount = (productIdx: number) => {
    // const productPrice = product.priceValue;
    dispatch(increaseTotalAmount());
    // dispatch(additionTotalPrice(productPrice))
    dispatch(incrementProductAmount(productIdx));
  }

  return (
    <div
      className={overlay
        ? `${styles.product_overlay}`
        : `${styles.product}`
      }
    >
      <div className={overlay ? `${styles.product_inner_overlay}` : undefined}>
        <ProductTitle
          title={product.brand}
          subtitle={product.name}
          overlay={overlay}
        />
        <p
          className={overlay
            ? `${styles.price_overlay}`
            : `${styles.price}`
          }
        >
          {currentPrice?.currency.symbol}
          <span>{currentPrice?.amount}</span>
        </p>

        {product.attributes.map((product) => (
          <div key={product.id}>
            <AttributeType
              attributeName={product.id}
              attributeOptions={product.items}
              selectType={updateCartProductType}
              productIdx={productIdx}
              overlay={overlay}
            />
          </div>
        ))}
      </div>

      <div
        className={overlay
          ? `${styles.amount_overlay}`
          : `${styles.amount}`
        }
      >
        <div
          className={overlay
            ? `${styles.amount__btns_overlay}`
            : `${styles.amount__btns}`
          }
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
          className={overlay ?
            `${styles.swiper_overlay}` :
            `${styles.swiper}`
          }
        >
          <div
            className={overlay ?
              `${styles.swiper_overlay__image__wrapper}` :
              `${styles.swiper__image__wrapper}`
            }
          >
            <img src={product.gallery[imgIdx]} alt={product.name}></img>
          </div>
          {!overlay ?
            <div className={styles.swiper__btn__wrapper}>
              <button
                className={styles.swiper__btn}
                onClick={() => swipe('left', product.gallery, productIdx)}>
                <i className={`${styles.arrow} ${styles.arrow_left}`}></i>
              </button>
              <button
                className={styles.swiper__btn}
                onClick={() => swipe('right', product.gallery, productIdx)}>
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