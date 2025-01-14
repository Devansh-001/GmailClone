import React, { useState } from 'react'
import { IoMdMore } from 'react-icons/io'
import { IoRefresh } from 'react-icons/io5'
import { MdCheckBox, MdCropSquare, MdInbox, MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md'
import { FaCaretDown } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setAllSelected } from '../redux/appSlice'



const MailNavBarIcons = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const allSelected = useSelector(store => store.appSlice.allSelected);


    const toggleAllSelected = () => {
        dispatch(setAllSelected(!allSelected))
    }
    return (
        <div className='flex items-center justify-between px-4'>
            <div className='flex items-center gap-2 text-gray-700 py-2 '>
                {
                    !allSelected &&
                    <button onClick={toggleAllSelected} className='flex items-center gap-1'>
                        <MdCropSquare size={"20px"} />
                        <FaCaretDown size={"20px"} />
                    </button>
                }

                {
                    allSelected &&
                    <button onClick={toggleAllSelected} className='flex items-center gap-1 bg-gray-200 p-2'>
                        <MdCheckBox size={"20px"} />
                        <FaCaretDown size={"20px"} />
                    </button>
                }


                <div onClick={() => navigate('/inbox')} className='p-2 rounded-full hover:bg-gray-100 cursor-pointer'>
                    <IoRefresh size={"20px"} />
                </div>
                <div className='p-2 rounded-full hover:bg-gray-100 cursor-pointer'>
                    <IoMdMore size={"20px"} />
                </div>
            </div>
            <div className='flex items-center gap-2'>
                <p className='text-sm text-gray-500'>1-50 of 1000</p>
                <button className='hover:rounded-full hover:bg-gray-100'><MdKeyboardArrowLeft size={"24px"} /></button>
                <button className='hover:rounded-full hover:bg-gray-100'><MdKeyboardArrowRight size={"24px"} /></button>
            </div>
        </div>

    )
}

export default MailNavBarIcons
