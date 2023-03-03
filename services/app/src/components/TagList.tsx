import React from 'react';
import SingleTag from './SingleTag';

interface Props{
    tags: string[];
    setTags: React.Dispatch<React.SetStateAction<string[]>>;
}

const TagList: React.FC<Props> = ({tags, setTags}: Props) => {
  return (
    <div className='flex flex-nowrap place-content-around h-fit space-x-2 overflow-x-scroll '>
        {tags.map((tag, index) => (
            <SingleTag tag={tag} key={index} tags={tags} setTags={setTags}/> 
        ))}
    </div>
  )
}

export default TagList