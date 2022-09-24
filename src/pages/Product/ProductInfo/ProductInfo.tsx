import './productInfo.scss';
import { IProduct } from '../../../models/IProduct';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { useState } from 'react';
import Btn from '../../../components/Button/Button';
import AttributeType from './AttributeType/AttributeType';
import { additionTotalPrice, addToCart } from '../../../store/reducers/СartSlice';
import ProductTitle from './ProductTitle/ProductTitle';
import { usePrice } from '../../../hooks/usePrice';
import { ISelectProduct } from '../../../models/ISelectProduct';
import { getClassName } from '../../../helpers/getClassName';
interface IProps {
  product: IProduct
  asidePicture: number
}

const ProductInfo = (props: IProps) => {

  const dispatch = useAppDispatch();
  const { currentCurrency } = useAppSelector(store => store.currencyReducer)
  const { product, asidePicture } = props
  const wideDescription = 370;
  const currentPrice = usePrice(product, currentCurrency);

  const [warning, setWarning] = useState<boolean>(false);
  const [selectProduct, setSelectProduct] = useState<ISelectProduct>({
    ...product,
    selectAtt: {},
    amount: 1,
  })
  console.log(warning);

  function createMarkup() {
    return { __html: product.description };
  }

  const isAllAttributesSelect = () => {
    return Object.keys(selectProduct.selectAtt).length === selectProduct.attributes.length;
  }

  const addToCartHandler = () => {
    const check = isAllAttributesSelect();
    if (check && currentPrice && product.inStock) {
      dispatch(addToCart(selectProduct));
      dispatch(additionTotalPrice(currentPrice.amount));
    } else {
      setWarning(true);
    }
  }

  const selectType = (
    atributeName: string,
    atributeValue?: string,
  ): void => {
    setSelectProduct({
      ...selectProduct,
      selectAtt: {
        ...selectProduct.selectAtt,
        [atributeName]: atributeValue,
      }
    })
  }

  return (
    <div className="product__info">
      <div className='product__info__image-outer'>
        {!product.inStock && (
          <span className="_sold-out-title_big">
            OUT OF STOCK
          </span>
        )}

        <div
          className={getClassName({
            'product__info__image-wrapper': true,
            '_sold-out-image-filter': !product.inStock,
          })}
        >

          <img
            src={product.gallery[asidePicture]}
            alt={product.name}>
          </img>
        </div>
      </div>

      <div className="product__info__about">
        <ProductTitle
          title={product.brand}
          subtitle={product.name}
        />

        <div className='product__info__about-attributes'>
          {product.attributes.map((atrribute) => (
            <div key={atrribute.id}>
              <AttributeType
                attributeName={atrribute.id}
                attributesOptions={atrribute.items}
                selectType={selectType}
                warning={warning}
                setWarning={setWarning}
              />
            </div>
          ))}
        </div>

        <div className="attributes-type-name">
          <span>price:</span>

          <p className="product__price">
            <span>{currentPrice?.currency.symbol}</span>

            {currentPrice?.amount}
          </p>
        </div>

        <div className="product__info__about-button">
          <Btn
            title="add to cart"
            size="tall"
            important='primary'
            handleClick={addToCartHandler}
            disabled={warning || !product.inStock}
          />
        </div>

        <div
          className="product__info__about-description"
          dangerouslySetInnerHTML={
            product.description.length > wideDescription ? undefined : createMarkup()
          }
        >
        </div>

      </div>

      {product.description.length > wideDescription ?
        <div
          className="product__info__about-description"
          dangerouslySetInnerHTML={createMarkup()}
        >
        </div> :
        null
      }
    </div>
  )
}

export default ProductInfo;