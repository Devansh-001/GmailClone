import { deleteDoc, doc } from 'firebase/firestore';
import React, { useState, useEffect } from 'react';
import { BiArchiveIn } from 'react-icons/bi';
import { IoMdArrowBack, IoMdMore } from 'react-icons/io';
import { MdDeleteOutline, MdKeyboardArrowLeft, MdKeyboardArrowRight, MdOutlineAddTask, MdOutlineDriveFileMove, MdOutlineMarkEmailRead, MdOutlineReport, MdOutlineWatchLater } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { db } from '../firebase';
import { motion } from 'framer-motion';
import { setSelectedEmail } from '../redux/appSlice';

const Mail = () => {

  const selectedEmail = useSelector(store => store.appSlice.selectedEmail);
  const allEmails = useSelector(store => store.appSlice.emails);
  const receivedEmails = useSelector(store => store.appSlice.receivedMails);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

  const [selectedMailIndexInAllEmails, setSelectedMailIndexInAllEmails] = useState(null);
  const [selectedMailIndexInReceivedEmails, setSelectedMailIndexInReceivedEmails] = useState(null);

  useEffect(() => {

    const indexInAllEmails = allEmails.findIndex((email) => selectedEmail.id === email.id);
    const indexInReceivedEmails = receivedEmails.findIndex((email) => selectedEmail.id === email.id);

    setSelectedMailIndexInAllEmails(indexInAllEmails);
    setSelectedMailIndexInReceivedEmails(indexInReceivedEmails);
  }, [selectedEmail, allEmails, receivedEmails]);

  const handleNextEmail = (adjustment) => {
    let nextIndex;
    let emailsArray;

    if (selectedMailIndexInAllEmails !== -1) {
      emailsArray = allEmails;
      nextIndex = selectedMailIndexInAllEmails + adjustment;
    }
    else if (selectedMailIndexInReceivedEmails !== -1) {
      emailsArray = receivedEmails;
      nextIndex = selectedMailIndexInReceivedEmails + adjustment;
    }

    if (emailsArray && nextIndex >= 0 && nextIndex < emailsArray.length) {
      if (emailsArray === allEmails) {
        setSelectedMailIndexInAllEmails(nextIndex);
        dispatch(setSelectedEmail(allEmails[nextIndex]));
      }
      else {
        setSelectedMailIndexInReceivedEmails(nextIndex);
        dispatch(setSelectedEmail(receivedEmails[nextIndex]));
      }
    }
  };

  const deleteMailById = async (id) => {
    try {
      if (selectedMailIndexInAllEmails >= 0) {
        await deleteDoc(doc(db, "emails", id));
        navigate(-1);
      }
      else if (selectedMailIndexInReceivedEmails >= 0) {
        await deleteDoc(doc(db, "receivedMails", id));
        navigate(-1);
      }
      else {
        console.error("Email not found in any collection.");
      }
    } catch (err) {
      console.log("Error deleting email:", err);
    }
  };

  if (!selectedEmail) return <div>Loading...</div>;

  console.log(selectedEmail)
  return (
    <div className='flex-1 bg-white rounded-xl mx-5'>

      {/* Icons */}
      <div className='flex items-center justify-between px-4'>
        <div className='flex items-center gap-2 text-gray-700 py-2'>
          <motion.div
            onClick={() => navigate(-1)}
            className='p-2 rounded-full hover:bg-gray-100 cursor-pointer'
            whileHover={{ scale: 1.2 }} // Icon hover effect
            transition={{ duration: 0.3 }}
          >
            <IoMdArrowBack size={"20px"} />
          </motion.div>
          <motion.div
            className='p-2 rounded-full hover:bg-gray-100 cursor-pointer'
            whileHover={{ scale: 1.2 }} // Icon hover effect
            transition={{ duration: 0.3 }}
          >
            <BiArchiveIn size={"20px"} />
          </motion.div>
          <motion.div
            className='p-2 rounded-full hover:bg-gray-100 cursor-pointer'
            whileHover={{ scale: 1.2 }} // Icon hover effect
            transition={{ duration: 0.3 }}
          >
            <MdOutlineReport size={"20px"} />
          </motion.div>
          <motion.div
            onClick={() => deleteMailById(params.id)}
            className='p-2 rounded-full hover:bg-gray-100 cursor-pointer'
            whileHover={{ scale: 1.2 }} // Icon hover effect
            transition={{ duration: 0.3 }}
          >
            <MdDeleteOutline size={"20px"} />
          </motion.div>
          <motion.div
            className='p-2 rounded-full hover:bg-gray-100 cursor-pointer'
            whileHover={{ scale: 1.2 }} // Icon hover effect
            transition={{ duration: 0.3 }}
          >
            <MdOutlineMarkEmailRead size={"20px"} />
          </motion.div>
          <motion.div
            className='p-2 rounded-full hover:bg-gray-100 cursor-pointer'
            whileHover={{ scale: 1.2 }} // Icon hover effect
            transition={{ duration: 0.3 }}
          >
            <MdOutlineWatchLater size={"20px"} />
          </motion.div>
          <motion.div
            className='p-2 rounded-full hover:bg-gray-100 cursor-pointer'
            whileHover={{ scale: 1.2 }} // Icon hover effect
            transition={{ duration: 0.3 }}
          >
            <MdOutlineAddTask size={"20px"} />
          </motion.div>
          <motion.div
            className='p-2 rounded-full hover:bg-gray-100 cursor-pointer'
            whileHover={{ scale: 1.2 }} // Icon hover effect
            transition={{ duration: 0.3 }}
          >
            <MdOutlineDriveFileMove size={"20px"} />
          </motion.div>
          <motion.div
            className='p-2 rounded-full hover:bg-gray-100 cursor-pointer'
            whileHover={{ scale: 1.2 }} // Icon hover effect
            transition={{ duration: 0.3 }}
          >
            <IoMdMore size={"20px"} />
          </motion.div>
        </div>

        <div className='flex items-center gap-2'>
          <motion.button
            onClick={() => handleNextEmail(-1)}
            className='hover:rounded-full hover:bg-gray-100'
            whileHover={{ scale: 1.2 }} // Button hover effect
            transition={{ duration: 0.3 }}
          >
            <MdKeyboardArrowLeft size={"24px"} />
          </motion.button>
          <motion.button
            onClick={() => handleNextEmail(1)}
            className='hover:rounded-full hover:bg-gray-100'
            whileHover={{ scale: 1.2 }} // Button hover effect
            transition={{ duration: 0.3 }}
          >
            <MdKeyboardArrowRight size={"24px"} />
          </motion.button>
        </div>
      </div>

      {/* Mail Contents */}
      <motion.div
        className='h-[90vh] overflow-y-auto p-4'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.9 }}
      >
        <div className='flex items-center justify-between bg-white gap-1'>
          <div className='flex items-center gap-2'>
            <h1 className='text-xl font-medium'>{selectedEmail?.subject}</h1>
            <span className='text-sm bg-gray-200 rounded-md px-2'>inbox</span>
          </div>
          <div className='flex-none text-gray-400 my-5 text-sm '>
            <p>{new Date(selectedEmail?.createdAt?.seconds * 1000).toUTCString()}</p>
          </div>
        </div>

        <div className='text-gray-500 font-bold text-sm'>
          {selectedEmail.to &&
            <p>to: {selectedEmail?.to}</p>
          }
          {selectedEmail.from &&
            <p>from: {selectedEmail?.from}</p>
          }
        </div>

        <div className='my-10 '>
          <p>{selectedEmail?.message}</p>
        </div>
      </motion.div>
    </div>
  );
};

export default Mail;
