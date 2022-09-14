import './App.scss';
import CategoryPage from './pages/Category/CategoryPage';
import { Routes, Route, Navigate } from "react-router-dom";
import ProductPage from './pages/Product/ProductPage';
import Layout from './components/layout/Layout';
import CartPage from './pages/Cart/CartPage';

function App() {

  return (
    <div className='app'>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route
            path="/"
            element={<Navigate to="/all" replace />}
          />
          <Route path=':categoryId' element={<CategoryPage />} />
          <Route path=":categoryId/:productId" element={<ProductPage />} />
          <Route path="/cart" element={<CartPage />} />
        </Route>
      </Routes>
    </div >

  );
}

export default App;


