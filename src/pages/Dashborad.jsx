import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom';

function Dashborad() {

    const {loading: authLoding} = useSelector( (state) => state.auth );
    const {loading: profileLoding} = useSelector( (state) => state.profile );

    if(authLoding || profileLoding) {
        return(
            <div className=' h-[88vh] text-white flex justify-center ' >
                <div className='loader' />
            </div>
        )
    }

    return (
        <div className=' relative flex min-h-[clac(100vh - 3.5rem)] ' >
            <Slidebar/>
            <div className='h-[clac(100vh - 3.5rem)] overflow-auto' >
                <div className=' mx-auto w-11/12 max-w-[100px] py-10 ' >
                    <Outlet/>
                </div>
            </div>
        </div>        
    )
}

export default Dashborad