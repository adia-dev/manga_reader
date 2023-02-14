import React from 'react'
import { UserAuth } from '../context/AuthContext'
import Signin from './Signin';
import Account from './Account';

const AccountBar = ({accountBarOpened, setaccountBarOpened}) => {

    const {user} = UserAuth();

    // return (
    //     <div>
    //         {!user ? (<Signin accountBarOpened={accountBarOpened} setaccountBarOpened={setaccountBarOpened} /> ) : (<Account />)}
    //     </div>
    // )
}

export default AccountBar