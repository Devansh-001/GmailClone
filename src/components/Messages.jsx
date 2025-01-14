import React, { useEffect, useState } from 'react'
import Message from './Message'
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import { db } from '../firebase'
import { useDispatch, useSelector } from 'react-redux'
import { setEmails } from '../redux/appSlice'
import { motion } from 'framer-motion'

const Messages = ({ emails }) => {


    const dispatch = useDispatch();
    const { searchText } = useSelector(store => store.appSlice);
    const [searchedEmails, setSearchedEmails] = useState(emails);


    useEffect(() => {
        const q = query(collection(db, "emails"), orderBy("createdAt", "desc"));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const allEmails = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
            dispatch(setEmails(allEmails));
        })
        return () => unsubscribe();
    }, [])


    useEffect(() => {
        const filteredEmails = emails?.filter((email) => {
            return (
                email?.subject?.toLowerCase().includes(searchText.toLowerCase()) || email?.from?.toLowerCase().includes(searchText.toLowerCase()) || email?.message?.toLowerCase().includes(searchText.toLowerCase())
            )
        })
        setSearchedEmails(filteredEmails);
    }, [searchText, emails])

    return (

        <div className='h-screen overflow-y-scroll'>
            {searchedEmails && searchedEmails.map((email, index) => (
                <motion.div
                    key={email.id}
                    initial={{ opacity: 0, y: 20 }} // Start with opacity 0 and slightly down
                    animate={{ opacity: 1, y: 0 }} // Fade in and slide to original position
                    exit={{ opacity: 0, y: -20 }} // Fade out and slide up when removed
                    transition={{ duration: 0.4, ease: "easeOut" }} // Smooth transition
                >
                    <Message email={email} />
                </motion.div>
            ))}
        </div>
    )
}

export default Messages
