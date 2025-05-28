// import React, {useState, useEffect, useRef} from "react";
// import { Link, NavLink, useNavigate } from "react-router-dom";

// import useAuthContext from "../../../hooks/useAuth.js";
// import Button from "../Button/Button.jsx";
// import styles from './Navbar.module.css'

// const Navbar = () => {

//     const { isAuthenticated, userData, signout } = useAuthContext()
//     const navigate = useNavigate()

//     const [ isMobileMenuOpen, setIsMobileMenuOpen ] = useState(false)

//     const mobileMenuRef = useRef(null)
//     const hamburgerRef = useRef(null)

//     const toggleMobileMenu = () => {
//         setIsMobileMenuOpen(prevSate => !prevSate)
//     }

//     const closeMobileMenu = () => {
//         setIsMobileMenuOpen(false)
//     }

//     const handleSignout = () => {
//         signout()
//         closeMobileMenu()
//         navigate('/login')
//     }

//     useEffect(() => {

//         if (!isMobileMenuOpen) {
//             return
//         }
        
//         const handleClickOutside = (event) => {       
//             if(isMobileMenuOpen &&
//                 mobileMenuRef.current && !mobileMenuRef.current.contains(event.target) &&
//                 hamburgerRef.current && !hamburgerRef.current.contains(event.target)
//             ) {
//                 closeMobileMenu()
//             }
//         }

//         document.addEventListener('mousedown', handleClickOutside)

//         return () => {
//             document.removeEventListener('mousedown', handleClickOutside)
//         }

//     }, [isMobileMenuOpen])

//     const getDesktopNavLinkClass = ({ isActive }) => {
//         return `${styles.navLink} ${isActive ? styles.active : ''}`
//     }

//     const getMobileNavLinkClass = ({ isActive }) => {
//         return `${styles.navLink} ${isActive ? styles.mobileActive : ''}`
//     }

//     return (
//         <nav className = {`${styles.navbar} bg-blue-500`} aria-label="Main Navigation">
        
//                 <div className={`${styles.navContent} bg-blue-500`}>

//                     <Link to='/' className={styles.brand} onClick={closeMobileMenu}>
//                         ResumeBuilder
//                     </Link>

//                     <div className={styles.navLinksDesktop}>
//                         {isAuthenticated && (
//                             <>
//                                 <NavLink to='/resumes' className={getDesktopNavLinkClass}>
//                                     My Resumes
//                                 </NavLink>
//                                 <NavLink to='/templates' className={getDesktopNavLinkClass}>
//                                     Templates
//                                 </NavLink>
//                                 {userData?.userRole === 'admin' && (
//                                     <NavLink to='/admin/templates' className={getDesktopNavLinkClass}>
//                                         Admin Templates
//                                     </NavLink>
//                                 )}
//                             </>
//                         )}
//                     </div>
//                     <div className={styles.authSectionDesktop}>
//                         {isAuthenticated ? (
//                             <>
//                                 <span className={styles.userInfo}>{userData?.userName || 'User'}</span>
//                                 <Button onClick={handleSignout} variant="secondary" size="sm">
//                                     Logout
//                                 </Button>
//                             </>
//                         ) : (
//                             <>
//                                 <NavLink to='/login' className={getDesktopNavLinkClass}>
//                                     Login
//                                 </NavLink>
//                                 <Button variant="primary" size="sm" onClick={() => navigate('/signup')}>
//                                     Sign Up
//                                 </Button>
//                             </>
//                         )}
//                     </div>

//                     <button
//                         ref={hamburgerRef}
//                         className={`${styles.menuToggle} ${isMobileMenuOpen ? styles.open : ''}`}
//                         onClick={toggleMobileMenu}
//                         aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
//                         aria-expanded={isMobileMenuOpen}
//                         aria-controls="mobile-menu-container"
//                     >
//                         <span></span>
//                         <span></span>
//                         <span></span>
//                     </button>

//                 </div>


//             <div 
//                 id="mobile-menu-container"
//                 ref={mobileMenuRef}
//                 className={`${styles.mobileMenu} ${isMobileMenuOpen ? styles.open : ''}`}
//                 role="dialog"
//                 aria-modal="true"
//                 aria-hidden={!isMobileMenuOpen}
//             >
//                 {isAuthenticated && (
//                     <>
//                     <NavLink to='/resumes' className={getMobileNavLinkClass} onClick={closeMobileMenu}>
//                         My Resumes
//                     </NavLink>
//                     <NavLink to='/templates' className={getMobileNavLinkClass} onClick={closeMobileMenu}>
//                         Templates
//                     </NavLink>
//                     {userData.userRole === 'admin' && (
//                         <NavLink to='/admin/templates' className={getMobileNavLinkClass} onClick={closeMobileMenu}>
//                             Admin Templates
//                         </NavLink>
//                     )}
//                     </>
//                 )}

//                 <div className={styles.mobileAuthSection}>
//                     {isAuthenticated ? (
//                         <>
//                             <span className={styles.mobileUserInfo}>{userData.userName || 'User'}</span>
//                             <Button onClick={handleSignout} variant="secondary" size="sm" className={styles.fullWidthButton}>
//                                 Logout
//                             </Button>
//                         </>
//                     ) : (
//                         <>
//                             <NavLink to='/login' className={getMobileNavLinkClass} onClick={closeMobileMenu}>
//                                 Login
//                             </NavLink>
//                             <Button variant="primary" size="sm" onClick={() => { navigate('/signup'); closeMobileMenu()}} className={styles.fullWidthButton}>
//                                 Sign Up
//                             </Button>
//                         </>
//                     )}
//                 </div>
//             </div>
//         </nav>
//     )

