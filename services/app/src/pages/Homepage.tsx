import { useContext } from 'react'
import FeaturedMangas from '../components/FeaturedMangas'
import Row from '../components/Row'
import MangaFetch from '../components/MangaFetch'
import { AuthContext } from '../context/AuthContext'

type Props = {}

const Homepage = (props: Props) => {

    const user = useContext(AuthContext)

    return (
        <div className='w-full h-full pt-[90px]'
            data-testid='homepage'
        >

            <FeaturedMangas />
            <Row name="Most Viewed Mangas" fetchUrl='https://api.mangadex.org/manga?order[followedCount]=desc&limit=20&includes[]=cover_art&contentRating[]=safe&hasAvailableChapters=true'/>
            <Row name="Recently Created Mangas" fetchUrl='https://api.mangadex.org/manga?order[createdAt]=desc&limit=20&includes[]=cover_art&contentRating[]=safe&hasAvailableChapters=true'/>
            <Row name="Recently Updated Mangas" fetchUrl='https://api.mangadex.org/manga?order[updatedAt]=desc&limit=20&includes[]=cover_art&contentRating[]=safe&hasAvailableChapters=true'/>
            <Row name="Recently Published Mangas" fetchUrl='https://api.mangadex.org/manga?order[publishAt]=desc&limit=20&includes[]=cover_art&contentRating[]=safe&hasAvailableChapters=true'/>
        </div>
    )
}

export default Homepage