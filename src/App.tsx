import './App.scss';
import CategoryPage from './pages/Category/CategoryPage';
import { Routes, Route, Navigate } from 'react-router-dom';
import ProductPage from './pages/Product/ProductPage';
import Layout from './components/Layout/Layout';
import CartPage from './pages/Cart/CartPage';
import { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_CURRENCIES } from './query/query';
import { ICurrensiesResponse } from './models/ICurrensiesResponse';
import { useAppDispatch } from './hooks/redux';
import { initCurrencies } from './store/reducers/CurrencySlice';



function App() {
  const dispatch = useAppDispatch();
  const { loading, data, error } = useQuery<ICurrensiesResponse>(GET_CURRENCIES);

  useEffect(() => {
    if (loading || error || !data) {
      return;
    }
    dispatch(initCurrencies(data.currencies));
  }, [data, loading, error])

  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route
            path="/"
            element={<Navigate to="/all" replace />}
          />
          <Route path=":categoryId" element={<CategoryPage />} />
          <Route path=":categoryId/:productId" element={<ProductPage />} />
          <Route path="/cart" element={<CartPage />} />
        </Route>
      </Routes>
    </div >
  );
}

export default App;


