import React, { createContext, useState } from 'react'
import { useSelector } from 'react-redux'
import MailNavBarIcons from './MailNavBarIcons'
import Messages from './Messages';

export const SelectedContext = createContext();

const Starred = () => {
    const { starred } = useSelector(store => store.appSlice);
    const [allSelected, setAllSelected] = useState(false);
    return (

        <div className='flex-1 h-full bg-white rounded-xl mx-5'>

            {/* Icons In Inbox Navbar */}

            <MailNavBarIcons />


            {/* Mails Section */}

            <SelectedContext.Provider value={{ allSelected, setAllSelected }}>
                <Messages emails={starred} />
            </SelectedContext.Provider>
        </div>
    )
}

export default Starred
