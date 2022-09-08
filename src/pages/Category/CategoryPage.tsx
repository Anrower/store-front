import { useQuery } from '@apollo/client';
import { ICategoryData } from '../../models/ICategoryData';
import { IProduct } from '../../models/IProduct';
import './category.scss';
import { GET_CATEGORIES, GET_BY_CATEGORY } from '../../query/query';
import { useEffect, useState } from 'react';
import CategoryCard from './category-card/CategoryCard';



const Category = () => {
  // const { loading, error, data } = useQuery<ICategoryData>(GET_CATEGORIES, {
  //   variables: {},
  // });
  const obj = { title: "clothes" }
  const { loading, error, data } = useQuery<ICategoryData>(GET_BY_CATEGORY, {
    variables: { input: obj },
  });
  const [products, setProducts] = useState<IProduct[]>();

  useEffect(() => {
    if (!loading) {
      setProducts(data?.category.products)
    }
  }, [data])

  return (
    <div className='category'>
      <h3 className='category__title'>{`${obj.title}`}</h3>
      <div className='category__content'>
        {products ?
          products.map(i => (<CategoryCard key={i.id} product={i} />
            // <p>{i.id}</p>
            // <p>{i.brand}</p>
            // <p>{i.category}</p>
          )) : <h1>Spinner...</h1>
        }
      </div>
    </div>
  );
}

export default Category
