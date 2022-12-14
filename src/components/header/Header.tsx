import './header.scss';
import logo from '../../images/logo.svg'
import CartIcon from '../../pages/Cart/CartIcon/CartIcon';
import CurrencyFilter from '../CurrencyFilter/CurrencyFilter';
import { useQuery } from '@apollo/client';
import { useEffect } from 'react';
import { GET_CATEGORIES } from '../../query/query';
import { ICategoriesData } from '../../models/ICategoriesData';
import { NavLink } from 'react-router-dom';


const Header = () => {
  const { loading, error, data } = useQuery<ICategoriesData>(GET_CATEGORIES);

  useEffect(() => {
    if (!loading && !error && data) {
    }
  }, [data, error, loading])

  return (
    <header className="header">
      <div className="header__wrapper">
        <nav className="header__navigation">
          <ul className="header__navigation-list">

            <li className="header__navigation-list-item">
              <NavLink to="all"
                className={({ isActive }) => (isActive ? 'active' : 'inactive')}>
                ALL
              </NavLink>
            </li>
            <li className="header__navigation-list-item">
              <NavLink to="tech"
                className={({ isActive }) => (isActive ? 'active' : 'inactive')}>
                TECH
              </NavLink>
            </li>
            <li className="header__navigation-list-item">
              <NavLink to="clothes"
                className={({ isActive }) => (isActive ? 'active' : 'inactive')}>
                clothes
              </NavLink>
            </li>
          </ul>
        </nav>
        <img className="header__logo"
          src={logo}
          alt="Logo"
        />
        <div className="header__card-container">
          <CurrencyFilter />
          <CartIcon />
        </div>
      </div>
    </header>
  )
}

export default Header