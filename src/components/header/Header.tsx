import './header.scss';
import logo from '../../images/logo.svg'
import Cart from '../cart/Cart';
import CurrencyFilter from '../currencyFilter/CurrencyFilter';

const Header = () => {
  return (
    <header className='header'>
      <div className='header__wrapper'>
        <nav className='header__navigation'>
          <ul className='header__navigation-list'>
            <li className='header__navigation-list-item active'><a href="/">MEN</a></li>
            <li className='header__navigation-list-item'><a href="/">WOMEN</a></li>
            <li className='header__navigation-list-item'><a href="/">KIDS</a></li>
          </ul>
        </nav>
        <img className='header__logo' src={logo} alt="Logo" />
        <div className='header__card-container'>
          <CurrencyFilter />
          <Cart />
        </div>
      </div>
    </header>
  )
}

export default Header