import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { UserAuth } from '../context/AuthContext'

const Signin = ({accountSectionOpened, setAccountSectionOpened}) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const {signIn} = UserAuth();

    const handleSubmit = async(e) => {
        e.preventDefault()
        setError('')
        try{
            await signIn(email, password)
            // Changé la redirection en reaffichage 
        } catch(e) {
            setError(e.message)
        }
    }


    return (
        <div className='max-w-[700px] mx-auto my-3 p-4'>
            <p className='text-red-600 '>{error}</p>
            <form onSubmit={handleSubmit}>
                <div className='flex items-end gap-4'>
                    <div className='flex flex-col py-2'>
                        <label className='py-2 font-medium' htmlFor="">Email Address</label>
                        <input onChange={(e) => setEmail(e.target.value) } className='border p-3' type="emial" />
                    </div>
                    <div className='flex flex-col py-2'>
                        <label className='py-2 font-medium' htmlFor="">Password</label>
                        <input onChange={(e) => setPassword(e.target.value )} className='border p-3' type="password" />
                    </div>
                    <button className='border border-blue-500 bg-blue-600 hover:bg-blue500 w-full p-3 my-2 text-white'>Sign In</button>
                </div>
            </form>
            <p className='py-2'>
            {/* TODO: Ne pas faire de redirection mais faire une popup */}
                Dont have an account yet ? <Link to='/' className='underline'>Sign up</Link>
            </p>
        </div>
    )
}

export default Signin