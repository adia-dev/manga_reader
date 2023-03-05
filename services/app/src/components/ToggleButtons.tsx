import React from 'react'


type Props = {
    list: string[];
    activeSection: string;
    setActiveSection: React.Dispatch<React.SetStateAction<string>>;
  }

const ToggleButtons = ({list, activeSection, setActiveSection}: Props) => {
  
    const handleToggleActive = (item: string) => {

    }
  
    return (
        <div className='ml-44 mt-8 bg-slate-800 w-fit p-1 flex space-x-1 rounded-lg'>
            {list.map((item, index) => (
                <button className='p-2 bg-slate-800 active:bg-dark-tertiary rounded-md text-white' onClick={() => setActiveSection(item)} key={index}>{item}</button>
            ))}
        </div>
  )
}

export default ToggleButtons