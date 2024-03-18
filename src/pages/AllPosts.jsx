import React, { useEffect, useState } from 'react'
import {Container, PostCard} from '../components'
import service from '../appwrite/config'

function AllPosts() {
    const [posts, setPosts] = useState([]);
    useEffect(()=>{
        service.getpost([])
        .then((posts)=>{
        if(posts){
            setPosts(posts.documents)
        }
    })
    },[])
  return (
    <div>
        <Container>
            <div>
                {posts.map((post)=>{
                    <div key={post.$id}>
                        <PostCard {...post}/>
                    </div>
                })}
            </div>
        </Container>
    </div>
  )
}

export default AllPosts