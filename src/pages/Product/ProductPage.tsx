import './productPage.scss';
import { useParams } from 'react-router-dom';
import { useLazyQuery } from '@apollo/client';
import { GET_PRODUCT_BY_ID } from '../../query/query';
import { useEffect } from 'react';
import { IProductData } from '../../models/IProductData';
import ProductInfo from './ProductInfo/ProductInfo';
import { useState } from 'react';
import Loader from '../../components/Loader/Loader';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';

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
      <Loader /> :
      (error || !data) ?
        <ErrorMessage message={error?.message} /> :
        <div className="product">
          <div className="product__content">
            <aside className="product__aside">
              <div className="product__aside__image-wrapper">
                {data.product.gallery.map((image, index) => (
                  <div
                    key={index}
                    className={index === asidePicture ? 'active' : undefined}>
                    <img
                      src={image}
                      alt="product"
                      onClick={() => { setAsidePicture(index) }}
                    />
                  </div>
                ))}
              </div>
            </aside>
            <ProductInfo product={data.product} asidePicture={asidePicture} />
          </div>
        </div>
  )
}

export default ProductPage