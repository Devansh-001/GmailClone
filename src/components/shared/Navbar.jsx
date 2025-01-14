import React, { useEffect, useState } from 'react'
import { GiHamburgerMenu } from "react-icons/gi";
import { IoIosSearch } from 'react-icons/io';
import { LuSettings2 } from "react-icons/lu";
import { VscQuestion } from "react-icons/vsc";
import { MdOutlineSettings } from "react-icons/md";
import { TbGridDots } from "react-icons/tb";
import Avatar from 'react-avatar';
import { useDispatch, useSelector } from 'react-redux';
import { setGoogleAppsOpen, setSearchText, setUser } from '../../redux/appSlice';
import { AnimatePresence, motion } from 'framer-motion';
import { signOut } from "firebase/auth"
import { auth } from "../../firebase"
import { useNavigate } from 'react-router-dom';



const Navbar = () => {

    const [input, setInput] = useState("");
    const [toggle, setToggle] = useState(false);

    const dispatch = useDispatch();

    const { user } = useSelector(store => store.appSlice);
    const open = useSelector(store => store.appSlice.googleAppsOpen)

    useEffect(() => {
        dispatch(setSearchText(input));
    }, [input])

    const signOutHandler = () => {
        signOut(auth).then(() => {
            dispatch(setUser(null))
        }).catch((err) => console.log(err))
    }

    return (
        <div className='flex items-center justify-between mx-3 h-16'>

            {/* Logo and Title */}

            <div className='flex items-center gap-10'>
                <div className='flex items-center gap-2'>
                    <div className='p-3 rounded-full hover:bg-gray-100 cursor-pointer'>
                        <GiHamburgerMenu size={"20px"} />
                    </div>
                    <a href="/inbox" className='flex gap-2 items-center'>
                        <img className='w-8' src="https://cdn-icons-png.flaticon.com/512/5968/5968534.png" alt="gmail-logo" />
                        <h1 className='text-2xl text-gray-500 font-medium'>Gmail</h1>
                    </a>
                </div>
            </div>

            {/* Input Field */}

            <div className='md:block hidden w-[50%] mr-60'>
                <div className='flex items-center bg-[#EAF1FB] px-3 py-3 rounded-full'>
                    <IoIosSearch size={"24px"} />
                    <input className='rounded-full w-full bg-transparent outline-none px-1' type="text" placeholder='Search Mail' value={input} onChange={(e) => setInput(e.target.value)} />
                    <LuSettings2 size={"24px"} />
                </div>
            </div>


            <div className='md:block hidden'>
                <div className='flex items-center gap-2'>
                    <div className='p-3 rounded-full hover:bg-gray-100 cursor-pointer'>
                        <VscQuestion size={"24px"} />
                    </div>
                    <div className='p-3 rounded-full hover:bg-gray-100 cursor-pointer'>
                        <MdOutlineSettings size={"24px"} />
                    </div>
                    <div onClick={() => dispatch(setGoogleAppsOpen(!open))} className='p-3 rounded-full hover:bg-gray-100 cursor-pointer'>
                        <TbGridDots size={"24px"} />
                    </div>
                    <div className='cursor-pointer relative'>
                        <Avatar onClick={() => setToggle(!toggle)} src={`${user.photoURL}`} size='40px' round={true} />
                        <AnimatePresence>
                            {
                                toggle &&
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.8 }}
                                    transition={{ duration: 0.1 }}
                                    className='absolute right-2 z-20 shadow-lg bg-white rounded-md'
                                >
                                    <p onClick={signOutHandler} className='p-2 underline'>LogOut</p>
                                </motion.div>
                            }
                        </AnimatePresence>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Navbar
