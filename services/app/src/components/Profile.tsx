import React, { useContext, useState } from 'react'
import { AiOutlineCheck } from 'react-icons/ai'
import { AuthContext } from '../context/AuthContext'
import InputTag from './InputTag'
import TagList from './TagList'
import ToggleButtons from './ToggleButtons'

interface Props {
  triggerHeaderClass?: boolean
}

const profile = (props: Props) => {

  const user = useContext(AuthContext)
  const listSection = ['Settings', 'Like'];
  const [tag, setTag] = useState<string>("");
  const [tags, setTags] = useState<string[]>([])
  const [bio, setBio] = useState<string>("Click to change your bio")
  const [bioEdit, setBioEdit] = useState<boolean>(false)
  const [userName, setUserName] = useState<string>("")
  const [email, setEmail] = useState<any>(user?.email)
  const [like, setLike] = useState<string[]>([])
  
  const [activeSection, setActiveSection] = useState(listSection[0])

  const handleAddTag = (e: React.FormEvent) => {
    e.preventDefault();

    if (tag){
      setTags([...tags, tag])
      setTag("");
    }
  };



  
  return (
    <div className='w-full h-fit pt-[90px]'>
      <div className='relative'>
        {/* Head image, image profile, name, description */}
        <img src={`https://i.ebayimg.com/images/g/K6kAAOSwCNBiCNWO/s-l1600.jpg`} alt="Banner" className='object-cover w-full h-80 '/>
        <div className='absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-b to-dark-primary  from-transparent'></div>
      </div>
      <div className='relative h-auto w-8/12  mx-auto'>
        <div>
          <img src={`https://pbs.twimg.com/media/Fl73bJKWYAAOzjE.jpg`} alt="profile_image" className='absolute w-40 h-40 rounded-full -top-16 border-2 border-dark-primary'  />
        </div>
        <p className='ml-44 text-4xl font-bold text-white py-3'>{user ? user.email : 'User name'}</p>
        {bioEdit ? (
          <div className='flex space-x-2'>
            <input className='ml-44 text-sm font-thin text-gray-300 border-2 rounded-lg bg-dark-primary h-7 w-9/12 p-2' type="text" value={bio} onChange={(e) => setBio(e.target.value)} />
            <button className='bg-dark-tertiary rounded-lg px-2 ' onClick={() => setBioEdit(false)}><AiOutlineCheck /></button>
          </div>
        ):(
          <p className='ml-44 text-sm font-thin text-gray-300 cursor-pointer' onClick={() => setBioEdit(true)}>{bio}</p>
        )}

        <ToggleButtons list={listSection} activeSection={activeSection} setActiveSection={setActiveSection} />

        {/* Settings */}
        {activeSection === listSection[0] &&
          <div className='m-5 p-4'>
            <div className='flex justify-between items-center border-b p-5 space-x-2 border-gray-700'>
              <label className='text-white'>Username</label>
              <input type="text" value={userName} onChange={(e) => setUserName(e.target.value) } className='border-2 border-gray-700 rounded-lg bg-dark-primary text-white outline-dark-tertiary w-3/4 h-9 placeholder:italic placeholder:text-slate-600 p-2' placeholder='Your Username' />
            </div>
            <div className='flex justify-between items-center border-b p-5 space-x-2 border-gray-700'>
              <label className='text-white'>Email</label>
              <input type="text" value={email} onChange={(e) => setEmail(e.target.value) } className='border-2 border-gray-700 rounded-lg bg-dark-primary text-white outline-dark-tertiary w-3/4 h-9 placeholder:italic placeholder:text-slate-600 p-2' placeholder='Your email'/>
            </div>
            <div className='flex justify-start items-center border-b p-5 space-x-52 border-gray-700'>
              <label className='text-white'>Gender</label>
              <div className='flex space-x-5'>
                <div className='space-x-2'>
                  <input id="male" className="peer/draft" type="radio" name="status" defaultChecked />
                  <label htmlFor="male" className="peer-checked/draft:text-sky-500 text-white">Male</label>
                </div>
                <div className='space-x-2'> 
                  <input id="female" className="peer/published" type="radio" name="status" />
                  <label htmlFor="female" className="peer-checked/published:text-sky-500 text-white">Female</label>
                </div>
              </div>

            </div>
            <div className='flex justify-between items-center p-5 space-x-2 border-gray-700'>
              <label className='text-white'>Liked Tags</label>
              <InputTag tag={tag} setTag={setTag} handleAddTag={handleAddTag}/>
            </div>
              <TagList tags={tags} setTags={setTags} />
          </div>
        }
        {/* Like */}
        {activeSection === listSection[1] &&
          <div>
            {like.length > 0 ? (
              // TODO: add list of likes
              <p className='text-gray-600 text-center mt-5 text-xl pb-52'>C'est pas vide </p>
            ):(
              <p className='text-gray-600 text-center mt-5 text-xl pb-52'>The list of likes is empty</p>
            )}
          </div>
        }

        
      </div>
      
        
    </div>
  )
}

export default profile