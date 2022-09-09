import './App.scss';
import CategoryPage from './pages/Category/CategoryPage';
import { Routes, Route } from "react-router-dom";
import Header from './components/header/Header';
import ProductPage from './pages/Product/ProductPage';

function App() {

  return (
    <div className='app'>
      <Header />
      <Routes>
        <Route path="/" element={<CategoryPage />} />
        <Route path="/:id" element={<ProductPage />} />
      </Routes>
    </div>

  );
}

export default App;


