import { useContext } from 'react'
import FeaturedMangas from '../components/FeaturedMangas'
import Row from '../components/Row'
import { AuthContext } from '../context/AuthContext'

type Props = {}

const Homepage = (props: Props) => {

    const user = useContext(AuthContext)

    console.log(user)

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