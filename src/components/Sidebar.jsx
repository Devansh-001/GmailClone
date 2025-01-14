import React, { useState } from 'react'
import { IoMdStar } from 'react-icons/io'
import { LuPencil } from 'react-icons/lu'
import { MdInbox, MdOutlineDrafts, MdOutlineKeyboardArrowDown, MdOutlineWatchLater } from 'react-icons/md'
import { TbSend2 } from 'react-icons/tb'
import { useDispatch } from 'react-redux'
import { setOpen } from '../redux/appSlice'
import { useNavigate } from 'react-router-dom'

const Sidebar = () => {

    const [selected, setSelected] = useState(0);
    const sidebarItems = [
        {
            icon: <MdInbox size={'24px'} />,
            text: 'Inbox',
            url: "/inbox"
        },
        {
            icon: <IoMdStar size={'24px'} />,
            text: 'Starred',
            url: "/starred"
        },
        {
            icon: <MdOutlineWatchLater size={'24px'} />,
            text: 'Snoozed'
        },
        {
            icon: <TbSend2 size={'24px'} />,
            text: 'Sent',
            url: "/sent"
        },
        {
            icon: <MdOutlineDrafts size={'24px'} />,
            text: 'Drafts'
        },
        {
            icon: <MdOutlineKeyboardArrowDown size={'24px'} />,
            text: 'More'
        },
    ]

    const navigate = useNavigate();
    const dispatch = useDispatch();

    return (
        <div className='w-[20%]'>
            <div className='p-3'>
                <button onClick={() => dispatch(setOpen(true))} className='flex items-center gap-2 p-4 rounded-2xl hover:shadow-lg bg-[#C2E7FF]'>
                    <LuPencil size={'24px'} />
                    Compose
                </button>
            </div>

            <div className='text-gray-500'>

                {
                    sidebarItems.map((item, index) => {
                        return (
                            <div
                                onClick={() => {
                                    navigate(item.url);
                                    setSelected(index);
                                }}
                                key={index}
                                className={`flex items-center gap-4 pl-6 py-1 rounded-r-full cursor-pointer my-2 hover:bg-gray-200 ${selected === index ? "bg-blue-200" : "bg-white"}`}>
                                {item.icon}
                                <p>{item.text}</p>
                            </div>
                        )
                    })
                }

            </div>
        </div>
    )
}

export default Sidebar
