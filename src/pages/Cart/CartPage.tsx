import './cartPage.scss';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import PrimBtn from '../../components/buttons/primary-btn/PrimBtn';
import AttributeType from '../Product/product-info/attribute-type/AttributeType';
import ProductTitle from '../Product/product-info/product-title/ProductTitle';
import ProductPrice from '../Product/product-info/product-price/ProductPrice';
import { updateProductParam } from '../../store/reducers/СartSlice';
import { ICartProductAttUpd } from '../../store/reducers/СartSlice';

const CartPage = () => {

  const [img, setImage] = useState(['']);
  const [imgIndex, setImgImdex] = useState(0);
  const dispatch = useAppDispatch();
  const { products, totalAmount, totalPrice } = useAppSelector(state => state.cartReducer)

  const selectType = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    name: string,
    idx: number,
    productIdx?: number,
  ) => {
    const attValue = event.currentTarget.getAttribute('data-value');
    console.log(idx);

    if (attValue !== null && productIdx !== undefined) {
      const indexName = `${name}idx`
      const obj: ICartProductAttUpd = {
        productIndex: productIdx,
        selectAtt: {
          [name]: attValue,
          [indexName]: idx,
        }
      }
      dispatch(updateProductParam(obj))
    }
  }

  const swipe = (dir: string, gallery: string[]) => {
    let currentIndex = imgIndex;
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
      setImgImdex(currentIndex);

    }
    return
  }

  // const []
  return (
    <div className='cart-page'>
      <h3 className='cart-page__title'>cart</h3>
      <div className='cart-page__content'>
        <div className='cart-page__product'>
          {products.map((i, productIndex) => (
            <div key={productIndex}
              className='cart-page__product-item'>
              <div>
                <ProductTitle title={i.brand} subtitle={i.name} />
                <ProductPrice price={i.priceValue} symbol={i.priceCurrency} />

                {i.attributes.map((i, idx) => (
                  <div key={i.id}>
                    <p className='attributes-type-name'>{i.id}:</p>
                    <AttributeType
                      attName={i.id}
                      items={i.items}
                      selectType={selectType}
                      productAttIdx={idx}
                      productIdx={productIndex}
                    />
                  </div>
                ))}
              </div>

              <div className='item--amount__wrapper'>
                <div className='item--amount__btns'>
                  <button>-</button>
                  <span>{5}</span>
                  <button>+</button>
                </div>
                <div className='item--image'>
                  <img src={i.gallery[imgIndex]} alt={i.name}></img>
                  <button onClick={() => swipe('left', i.gallery)}>-</button>
                  <button onClick={() => swipe('right', i.gallery)}>+</button>
                </div>
              </div>

            </div>
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