import './productInfo.scss';
import { IProduct } from '../../../models/IProduct';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { useEffect } from 'react';
import parse from 'html-react-parser';
import Btn from '../../../components/Button/Btn';
import AttributeType from './attribute-type/AttributeType';
import { updateSelectProduct, resetState, updateSelectAtt } from '../../../store/reducers/SelectProductSlice';
import { addToCart, updateTotalPrice } from '../../../store/reducers/СartSlice';
import { IAttributeSet } from '../../../models/IAttributeSet';
import ProductTitle from './product-title/ProductTitle';
import { usePrice } from '../../../hooks/usePrice';

interface IProps {
  product: IProduct
  asidePicture: number
}

const ProductInfo = (props: IProps) => {
  const dispatch = useAppDispatch();
  const { selectProudct } = useAppSelector(store => store.SelectProductReducer)
  const { current } = useAppSelector(store => store.currencyReducer)
  const { product, asidePicture } = props
  const wideDescription = 370;
  const description = parse(product.description);

  const getAllAttribute = (atr: IAttributeSet[]) => {
    const result = [];
    for (let i = 0; i < atr.length; i++) {
      result.push(atr[i].id);
    }
    return result;
  }

  const currentPrice = usePrice(product, current);

  useEffect(() => {
    if (currentPrice && current) {
      dispatch(updateSelectProduct(
        {
          ...selectProudct,
          priceValue: currentPrice?.amount,
          priceCurrency: current?.symbol,
        }
      ));
    }
  }, [current, currentPrice])

  useEffect(() => {
    const attributes = getAllAttribute(product.attributes);
    let obj: any = {};

    function Att(key: string, value: string | undefined): any {
      let name = `${[key]}idx`;
      return {
        [key]: value,
        [name]: 0,
      }
    }

    for (let i = 0; i < attributes.length; i++) {
      const tempKey = attributes[i];
      const tempValue = product.attributes[i].items[0].value;
      const att = Att(tempKey, tempValue)
      obj = { ...obj, ...att };
    }
    dispatch(updateSelectProduct(
      {
        ...selectProudct,
        ...product,
        amount: 1,
      }
    ));
    dispatch(updateSelectAtt(obj))
    return function cleanup() {
      dispatch(resetState());
    };
  }, []);

  const selectType = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    name: string,
    idx: number,
  ) => {
    const attValue = event.currentTarget.getAttribute('data-value');

    if (attValue !== null) {
      const indexName = `${name}idx`
      const obj = {
        [name]: attValue,
        [indexName]: idx,
      }
      dispatch(updateSelectAtt(obj))
    }
  }

  const addToCartHandler = () => {
    dispatch(addToCart({ ...selectProudct }));
    dispatch(updateTotalPrice(selectProudct.priceValue));
  }

  return (
    <div className="product__info">
      <div className="product__info__image-wrapper">
        <img src={product.gallery[asidePicture]} alt={product.name}></img>
      </div>
      <div className="product__info__about">
        <ProductTitle title={product.brand} subtitle={product.name} />

        <div className="product__info__about-attributes">
          {product.attributes.map((i) => (
            <div key={i.id}>
              <AttributeType
                attName={i.id}
                items={i.items}
                selectType={selectType}
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
            customClick={addToCartHandler} />
        </div>

        <div className="product__info__about-description">
          {product.description.length > wideDescription ? null : description}
        </div>

      </div>
      {product.description.length > wideDescription ?
        <div className="product__info__about-description">
          {description}
        </div> :
        null
      }
    </div>
  )
}

export default ProductInfo