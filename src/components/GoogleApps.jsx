import React from 'react'
import { useSelector } from 'react-redux'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const GoogleApp = () => {
  const user = useSelector(store => store.appSlice.user)
  const open = useSelector(store => store.appSlice.googleAppsOpen)

  const appButtons =
    [
      {
        src: `${user ? user.photoURL : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQdztTDcpZ2pFqwWDYwSXbvZq5nzJYg5cn8w&s"}`,
        text: "Account",
        url: ""
      },
      {
        src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8TnrQxTZSfvVAv5WMvi3cNJZdO09N-NfkXQ&s",
        text: "Search",
        url: "https://www.google.com"
      },
      {
        src: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Google_Maps_icon_%282020%29.svg/1428px-Google_Maps_icon_%282020%29.svg.png",
        text: "Maps",
        url: "https://www.google.com/maps"
      },
      {
        src: "https://cdn-icons-png.flaticon.com/512/1384/1384060.png",
        text: "Youtube",
        url: "https://www.youtube.com"
      },
      {
        src: "https://cdn-icons-png.flaticon.com/512/5968/5968534.png",
        text: "Gmail",
        url: "https://mail.google.com"
      },
      {
        src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTtVfSqt-RHqpZyqOxhoJRcGEnphUzaNrcGw&s",
        text: "Meet",
        url: ""
      },
      {
        src: "https://static.vecteezy.com/system/resources/previews/046/804/428/non_2x/google-chat-icon-logo-symbol-free-png.png",
        text: "Chat",
        url: "https://chat.google.com"
      },
      {
        src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvt7ntBQeCweroNWsiyHTeiyNdPgsKBJ84aQ&s",
        text: "Drive",
        url: "https://drive.google.com"
      },
    ]

  return (
    <>
      {open && (
        <motion.div
          className='bg-blue-100 rounded-xl p-2'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className='rounded-xl flex flex-wrap items-center justify-between p-7 bg-white'
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            {appButtons.map((app, index) => {
              return (
                <a href={app.url}>
                  <motion.button
                    key={index}
                    className='flex flex-col hover:bg-gray-100 hover:outline rounded-lg hover:outline-blue-500 justify-center items-center w-24 h-24'
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <motion.img
                      src={app.src}
                      alt={app.text}
                      className='w-12 h-12 rounded-lg'
                      whileHover={{ rotate: 10 }}
                      transition={{ type: 'spring', stiffness: 100 }}
                    />
                    <span className='text-center'>{app.text}</span>
                  </motion.button>
                </a>
              )
            })}
          </motion.div>
        </motion.div>
      )}
    </>
  )
}

export default GoogleApp
