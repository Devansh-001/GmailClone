import React from 'react'
import GoogleButton from 'react-google-button'
import { linkWithCredential, signInWithPopup } from "firebase/auth"
import { auth, githubProvider, googleProvider } from "../firebase"
import { useDispatch } from 'react-redux'
import { setUser } from "../redux/appSlice"

const Login = () => {

    const dispatch = useDispatch();

    const signInWithGoogle = async () => {
        try {
            const res = await signInWithPopup(auth, googleProvider);

            dispatch(setUser({
                displayName: res.user.displayName,
                email: res.user.email,
                photoURL: res.user.photoURL
            }))

        }
        catch (err) {
            console.log(err);
        }
    }

    const signInWithGithub = async () => {
        try {
            const res = await signInWithPopup(auth, githubProvider);

            dispatch(setUser({
                displayName: res.user.displayName,
                email: res.user.email,
                photoURL: res.user.photoURL
            }))
        }
        catch (err) {
            console.log(err)
        }
    }
    return (
        <div className='w-screen h-screen flex justify-center items-center bg-gray-300'>
            <div className='p-8 bg-white flex flex-col gap-3 rounded-md'>
                <h1 className='text-center text-xl font-medium mb-5'>Login</h1>
                <GoogleButton onClick={signInWithGoogle} />
                <button
                    onClick={signInWithGithub}
                    className='flex items-center justify-center bg-[#474d55] text-white px-5 py-4 text-lg rounded-md border-none'
                >
                    <img
                        src="https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg"
                        alt="GitHub Logo"
                        className="w-5 mr-3"
                    />
                    Login with GitHub
                </button>
            </div>
        </div>
    )
}

export default Login
