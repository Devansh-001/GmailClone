import React, { createContext, useContext, useEffect, useState } from 'react'
import { FaUserFriends } from 'react-icons/fa'
import { GoTag } from 'react-icons/go'
import { MdInbox } from 'react-icons/md'
import MailNavBarIcons from './MailNavBarIcons'
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import { db } from '../firebase'
import { useDispatch, useSelector } from 'react-redux'
import { setReceivedMails } from '../redux/appSlice'
import Messages from './Messages'

export const SelectedContext = createContext();

const Inbox = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const q = query(collection(db, "receivedMails"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const allEmails = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      console.log(allEmails)
      dispatch(setReceivedMails(allEmails));
    })
    return () => unsubscribe();
  }, [])





  const mailType = [
    {
      icon: <MdInbox size={"20px"} />,
      text: "Primary"
    },
    {
      icon: <GoTag size={"20px"} />,
      text: "Promotions"
    },
    {
      icon: <FaUserFriends size={"20px"} />,
      text: "Socials"
    },
  ]

  const [mailTypeSelected, setMailTypeSelected] = useState(0);
  const [allSelected, setAllSelected] = useState(true);

  const receivedMails = useSelector(store => store.appSlice.receivedMails);
  console.log(receivedMails)

  return (

    <div className='flex-1 bg-white rounded-xl mx-5'>

      {/* Icons In Inbox Navbar */}

      <MailNavBarIcons allSelected={allSelected} setAllSelected={setAllSelected} />


      {/* Buttons Of Mail Types */}

      <div className='h-fit '>
        <div className='flex items-center gap-1'>
          {
            mailType.map((item, index) => {
              return (
                <button key={index}
                  className={`${mailTypeSelected === index ? 'border-b-4 border-b-blue-600' : 'border-transparent'} w-52 hover:bg-gray-100 flex items-center gap-5 p-4 outline-none`}
                  onClick={() => { setMailTypeSelected(index) }}
                >
                  {item.icon}
                  <span>{item.text}</span>
                </button>
              )
            })
          }
        </div>

        {/* Mails Section */}

        <div>
          <SelectedContext.Provider value={{ allSelected, setAllSelected }}>
            <Messages emails={receivedMails} />
          </SelectedContext.Provider>
        </div>

      </div>
    </div>
  )
}

export default Inbox
