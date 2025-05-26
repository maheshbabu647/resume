import React, {useState, useEffect, useRef} from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

import useAuthContext from "../../../hooks/useAuth.js";
import Button from "../Button/Button.jsx";
import styles from './Navbar.module.css'

const Navbar = () => {

    const { isAuthenticated, userData, signout } = useAuthContext()
    const navigate = useNavigate()

    const [ isMobileMenuOpen, setIsMobileMenuOpen ] = useState(false)

    const mobileMenuRef = useRef(null)
    const hamburgerRef = useRef(null)

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(prevSate => !prevSate)
    }

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false)
    }

    const handleSignout = () => {
        signout()
        closeMobileMenu()
        navigate('/login')
    }

    useEffect(() => {

        if (!isMobileMenuOpen) {
            return
        }
        
        const handleClickOutside = (event) => {       
            if(isMobileMenuOpen &&
                mobileMenuRef.current && !mobileMenuRef.current.contains(event.target) &&
                hamburgerRef.current && !hamburgerRef.current.contains(event.target)
            ) {
                closeMobileMenu()
            }
        }

        document.addEventListener('mousedown', handleClickOutside)

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }

    }, [isMobileMenuOpen])

    const getDesktopNavLinkClass = ({ isActive }) => {
        return `${styles.navLink} ${isActive ? styles.active : ''}`
    }

    const getMobileNavLinkClass = ({ isActive }) => {
        return `${styles.navLink} ${isActive ? styles.mobileActive : ''}`
    }

    return (
        <nav className = {styles.navbar} aria-label="Main Navigation">
        
                <div className={styles.navContent}>

                    <Link to='/' className={styles.brand} onClick={closeMobileMenu}>
                        ResumeBuilder
                    </Link>

                    <div className={styles.navLinksDesktop}>
                        {isAuthenticated && (
                            <>
                                <NavLink to='/resumes' className={getDesktopNavLinkClass}>
                                    My Resumes
                                </NavLink>
                                <NavLink to='/templates' className={getDesktopNavLinkClass}>
                                    Templates
                                </NavLink>
                                {userData?.userRole === 'admin' && (
                                    <NavLink to='/admin/templates' className={getDesktopNavLinkClass}>
                                        Admin Templates
                                    </NavLink>
                                )}
                            </>
                        )}
                    </div>
                    <div className={styles.authSectionDesktop}>
                        {isAuthenticated ? (
                            <>
                                <span className={styles.userInfo}>{userData?.userName || 'User'}</span>
                                <Button onClick={handleSignout} variant="secondary" size="sm">
                                    Logout
                                </Button>
                            </>
                        ) : (
                            <>
                                <NavLink to='/login' className={getDesktopNavLinkClass}>
                                    Login
                                </NavLink>
                                <Button variant="primary" size="sm" onClick={() => navigate('/signup')}>
                                    Sign Up
                                </Button>
                            </>
                        )}
                    </div>

                    <button
                        ref={hamburgerRef}
                        className={`${styles.menuToggle} ${isMobileMenuOpen ? styles.open : ''}`}
                        onClick={toggleMobileMenu}
                        aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
                        aria-expanded={isMobileMenuOpen}
                        aria-controls="mobile-menu-container"
                    >
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>

                </div>


            <div 
                id="mobile-menu-container"
                ref={mobileMenuRef}
                className={`${styles.mobileMenu} ${isMobileMenuOpen ? styles.open : ''}`}
                role="dialog"
                aria-modal="true"
                aria-hidden={!isMobileMenuOpen}
            >
                {isAuthenticated && (
                    <>
                    <NavLink to='/resumes' className={getMobileNavLinkClass} onClick={closeMobileMenu}>
                        My Resumes
                    </NavLink>
                    <NavLink to='/templates' className={getMobileNavLinkClass} onClick={closeMobileMenu}>
                        Templates
                    </NavLink>
                    {userData.userRole === 'admin' && (
                        <NavLink to='/admin/templates' className={getMobileNavLinkClass} onClick={closeMobileMenu}>
                            Admin Templates
                        </NavLink>
                    )}
                    </>
                )}

                <div className={styles.mobileAuthSection}>
                    {isAuthenticated ? (
                        <>
                            <span className={styles.mobileUserInfo}>{userData.userName || 'User'}</span>
                            <Button onClick={handleSignout} variant="secondary" size="sm" className={styles.fullWidthButton}>
                                Logout
                            </Button>
                        </>
                    ) : (
                        <>
                            <NavLink to='/login' className={getMobileNavLinkClass} onClick={closeMobileMenu}>
                                Login
                            </NavLink>
                            <Button variant="primary" size="sm" onClick={() => { navigate('/signup'); closeMobileMenu()}} className={styles.fullWidthButton}>
                                Sign Up
                            </Button>
                        </>
                    )}
                </div>
            </div>
        </nav>
    )

}

export default Navbar