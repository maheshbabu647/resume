import React from 'react'

import { Outlet } from 'react-router-dom'
import styles from './MainLayout.module.css'

import Navbar from '../Common/Navbar/Navbar.jsx'
import Footer from '../Common/Footer/Footer'

const MainLayout = () => {

  return (
    <div>
    <Navbar />
    <main>
        <div className = 'container'>
          <Outlet />
        </div>
    </main>
    <Footer />
    </div>
  )
}

export default MainLayout