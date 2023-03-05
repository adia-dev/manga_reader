import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { Navigate, Outlet } from 'react-router-dom'

type Props = {}

const PrivateRoute = (props: Props) => {

    const user = useContext(AuthContext)

    return (
        <>
            {user ? <Outlet /> : <Navigate to='/login' />}
        </>
    )

}

export default PrivateRoute