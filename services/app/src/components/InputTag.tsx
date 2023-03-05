import { useRef } from 'react';

interface Props{
    tag: string;
    setTag: React.Dispatch<React.SetStateAction<string>>;
    handleAddTag:(e: React.FormEvent) => void;

}

const InputTag = ({tag, setTag, handleAddTag}: Props) => {


  return (
    <form className=' w-3/4 h-9' onSubmit={(e) => { handleAddTag(e)}}>
        <input value={tag} onChange={(e)=>setTag(e.target.value)} type="input" className='border-2 border-gray-700 rounded-lg bg-dark-primary text-white w-full h-9 outline-dark-tertiary placeholder:italic placeholder:text-slate-600 p-2' placeholder='Add your favorite tags'/>
    </form>
  )
}

export default InputTag