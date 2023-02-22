import { useContext } from 'react'
import FeaturedMangas from '../components/FeaturedMangas'
import Row from '../components/Row'
import { AuthContext } from '../context/AuthContext'

type Props = {}

const Homepage = (props: Props) => {

    const user = useContext(AuthContext)

    return (
        <div className='w-full h-full pt-[90px]'
            data-testid='homepage'
        >

            <FeaturedMangas />
            <Row name="Most Viewed Mangas" order='followedCount' />
            <Row name="Recently Created Mangas" order='createdAt' />
            <Row name="Recently Updated Mangas" order='updatedAt' />
            <Row name="Recently Published Mangas" order='publishAt' />
        </div>
    )
}

export default Homepage