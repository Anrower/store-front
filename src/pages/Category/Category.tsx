import { useQuery, gql } from '@apollo/client';
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

interface IProducts {
  id: string;
  name: string;
  inStock: boolean;
  gallery: [string];
  description: string;
  category: string;
  // attributes: [AttributeSet]
  // prices: [Price!]!
  brand: string;
}

interface ICategoryData {
  category: {
    name: string;
    products: IProducts[];
  }
}


const Category = () => {
  const { loading, error, data } = useQuery<ICategoryData>(GET_CATEGORIES);

  return (
    <div>
      <h3>Available Inventory</h3>
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