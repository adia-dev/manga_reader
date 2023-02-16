import {
    createUserWithEmailAndPassword
} from 'firebase/auth'
import React, { useContext, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import { auth } from '../firebase'

const Signup = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const alreadySignedIn = useContext(AuthContext) !== null
    if (alreadySignedIn) {
        return <Navigate to='/' />
    }


    const createUser = async (email: string, password: string) => {
        try {
            await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );
        } catch (error) {
            console.error(error);
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setError('')
        try {
            await createUser(email, password)
        } catch (e: any) {
            setError(e.message)
            console.log(e.message)
        }
    }

    return (
        <div className='max-w-[700px] mx-auto my-16 p-4'>
            <div>
                <h1 className='text-2xl font-bold py-2'>Sign in to your account</h1>
                <p className='py-2'>
                    Already have an account yet ? <Link to='/login' className='underline'>Sign in</Link>
                </p>
            </div>
            <form onSubmit={handleSubmit}>
                <div className='flex flex-col py-2'>
                    <label className='py-2 font-medium' htmlFor="">Email Address</label>
                    <input onChange={(e) => setEmail(e.target.value)} className='border p-3' type="email" />
                </div>
                <div className='flex flex-col py-2'>
                    <label className='py-2 font-medium' htmlFor="">Password</label>
                    <input onChange={(e) => setPassword(e.target.value)} className='border p-3' type="password" />
                </div>
                <button className='border border-blue-500 bg-blue-600 hover:bg-blue500 w-full p-4 my-2 text-white'>Sign Up</button>

            </form>

        </div>
    )
}

export default Signup