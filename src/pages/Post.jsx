import React, { useEffect, useState } from 'react'
import {useNavigate, useParams, Link} from 'react-router-dom'
import {useSelector} from 'react-redux'
import service from '../appwrite/config'
import {Container, Button} from '../components'
import parse from "html-react-parser";
import './Post.css'

function Post() {
  const navigate = useNavigate();
  const userInfo = useSelector((state)=> state.auth.userInfo);
  
  const {slug} = useParams();

  const [post, setPost] = useState(null);

  const isAuthor = post && userInfo? post.userId === userInfo.$id : false ;

  
  useEffect(()=>{
    if(slug){
      service.getPost(slug)
      .then((post)=>{
        if(post){
          setPost(post);
        }
        else{
          navigate('/');
        }
      })
    }
    else{
      navigate('/')
    }
  },[slug, navigate])

  const deletePosts =()=>{
    service.deletePost(post.$id)
    .then((status)=>{
      if(status){
        service.deleteFile(post.featuredImage);
        navigate('/')
      }
    })
  }




  return post? (
    <div style={{
    }} className='postsContainer'>
      <Container>
        <div className='mainPostContainer'>
          
          <section className='image' >
            
            <img src={service.previewFile(post.featuredImage)} alt={post.title} 
            style={{
              height:"400px",
              borderRadius:"10px"
              
            }}
            />
          </section>

          <section className='btnDiv' style={{
           textAlign:"center"
          }}>
            <div>
              <h1>UserId: {post.userId}</h1>
            </div>
            
            <div>
                 <h1>{post.title}</h1>
            </div>

            <div>
              {parse(post.content)}
            </div>

            
          </section>



         {
            isAuthor && (<div className='btnDiv'>

            <Link to={`/edit-posts/${post.$id}`}>
              <Button>
                Edit
              </Button>
            </Link>

            <Button onClick={deletePosts} >
              Delete
            </Button>
            </div>)
        }

        </div>

        

      </Container>
    </div>
  ): null ;
}

export default Post