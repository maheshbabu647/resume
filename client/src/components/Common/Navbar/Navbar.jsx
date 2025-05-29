import React, { useEffect, useState, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Menu, X, LayoutTemplate, User, FileUser, House, LogOut } from 'lucide-react'
import { NavLink, useNavigate } from 'react-router-dom'

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
        
        <div className='text-2xl font-bold pl-5'><NavLink to='/home'><p className='bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-transparent bg-clip-text cursor-pointer'>CareerForge</p></NavLink></div>

        {/* desktop */}
        <div className='hidden md:flex items-center space-x-6 text-md'>
            <NavLink to='/home' className='hover:text-blue-500'><House size={15} className='inline-block'/> Home</NavLink>
            { isAuthenticated ? 
            <>
                {/* <NavLink to='/resumebuilder' className='hover:text-blue-500'><FileUser size={15} className='inline-block'/> Resume Builder</NavLink> */}
                <NavLink to='/templates' className='hover:text-blue-500'><LayoutTemplate size={15} className='inline-block'/> Templates</NavLink>
                <NavLink to='/dashboard' className='hover:text-blue-500'><User size={15} className='inline-block' /> Dashboard</NavLink>
                <Button class="px-4 py-2 rounded-md text-sm font-medium text-gray-700 bg-white/70 backdrop-blur-md shadow hover:bg-white/90 transition" onClick={handleLogout}><LogOut size={16}/></Button>
            </> :
            <>
                <NavLink to='/login'><Button variant="outline" className='cursor-pointer'>Login</Button></NavLink>
                <NavLink to='/signup'><Button variant="default" className='cursor-pointer'>Signup</Button></NavLink>
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
                                {/* <NavLink to='/resumebuilder' className='hover:text-blue-500'><FileUser size={15} className='inline-block'/> Resume Builder</NavLink> */}
                                <NavLink to='/templates' className='hover:text-blue-500'><LayoutTemplate size={15} className='inline-block'/> Templates</NavLink>
                                <NavLink to='/dashboard' className='hover:text-blue-500'><User size={15} className='inline-block' /> Dashboard</NavLink>
                                <Button class="px-4 py-2 rounded-md text-sm font-medium text-gray-700 bg-white/70 backdrop-blur-md shadow hover:bg-white/90 transition" onClick={handleLogout}><LogOut /></Button>
                            </> :
                            <>
                                <NavLink to='/login'><Button variant="outline">Login</Button></NavLink>
                                <NavLink to='/signup'><Button variant="default">Signup</Button></NavLink>
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