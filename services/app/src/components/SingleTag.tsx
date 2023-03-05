import React, { useEffect, useRef, useState } from 'react'
import { TiDeleteOutline } from "react-icons/ti"

interface Props{
    tag: string;
    key: number;
    tags: string[];
    setTags: React.Dispatch<React.SetStateAction<string[]>>;
}


const SingleTodo = ({tag, key, tags, setTags}: Props) => {

  const handleDelete = (txt: string) => {
    // Ne retourne que les todo de todos list qui ne fait pas retourné un vrai dans le filtre 
    setTags(
      tags.filter((tag)=>tag !== txt)
    )
  }

  return (
    <div key={key} className='border-2 w-fit p-1 rounded-md border-none bg-dark-tertiary flex items-center space-x-2' >
        <span className='todos_single--text' >{tag}  </span>
            
        <div>
            <span className="" onClick={() => handleDelete(tag)}><TiDeleteOutline /> </span>
        </div>
    </div>

  )
}

export default SingleTodo