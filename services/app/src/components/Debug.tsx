import React, { useEffect } from 'react'

type Props = {}

const Debug = (props: Props) => {

    // Count the number of components rendered in the app
    const [components, setComponents] = React.useState<string[]>([]);




    return (
        <div className='absolute bottom-5 right-5 w-48 aspect-square bg-white rounded-xl p-3 z-50 shadow-xl'>
            {
                components.map((component) => {
                    return <div key={component} className='text-xs text-gray-600'>{component}</div>
                })
            }
        </div>
    )
}

export default Debug