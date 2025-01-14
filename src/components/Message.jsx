import React, { useContext, useEffect, useState } from 'react'
import { MdCheckBox, MdCropSquare } from 'react-icons/md'
import { RiStarFill, RiStarLine } from 'react-icons/ri'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setSelectedEmail, setStarred, setSelectedMessages } from '../redux/appSlice'
import { motion } from 'framer-motion'

const Message = ({ email }) => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [ticked, setTicked] = useState(false);
  const [starredMessage, setStarredMessage] = useState(false);

  const starred = useSelector(store => store.appSlice.starred);
  const selectedMessages = useSelector(store => store.appSlice.selectedMessages);

  const { allSelected } = useSelector(store => store.appSlice);


  useEffect(() => {
    if (starred.some((starredEmail) => starredEmail.id === email.id)) {
      setStarredMessage(true);
    }
  }, [starred, email]
  );

  useEffect(() => {
    if (selectedMessages.some((selected) => selected.id === email.id)) {
      setTicked(true);
    }
  }, [selectedMessages, email]
  )

  const handleStarredToggle = () => {
    const updatedStarred = [...starred];
    const index = updatedStarred.findIndex((starredEmail) => starredEmail.id === email.id);
    if (index !== -1) {
      updatedStarred.splice(index, 1);
    }
    else {
      updatedStarred.push(email)
    }
    dispatch(setStarred(updatedStarred));
    setStarredMessage(!starredMessage);
  }

  const handleTickedToggle = () => {
    const updatedTicked = [...selectedMessages];
    const index = updatedTicked.findIndex((selected) => selected.id === email.id);
    if (index !== -1) {
      updatedTicked.splice(index, 1);
    }
    else {
      updatedTicked.push(email);
    }
    dispatch(setSelectedMessages(updatedTicked));
    setTicked(!ticked);
  }

  const openMail = () => {
    dispatch(setSelectedEmail(email));
    navigate(`/mail/${email.id}`)
  }

  return (
    <motion.div

      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className={`flex items-start  border-b border-gray-200 px-4 py-3 text-sm hover:cursor-pointer hover:shadow-md ${ticked || allSelected ? "bg-blue-200" : "bg-white"} `}>

      <div className='flex items-center gap-2'>
        {
          (!ticked && !allSelected) &&
          <button onClick={handleTickedToggle} className='flex-none text-gray-600 hover:text-black hover:bg-gray-200 rounded-full p-2'>
            <MdCropSquare className='w-5 h-5' />
          </button>
        }
        {
          (ticked || allSelected) &&
          <button onClick={handleTickedToggle} className='flex-none hover:text-black hover:bg-gray-200 rounded-full p-2 '>
            <MdCheckBox className='w-5 h-5' />
          </button>
        }
        {
          !starredMessage &&
          <button onClick={handleStarredToggle}
            className='flex-none text-gray-600 hover:bg-gray-200 hover:text-black rounded-full p-2'>
            <RiStarLine className='w-5 h-5' />
          </button>
        }
        {
          starredMessage &&
          <button onClick={handleStarredToggle} className='flex-none  hover:bg-gray-200 hover:text-black rounded-full p-2'>
            <RiStarFill className='w-5 h-5' />
          </button>
        }
        {email.to &&
          <div>
            <p className='font-semibold '>To:{email.to}</p>
          </div>

        }
        {email.from &&
          <div className='flex gap-1'>
            <span>From:</span> <span className='font-bold'>{email.from}</span>
          </div>
        }
      </div>


      <div className='flex w-full justify-between items-center' onClick={openMail}>

        <div className='ml-4 p-2'>
          <p className='truncate inline-block max-w-full text-gray-600'>{email?.message}</p>
        </div>
        <div className='flex-none text-sm '>
          <p>{new Date(email?.createdAt?.seconds * 1000).toUTCString()}</p>
        </div>
      </div>


    </motion.div>
  )
}

export default Message

