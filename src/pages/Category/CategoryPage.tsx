import { useQuery } from '@apollo/client';
import { ICategoryData } from '../../models/ICategoryData';
import './category.scss';
import { GET_CATEGORIES, GET_BY_CATEGORY } from '../../query/query';
import { useEffect } from 'react';
import CategoryCard from './category-card/CategoryCard';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { updateProductsData } from '../../store/reducers/ProductSlice';



const Category = () => {
  // const { loading, error, data } = useQuery<ICategoryData>(GET_CATEGORIES, {
  //   variables: {},
  // });
  const { products } = useAppSelector(store => store.productReducer);
  const dispatch = useAppDispatch();
  const obj = { title: "clothes" }
  const { loading, error, data } = useQuery<ICategoryData>(GET_BY_CATEGORY, {
    variables: { input: obj },
  });

  useEffect(() => {
    if (!loading && data) {
      dispatch(updateProductsData(data.category.products))
    }
  }, [data])

  return (
    <div className='category'>
      <h3 className='category__title'>{`${obj.title}`}</h3>
      <div className='category__content'>
        {products ?
          products.map(i => (<CategoryCard key={i.id} product={i} />
          )) : null
        }
        {products ?
          products.map(i => (<CategoryCard key={i.id} product={i} />
          )) : null
        }
        {products ?
          products.map(i => (<CategoryCard key={i.id} product={i} />
          )) : null
        }
      </div>
    </div>
  );
}

export default Category
