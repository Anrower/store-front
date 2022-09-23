import { useQuery } from '@apollo/client';
import { ICategoryData } from '../../models/ICategoryData';
import './categoryPage.scss';
import { GET_BY_CATEGORY } from '../../query/query';
import CategoryCard from './CategoryCard/CategoryCard';
import { useParams } from 'react-router-dom';

const Category = () => {
  const { categoryId } = useParams();
  const categoryTitle = categoryId || 'all';
  const { loading, error, data } = useQuery<ICategoryData>(GET_BY_CATEGORY, {
    variables: {
      input: {
        title: categoryTitle,
      }
    },
  });

  if (loading) {
    return (
      <p>...Loading</p>
    );
  }

  if (error || !data) {
    return (
      <p>Something was wrong!</p>
    );
  }

  return (
    <div className="category">
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
  );
}

export default Category
