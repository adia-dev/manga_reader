import React from 'react'
import Header from '../components/Header'
import FeaturedMangas from '../components/FeaturedMangas'

type Props = {}

const Homepage = (props: Props) => {
    return (
        <div className='w-full h-full pt-[90px]'>
            <FeaturedMangas />
        </div>
    )
}

export default Homepage