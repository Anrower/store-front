import { useQuery, gql } from '@apollo/client';
import { ICategoryData } from '../../models/ICategoryData';
// import './category.scss'

const GET_CATEGORIES = gql`
   query categories { 
	  category {
		  products {
			  id
			  brand
			  category
		  }
	  }
  }
`;

const Category = () => {
  const { loading, error, data } = useQuery<ICategoryData>(GET_CATEGORIES);

  return (
    <div>
      <h3>Available Category</h3>
      {loading ? (<p>Loading ...</p>)
        : error ? (<p>Error: something goes wrong</p>)
          :
          (<div>{data && data.category.products.map(inventory => (
            <div key={inventory.id} style={{ background: 'yellow', margin: '20px' }}>
              <p>{inventory.id}</p>
              <p>{inventory.brand}</p>
              <p>{inventory.category}</p>
            </div>
          ))}
          </div>
          )}
    </div>
  );
}

export default Category