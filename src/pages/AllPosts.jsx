import React, { useState } from 'react'
import { Container,PostCard } from '../components'
import appwriteServices from '../appwrite/config'
function AllPosts() {
    const [posts,setPost]=useState([])
    useState(()=>{},[])
    appwriteServices.getPosts([]).then((posts)=>{
        if(posts)
        {setPost(posts.documents)}
    
    })
  return (
    <div className='w-full py-8'>
        <Container>
            <div className='flex flex-warp'>
                {posts.map((post)=>{
                <div key={post.$id} className='p-2 w-1/4'>
                     <PostCard  post={post}/>
                </div>
            })}
            </div>
        </Container>
    </div>
  )
}

export default AllPosts