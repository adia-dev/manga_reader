import React from 'react'
import Header from '../components/Header'
import FeaturedMangas from '../components/FeaturedMangas'
import Row from '../components/Row'

type Props = {}

const Homepage = (props: Props) => {
    return (
        <div className='w-full h-full pt-[90px]'
            data-testid='homepage'
        >
            <FeaturedMangas />
            <Row name="Featured Mangas" />
            <Row name="Trending Mangas" />
            <Row name="Followed Mangas" />
            <Row name="Discover" />
        </div>
    )
}

export default Homepage