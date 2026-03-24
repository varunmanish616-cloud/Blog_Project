import React from 'react'
import appwriteService from '../appwrite/config'
import {Link} from 'react-router-dom'
function PostCard({
    $id,title,featuredImage
}) {
  console.log(appwriteService.getFilePreview(featuredImage))
  return (
    <Link to={`/post/${$id}`}>
    <div className='w-full bg-gray-100 rounded-xl p-4'>
        <div className='w-full justify-center mb-4'>
            <img src={appwriteService.getFilePreview(featuredImage).toString()} alt="title" className='rounded-xl'/>
        </div>
        <h1 className='text-xl font-bold'>{title}</h1>
    </div>
    </Link>
  )
}

export default PostCard