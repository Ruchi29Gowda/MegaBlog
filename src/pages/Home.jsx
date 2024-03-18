import React, { useEffect, useState } from 'react'
import {Container, PostCard} from '../components'
import service from '../appwrite/config'
import { useSelector } from 'react-redux'
import "./Home.css"

function Home() {
    const userInfo = useSelector((state)=>state.auth.userInfo);
    const [posts, setPosts] = useState([]);

    useEffect(()=>{
        service.getpost()
        .then((posts)=>{
            if(posts){
                setPosts(posts.documents)
            }
        })
        .catch((error)=>{
            console.log(error)
        })
    },[])

    if(!userInfo){
        return(
            <div className='Homecontainer'>
                <Container>
                    <div style={{
                        display:"flex",
                        flexDirection:"column",
                        justifyContent:"centre",
                        alignItems:"center"
                    }}>
                    <h1 style={{width:"max-content",  fontSize:"40px"}}>Login</h1>
                    <h1 style={{width:"max-content", fontSize:"60px"}}> & </h1>
                    <h1 style={{width:"max-content", fontSize:"40px"}}> Start Posting your Blogs </h1>
                    </div>
                </Container>
            </div>
        )
    }

    else{
        return(
            <>
                <div style={{ paddingLeft:"10%", paddingRight:"10%"}}>
                    <div className='title'>
                        <h1 style={{color: "white"}}>Start Exploring</h1>
                        <h3 style={{color:'white'}}>Chcek out other people's Blogs</h3>
                    </div>
                </div>
                <div className='HomePost'>
                    <Container>
                        
                    
                        <div className='multiplePost'>
                            {posts.map((post)=>(
                                <div key={post.$id} className='white'>
                                    <PostCard {...post}/>
                                </div>
                            ))}
                        </div>
                    </Container>
                </div>
            </>
        )
    }
    

}

export default Home