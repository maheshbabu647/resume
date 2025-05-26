import React from 'react'

import { Outlet } from 'react-router-dom'
import styles from './MainLayout.module.css'

import Navbar from '../Common/Navbar/Navbar.jsx'

const MainLayout = () => {

  return (
    <div className = { styles.layout }>
    
    <Navbar />

    <main className =  { styles.mainContent }>
        <div className = 'container'>
          <Outlet />
        </div>
    </main>

    </div>
  )
}

export default MainLayout