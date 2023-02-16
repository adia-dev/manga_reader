import React, { useEffect, useState } from 'react'
import { AiOutlineQuestion } from 'react-icons/ai'
import { BiChevronRight } from 'react-icons/bi'

type Props = {}

const HelpBox = (props: Props) => {

    const [showHelp, setShowHelp] = useState(false)
    const [currentHelpLevel, setCurrentHelpLevel] = useState('base')

    const helpOptions = [
        {
            level: 'base',
            title: 'What is the carousel for',
            tooltip: 'This is a help box tooltip',
            icon: <AiOutlineQuestion className="text-gray-500" />,
            onClick: () => { }
        },
        {
            level: 'base',
            title: 'What actions can I do here',
            tooltip: 'This is a help box tooltip',
            icon: <AiOutlineQuestion className="text-gray-500" />,
            onClick: () => {
                setCurrentHelpLevel('base/actions')
            },
            children: [
                {
                    level: 'base/actions',
                    title: 'This is a help box',
                    tooltip: 'This is a help box tooltip',
                    icon: <AiOutlineQuestion className="text-gray-500" />,
                    onClick: () => {
                        console.log('clicked')
                    }
                }
            ]
        },
        {
            level: 'base',
            title: 'What are the keyboard and mouse controls',
            tooltip: 'This is a help box tooltip',
            icon: <AiOutlineQuestion className="text-gray-500" />,
            onClick: () => { },
            children: [
                {
                    level: 'base/controls',
                    title: 'This is a help box',
                    tooltip: 'This is a help box tooltip',
                    icon: <AiOutlineQuestion className="text-gray-500" />,
                    onClick: () => {
                        console.log('clicked')
                    }
                }
            ]
        },
    ]

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                setShowHelp(false)
            }
        }


        const handleClickOutside = (e: MouseEvent) => {
            const helpBox = document.getElementById('help-box')
            if (helpBox && !helpBox.contains(e.target as Node)) {
                setShowHelp(false)
            }
        }

        window.addEventListener('keydown', handleKeyDown)
        window.addEventListener('click', handleClickOutside)

        return () => {
            window.removeEventListener('keydown', handleKeyDown)
            window.removeEventListener('click', handleClickOutside)
        }
    }, [])

    return (
        <div className="" id="help-box">
            <div
                onClick={() => setShowHelp(!showHelp)}
                className="fixed bottom-5 right-5 bg-gray-100 z-[1000] hover:scale-110 transition-all duration-300 cursor-pointer p-1 w-12 h-12 flex items-center justify-center rounded-full shadow-lg"
            >
                <div className="w-full h-full bg-white transition duration-200 hover:bg-gray-300 rounded-full flex items-center justify-center">
                    <AiOutlineQuestion className="text-gray-500" />
                </div>
            </div>

            <div className="fixed bottom-20 right-5 bg-gray-50 p-2 rounded-lg shadow-lg"
                style={{
                    visibility: showHelp ? 'visible' : 'hidden',
                    transform: showHelp ? 'translateY(0)' : 'translateY(100%) scale(0)',
                    transformOrigin: 'bottom right',
                    transition: 'all 0.3s ease-in-out',
                    opacity: showHelp ? 1 : 0,
                    pointerEvents: showHelp ? 'all' : 'none',
                    zIndex: 1000,
                    minWidth: '300px',
                }}
            >
                <div className="text-gray-500">
                    <p className="text-lg font-bold">Need some help?</p>
                </div>
                {
                    helpOptions
                        .filter(option => option.level === currentHelpLevel)
                        .map((option, index) => (
                            <div
                                key={index}
                                onClick={option.onClick}
                                className="text-gray-500 mt-2 hover:bg-gray-200 transition duration-300 justify-between cursor-pointer rounded-md p-2 flex items-center"
                            >
                                <div className="flex items-center">
                                    <div className="w-6 h-6 flex items-center justify-center">
                                        {option.icon}
                                    </div>
                                    <span className="ml-2">{option.title}</span>
                                </div>
                                {
                                    option.children && option.children.length > 0 &&
                                    (
                                        <BiChevronRight className="text-gray-500 text-2xl" />
                                    )
                                }
                            </div>
                        ))
                }
            </div>
        </div>
    )
}

export default HelpBox