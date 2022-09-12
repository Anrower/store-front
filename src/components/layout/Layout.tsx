import React from 'react'
import Header from '../header/Header'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <footer>I ma footer</footer>
    </>
  )
}

export default Layout