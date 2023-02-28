import FeaturedMangas from '../components/FeaturedMangas'
import Row from '../components/Row'

type Props = {}

const Homepage = (props: Props) => {

    const rows = [
        {
            name: "Most Viewed Mangas",
            order: 'followedCount'
        },
        {
            name: "Recently Created Mangas",
            order: 'createdAt'
        },
        {
            name: "Recently Updated Mangas",
            order: 'updatedAt'
        },
        {
            name: "Recently Published Mangas",
            order: 'publishAt'
        }
    ]


    return (
        <div className='w-full h-full pt-[90px]'
            data-testid='homepage'
        >

            <FeaturedMangas />
            {
                rows.map((row) => (
                    <Row
                        key={row.name}
                        name={row.name}
                        order={row.order}
                    />
                ))
            }
        </div>
    )
}

export default Homepage