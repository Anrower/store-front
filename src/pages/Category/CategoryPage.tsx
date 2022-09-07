import { useQuery } from '@apollo/client';
import { ICategoryData } from '../../models/ICategoryData';
import { IProduct } from '../../models/IProduct';
import './category.scss';
import { GET_CATEGORIES, GET_BY_CATEGORY } from '../../query/query';
import { useEffect, useState } from 'react';



const Category = () => {
  // const { loading, error, data } = useQuery<ICategoryData>(GET_CATEGORIES, {
  //   variables: {},
  // });
  const obj = { title: "tech" }
  const { loading, error, data } = useQuery<ICategoryData>(GET_BY_CATEGORY, {
    variables: { input: obj },
  });
  const [products, setProducts] = useState<IProduct[]>();




  useEffect(() => {
    console.log(data);
    if (!loading) {
      setProducts(data?.category.products)
    }
  }, [data])


  return (
    <h1>hello World!</h1>
    // <div >
    //   <h3 className='category__title'>{`${category}`}</h3>
    //   {products ?
    //     products.map(i => (
    //       <div key={i.id}>
    //         <p>{i.id}</p>
    //         <p>{i.brand}</p>
    //         <p>{i.category}</p>
    //       </div>
    //     )) : <h1>Spinner...</h1>
    //   }
    // </div>
  );
}

export default Category