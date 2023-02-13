import React from 'react'

const Manga = ({ manga }) => {
    return (
        <div className="w-9/12 mx-auto h-full border-x">
            <div className="">
                <div className="flex items-start space-x-2 p-5 bg-gray-600 relative">
                    <div className="absolute w-full h-full top-0 left-0 blur-sm"
                        style={{
                            backgroundImage: `url(${manga.cover})`,
                            backgroundSize: "cover",
                            backgroundPosition: "50% 22%",
                            backgroundRepeat: "no-repeat",
                            backgroundBlendMode: "multiply",
                            backgroundColor: "rgba(0, 0, 0, 0.5)",
                            // blur effect
                            backdropFilter: "blur(10px)",
                        }}
                    ></div>
                    <img
                        className="absolute z-20 mx-10 w-44 aspect-[1/1.5] rounded-md shadow-md"
                        src={manga.cover}
                        alt={manga.title}
                    />
                    <div className="relative flex flex-col h-52 justify-between pl-52 w-full text-white">
                        <div className="z-1O ">
                            <h1 className="text-5xl font-bold">{manga.title}</h1>
                            <h3 className="font-semibold text-sm">{manga.description || "Le petit ours[...]"}</h3>
                        </div>
                        <p>Gege Akutami</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Manga