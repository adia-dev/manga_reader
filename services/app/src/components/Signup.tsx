import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from 'firebase/auth'
import { auth } from '../firebase'
import { AuthContext } from '../context/AuthContext'

const Signup = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confPassword, setConfPassword] = useState('')
    const [error, setError] = useState('')
    const navigate = useNavigate();


    const user = useContext(AuthContext)


    const createUser = async (email: string, password: string) => {
        try {
            return await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );
        } catch (error: any) {
            console.error(error)
            setError(error.message)
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setError('')
        if (email !== '' || password !== '' && password === confPassword){
            try {
                console.log(password, email)
                console.log("le truc", await createUser(email, password))
                // navigate('/')
            } catch (error: any) {
                console.log("C'ets normalement pas bon")

            }
        }else{
            setError('The information entered is not correct ')
        }

    }

    return (
        <div className='w-screen p-6 bg-dark-primary'>
            <div className='flex h-screen bg-gray-100 border rounded-xl border-dark-primary'>
                <div className='flex-auto w-1/2 bg-yellow-400' 
                    style={{
                    backgroundImage: 'url(https://i.pinimg.com/originals/df/aa/8e/dfaa8ebc002baefbd3b8b448723d76c9.png)', 
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat'}}/>
                <div className='w-1/2 my-auto bg-gray-100'>
                    <form onSubmit={handleSubmit} className='bg-gray-100 max-w-md mx-auto'>
                        <h2 className='text-black text-4xl decoration-4'>Welcome</h2>
                        <p className='text-gray-400 mt-2'>Je sais pas quoi écrire ici.</p>
                        <p className='text-red-600 mt-2'>{error}</p>
                        <div className='flex flex-col mt-5'>
                            <label htmlFor="">Email</label>
                            <input type="email" placeholder='Enter tour email' onChange={(e) => setEmail(e.target.value)} className='border-gray-300 rounded-md border-2 p-3 bg-gray-100 mt-2'  />
                        </div>
                        <div className='flex flex-col mt-5'>
                            <label htmlFor="">Choose password</label>
                            <input type="password" placeholder='Enter your password' onChange={(e) => setPassword(e.target.value)} className='border-gray-300 rounded-md border-2 p-3 bg-gray-100 mt-2'/>
                        </div>
                        <div className='flex flex-col mt-5'>
                            <label htmlFor="">Confirm password</label>
                            <input type="password" placeholder='Confirm your password' onChange={(e) => setConfPassword(e.target.value)} className='border-gray-300 rounded-md border-2 p-3 bg-gray-100 mt-2'/>
                        </div>
                        <div className='flex flex-col'>
                            <button className='mp-auto my-4 py-3 rounded-md bg-dark-tertiary text-gray-100'>Sign up</button>                      
                        </div>
                        <p className='pt-3 text-center text-gray-500'>Already have an account ? <Link to='/login' className='underline text-dark-tertiary'>Sign in</Link></p>
                    </form>
                </div>

            </div>
        </div>
    )



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