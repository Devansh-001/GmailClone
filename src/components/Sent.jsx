import React, { createContext, useState } from 'react'
import Messages from './Messages'
import MailNavBarIcons from './MailNavBarIcons'
import { useSelector } from 'react-redux';

export const SelectedContext = createContext();

const Sent = () => {


  const [allSelected, setAllSelected] = useState(false);
  const sentEmails = useSelector(store => store.appSlice.emails);

  return (


    <div className='flex-1 bg-white rounded-xl mx-5'>

      {/* Icons In Inbox Navbar */}

      <MailNavBarIcons />

      {/* Mails Section */}

      < SelectedContext.Provider value={{ allSelected, setAllSelected }}>
        <Messages emails={sentEmails} />
      </SelectedContext.Provider >
    </div>
  )
}

export default Sent
