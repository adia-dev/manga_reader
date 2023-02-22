import { signInWithEmailAndPassword } from 'firebase/auth'
import React, { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { auth } from '../firebase'


type SigninProps = {
    accountSectionOpened: boolean,
    setAccountSectionOpened: React.Dispatch<React.SetStateAction<boolean>>
}


const Signin = ({ accountSectionOpened, setAccountSectionOpened }: SigninProps) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const navigate = useNavigate();



    const signIn = async (email: string, password: string) => {
        try {
            await signInWithEmailAndPassword(
                auth,
                email,
                password
            );
        } catch (error: any) {
            setError("Your email or password is incorrect")
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setError('')
        try {
            await signIn(email, password)
            console.log("passe par la aussi ")
            navigate("/")
        } catch (error: any) {
            setError(error.message)
        }
    }


    return (
        <div  className='w-screen p-6 bg-dark-primary'>
            <div className='flex h-screen bg-gray-100  border rounded-xl border-dark-primary'>
                <div className=' w-1/2 my-auto bg-gray-100 '>
                    <form onSubmit={handleSubmit} className='bg-gray-100 max-w-md mx-auto'>
                        <h2 className='text-black text-4xl decoration-4'>Welcome back</h2>
                        <p className='text-gray-400 mt-2'>Welcome back! Please enter your details.</p>
                        <p className='text-red-600 mt-2'>{error}</p>
                        <div className='flex flex-col mt-5'>
                            <label htmlFor="">Email</label>
                            <input placeholder='Enter your email' onChange={(e) => setEmail(e.target.value)} className='border-gray-300 rounded-md border-2 p-3 bg-gray-100 mt-2' type="email" />
                        </div>
                        <div className='flex flex-col mt-5'>
                            <label htmlFor="">Password</label>
                            <input placeholder='Enter your password' onChange={(e) => setPassword(e.target.value)} className='border-gray-300 rounded-md border-2 p-3 bg-gray-100 mt-2' type="password" />
                        </div>
                        <div className='flex flex-col'>
                            <button className='mp-auto my-4 py-3 rounded-md bg-dark-tertiary text-gray-100'>Sign In</button>
                        </div>
                        <p className='pt-3 text-center text-gray-500'>Don't have an account ? <Link to='/signup' className='underline text-dark-tertiary'>Sign up</Link></p>
                    </form>
                </div>
                <div className='flex-auto w-1/2 bg-yellow-400' 
                    style={{
                    backgroundImage: 'url(https://preview.redd.it/z6btu437zgi91.jpg?auto=webp&s=e633b3c45ce542ab88661d0e23db201d00a1b803)', 
                    backgroundSize: 'cover',
                    backgroundPosition: '45% 20%',
                    backgroundRepeat: 'no-repeat'}}/>
            </div>
        </div>
    )
}

export default Signin