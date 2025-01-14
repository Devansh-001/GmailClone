import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Navbar from "./components/shared/Navbar"
import Body from "./components/Body"
import Sent from "./components/Sent"
import Mail from "./components/Mail"
import SendMail from "./components/SendMail"
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "./redux/store";
import { useSelector } from "react-redux"
import Login from "./components/Login"
import GoogleApps from "./components/GoogleApps"
import Inbox from "./components/Inbox"
import Starred from "./components/Starred"

function App() {

  const { user } = useSelector(store => store.appSlice)
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Body />,
      children: [
        {
          path: "/inbox",
          element: <Inbox />
        },
        {
          path: "/sent",
          element: <Sent />
        },
        {
          path: '/mail/:id',
          element: <Mail />
        },
        {
          path: "/starred",
          element: <Starred />
        }
      ]
    }
  ])

  return (
    <>
      {
        !user ? <Login /> :

          <div className="bg-[#F6F8FC] h-screen w-full overflow-hidden">
            <PersistGate loading={null} persistor={persistor}>
              <Navbar />
              <RouterProvider router={router} />
              <div className="absolute w-[30%] bottom-0 right-20 z-10">
                <SendMail />
              </div>
              <div className="absolute w-[25%]  top-16 right-10 z-10">
                <GoogleApps />
              </div>
            </PersistGate>
          </div>
      }
    </>
  )
}

export default App
