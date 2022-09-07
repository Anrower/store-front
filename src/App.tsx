import './App.scss';
import CategoryPage from './pages/Category/CategoryPage';
import { Routes, Route } from "react-router-dom";
import Header from './components/header/Header';

function App() {

  return (
    <div className='app'>
      <Header />
      <Routes>
        <Route path="/" element={<CategoryPage />} />
      </Routes>
    </div>

  );
}

export default App;


