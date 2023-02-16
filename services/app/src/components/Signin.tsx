import { signInWithEmailAndPassword } from 'firebase/auth'
import React, { useContext, useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import { auth } from '../firebase'


type SigninProps = {
    accountSectionOpened: boolean,
    setAccountSectionOpened: React.Dispatch<React.SetStateAction<boolean>>
}


const Signin = ({ accountSectionOpened, setAccountSectionOpened }: SigninProps) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const navigate = useNavigate()

    const alreadySignedIn = useContext(AuthContext) !== null
    if (alreadySignedIn) {
        return <Navigate to='/' />
    }


    const signIn = async (email: string, password: string) => {
        try {
            await signInWithEmailAndPassword(
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
            await signIn(email, password)
            // Changé la redirection en reaffichage 
            navigate('/')
        } catch (e: any) {
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
                        <input onChange={(e) => setEmail(e.target.value)} className='border p-3' type="emial" />
                    </div>
                    <div className='flex flex-col py-2'>
                        <label className='py-2 font-medium' htmlFor="">Password</label>
                        <input onChange={(e) => setPassword(e.target.value)} className='border p-3' type="password" />
                    </div>
                    <button className='border border-blue-500 bg-blue-600 hover:bg-blue500 w-full p-3 my-2 text-white'>Sign In</button>
                </div>
            </form>
            <p className='py-2'>
                {/* TODO: Ne pas faire de redirection mais faire une popup */}
                Dont have an account yet ? <Link to='/signup' className='underline'>Sign up</Link>
            </p>
        </div>
    )
}

export default Signin