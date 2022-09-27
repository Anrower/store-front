import { useQuery } from '@apollo/client';
import { ICategoryData } from '../../models/ICategoryData';
import './categoryPage.scss';
import { GET_BY_CATEGORY } from '../../query/query';
import CategoryCard from './CategoryCard/CategoryCard';
import { useParams } from 'react-router-dom';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import Loader from '../../components/Loader/Loader';
import Page404 from '../Page404/Page404';


const Category = () => {
  const { categoryId } = useParams();
  const categoryTitle = categoryId;
  const { loading, error, data } = useQuery<ICategoryData>(GET_BY_CATEGORY, {
    variables: {
      input: {
        title: categoryTitle,
      }
    },
  });

  return (
    (loading) ?
      <Loader /> :
      (error || !data) ?
        <ErrorMessage message={error?.message} /> :
        ((categoryTitle !== 'all') &&
          (categoryTitle !== 'tech') &&
          (categoryTitle !== 'clothes')) ?
          <Page404 /> :
          <div className='category'>
            <h3 className="category__title">{categoryTitle}</h3>

            <div className="category__content">
              {data?.category?.products.map(product => (
                <CategoryCard
                  key={product.id}
                  product={product}
                />
              ))}
            </div>
          </div>
  )
}


export default Category
