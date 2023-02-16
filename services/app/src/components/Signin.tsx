import { signInWithEmailAndPassword } from 'firebase/auth'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { auth } from '../firebase'


type SigninProps = {
    accountSectionOpened: boolean,
    setAccountSectionOpened: React.Dispatch<React.SetStateAction<boolean>>
}


const Signin = ({ accountSectionOpened, setAccountSectionOpened }: SigninProps) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')



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
        } catch (e: any) {
            setError(e.message)
        }
    }


    return (
        <div  className='w-screen p-6 bg-dark-primary'>
            <div className='flex h-screen bg-gray-100  border rounded-xl border-dark-primary'>
                <div className=' w-1/2 my-auto bg-gray-100 '>
                    <p className='text-red-600 '>{error}</p>
                    {/* La partie gauche */}
                    <form action="" className='bg-gray-100 max-w-md mx-auto'>
                        <h2 className='text-black text-4xl decoration-4'>Welcome back</h2>
                        <p className='text-gray-400 mt-2'>Welcome back! Please enter your details.</p>
                        <div className='flex flex-col mt-5'>
                            <label htmlFor="">Email</label>
                            <input placeholder='Enter your email' onChange={(e) => setEmail(e.target.value)} className='border-gray-300 rounded-md border-2 p-3 bg-gray-100 mt-2' type="emial" />
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
                <image className='flex-auto w-1/2 bg-yellow-400' 
                    style={{
                    backgroundImage: 'url(https://preview.redd.it/z6btu437zgi91.jpg?auto=webp&s=e633b3c45ce542ab88661d0e23db201d00a1b803)', 
                    backgroundSize: 'cover',
                    backgroundPosition: '45% 20%',
                    backgroundRepeat: 'no-repeat'}}/>
            </div>
        </div>
        
    )


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