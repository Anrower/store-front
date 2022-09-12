import './productPage.scss';
import { useParams } from 'react-router-dom';
import { useLazyQuery } from '@apollo/client';
import { GET_PRODUCT_BY_ID } from '../../query/query';
import { useEffect } from 'react';
import { IProductData } from '../../models/IProductData';
import ProductInfo from './product-info/ProductInfo';

const ProductPage = () => {
  const { productId } = useParams();
  console.log(productId);

  const [getId, { loading, data, called, error }] = useLazyQuery<IProductData>(GET_PRODUCT_BY_ID);

  useEffect(() => {
    if (productId) {
      getId({
        variables: {
          id: productId
        }
      })
    }
  }, [productId])

  return (
    loading && called ? <p>loading...</p> :
      data ?
        <div className='product'>
          <div className='product__content'>
            <aside className='product__aside'>
              <div className='product__aside__image-wrapper'>
                {data.product?.gallery.map(i => (
                  <img key={i} src={i} alt='product image' />
                ))}
              </div>
            </aside>
            <ProductInfo product={data.product} />
          </div>
        </div> :
        <p>{error?.message}</p>

  )
}

export default ProductPage