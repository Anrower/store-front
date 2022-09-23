import './productPage.scss';
import { useParams } from 'react-router-dom';
import { useLazyQuery } from '@apollo/client';
import { GET_PRODUCT_BY_ID } from '../../query/query';
import { useEffect } from 'react';
import { IProductData } from '../../models/IProductData';
import ProductInfo from './ProductInfo/ProductInfo';
import { useState } from 'react';

const ProductPage = () => {
  const { productId } = useParams();
  const [getId, { loading, data, called, error }] = useLazyQuery<IProductData>(GET_PRODUCT_BY_ID);

  const [asidePicture, setAsidePicture] = useState(0);

  useEffect(() => {
    if (productId) {
      getId({
        variables: {
          id: productId
        }
      })
    }
  }, [productId, getId])

  return (
    (loading && called) ?
      <p>loading...</p> :
      (data) ?
        <div className="product">
          <div className="product__content">
            <aside className="product__aside">
              <div className="product__aside__image-wrapper">
                {data.product.gallery.map((value, idx) => (
                  <img key={value}
                    className={idx === asidePicture ? 'active' : undefined}
                    src={value}
                    alt="product"
                    onClick={() => { setAsidePicture(idx) }} />
                ))}
              </div>
            </aside>
            <ProductInfo product={data.product} asidePicture={asidePicture} />
          </div>
        </div> :
        <p>{error?.message}</p>
  )
}

export default ProductPage