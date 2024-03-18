import React, { useEffect, useState } from 'react'
import {Container, PostForm } from '../components'
import { useNavigate, useParams } from 'react-router-dom'
import service from '../appwrite/config'

function EditPosts() {
    const {slug} = useParams();
    const navigate = useNavigate();
    const [posts, setPosts] = useState(null);

    useEffect(()=>{
        if(slug){
            service.getPost(slug)
            .then((post)=>{
                if(post){
                    setPosts(post)
                }
            })
        }
        else{
            navigate('/')
        }
    },[slug,navigate])

  return (
    <div>
        <Container>
            <PostForm post={posts}/>
        </Container>
    </div>
  )
}

export default EditPosts