// }

// export default Navbar

import React, { useEffect, useState, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Menu, X, LayoutTemplate, LayoutDashboard, FileUser, House, LogOut } from 'lucide-react'
import { NavLink } from 'react-router-dom'

import useAuthContext from '@/hooks/useAuth.js'


const Navbar = () => {

    const { isAuthenticated, userData, signout } = useAuthContext()

    const [mobileOpen, setMobileOpen] = useState(false)
    const menuRef = useRef(null)
    const hamRef = useRef(null)

    const toggleMenu = () => setMobileOpen(!mobileOpen)
    const closeMobileMenu = () => setMobileOpen(false)

    const handleLogout = () => {
        signout()
        closeMobileMenu()
        navigate('/login')
    }

    useEffect(() => {
        function handleClickOutside(event) {
            if (menuRef.current && !menuRef.current.contains(event.target) && !hamRef.current.contains(event.target)) {
                console.log("we are in")
                closeMobileMenu()
            }
        }

        if (mobileOpen) {
            document.body.style.overflow = "hidden"
            document.addEventListener("mousedown", handleClickOutside)
        }
        else {
            document.body.style.overflow = ""
            document.removeEventListener("mousedown", handleClickOutside)
        }

        return () => {
            document.body.style.overflow = ""
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [mobileOpen])



  return (
    <nav className='w-full px-4 py-3 flex justify-between items-center shadow-md bg-white'>
        
        <div className='text-2xl font-bold pl-5'><p className='bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-transparent bg-clip-text'>CareerForge</p></div>

        {/* desktop */}
        <div className='hidden md:flex items-center space-x-6 text-md'>
            <NavLink to='/home' className='hover:text-blue-500'><House size={15} className='inline-block'/> Home</NavLink>
            { isAuthenticated ? 
            <>
                <NavLink to='/resumebuilder' className='hover:text-blue-500'><FileUser size={15} className='inline-block'/> Resume Builder</NavLink>
                <NavLink to='/templates' className='hover:text-blue-500'><LayoutTemplate size={15} className='inline-block'/> Templates</NavLink>
                <NavLink to='/dashboard' className='hover:text-blue-500'><LayoutDashboard size={15} className='inline-block' /> Dashboard</NavLink>
                <Button class="px-4 py-2 rounded-md text-sm font-medium text-gray-700 bg-white/70 backdrop-blur-md shadow hover:bg-white/90 transition" onClick={handleLogout}><LogOut size={16}/></Button>
            </> :
            <>
                <Button variant="outline">Login</Button>
                <Button variant="default">Signup</Button>
            </>
            }

        </div>

        {/* hamburger */}
        <div className='md:hidden z-70' ref={hamRef}>
            <Button variant="ghost" size="icon" onClick={toggleMenu}>
                <motion.div 
                    initial={false}
                    animate={{rotate: mobileOpen ? 180 : 0}}
                    transition={{duration : 0.3}}
                >
                    {mobileOpen ? <X size={24}/> : <Menu size={24}/>}
                </motion.div>
            </Button>
        </div>

        {/* mobile */}
        <AnimatePresence>
            {mobileOpen && (
                <>
                    <motion.div 
                        className='fixed inset-0 backdrop-blur-sm bg-black/50 z-[10] '
                        initial={{opacity : 0}}
                        animate={{opacity : 1}}
                        exit={{opacity: 0}}
                    >
                        <motion.div 
                            ref={menuRef}
                            initial={{x : "100%"}}
                            animate={{x : 0}}
                            exit={{x: '100%'}}
                            transition={{type : "spring", stiffness : 300, damping : 30}}
                            className='fixed top-0 right-0 w-3/4 h-screen bg-white p-6 pt-14 flex flex-col items-center space-y-6 z-[60]'
                        >   
                            <NavLink to='/home' className='hover:text-blue-500'><House size={15} className='inline-block'/> Home</NavLink>
                            { isAuthenticated ?
                            <>
                                <NavLink to='/resumebuilder' className='hover:text-blue-500'><FileUser size={15} className='inline-block'/> Resume Builder</NavLink>
                                <NavLink to='/templates' className='hover:text-blue-500'><LayoutTemplate size={15} className='inline-block'/> Templates</NavLink>
                                <NavLink to='/dashboard' className='hover:text-blue-500'><LayoutDashboard size={15} className='inline-block' /> Dashboard</NavLink>
                                <Button class="px-4 py-2 rounded-md text-sm font-medium text-gray-700 bg-white/70 backdrop-blur-md shadow hover:bg-white/90 transition" onClick={handleLogout}><LogOut /></Button>
                            </> :
                            <>
                                <Button variant="outline">Login</Button>
                                <Button variant="default">Signup</Button>
                            </>
                            }
                        </motion.div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
        {/* {mobileOPen && (
            <motion.div
                initial={{x : '100%'}}
                animate={{x : 0}}
                exit={{x : '100%'}}
                ref={menuRef}
                className='absolute top-0 right-0 w-3/4 h-screen bg-white shadow-lg p-6 flex flex-col space-y-4 z-50'>
                    <NavLink to='/home' className='hover:text-blue-500'>Home</NavLink>
                    <NavLink to='/resumebuilder' className='hover:text-blue-500'>Resume Builder</NavLink>
                    <NavLink to='/templates' className='hover:text-blue-500'>Templates</NavLink>
                    <NavLink to='/dashboard' className='hover:text-blue-500'>Dashboard</NavLink>
                </motion.div>
        )} */}
    </nav>
  )

}

export default Navbar