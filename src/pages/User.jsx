import React, { useEffect, useState } from 'react'
import {useSelector} from 'react-redux'
import service from '../appwrite/config';
import './User.css'
import {Container, PostCard} from '../components'



function User() {
    const [posts, setPosts]=useState([]);
    const userInfo = useSelector((state)=>state.auth.userInfo);
    let name = userInfo.name;
    let userId = userInfo.$id;
    let Username = name.toUpperCase();

    useEffect(()=>{
        service.getMyPost({userId})
        .then((posts)=>{
            if(posts){
                setPosts(posts.documents);
                console.log(posts)
                console.log(userId);
            }
        })
        .catch((error)=>{
            console.log(error)
        })
    },[])



    if(userInfo){         
        return (
            <div>
                <Container>
                <div className='cont'>
                    <h3 style={{
                        fontFamily:"Segoe UI",
                        color:"#7209B7",
                        marginLeft: "10%",
                        marginTop: "30px",
                        fontSize: "20px"
                    }}>
                        Welcome! {Username}

                    </h3>

                
                    <div className="profile">
                        <span className="val">
                        UserName: {userInfo.name}
                        </span>

                        <span className="val">
                        Joined at : {userInfo.$createdAt}
                        </span>

                        <span className="val">
                        Id : {userInfo.$id}
                        </span>

                    </div>
                
                </div>

                {
                    posts? (
                        <section className='singlePost'>
                            <span style={{
                                paddingTop:"10px",
                                color:"#7209B7",
                                fontFamily:"Segoe UI",
                                fontWeight:"bolder",
                                fontSize:"30px"
                            }}>My Posts</span>
                            <div className='profilePosts'>
                                {
                                    posts.map((post)=>(
                                        <div key={post.$id} className='whitebg'>
                                            <PostCard {...post}/>
                                        </div>
                                    ))
                                }

                                
                            </div>
                        </section>
                    ) : 
                        (<section className='singlePost'>
                            <h2 style={{
                                color:"violet"
                            }}>
                                No posts Yet
                            </h2>
                        </section>)
                    
                }

                
                </Container>
            </div>
            
        )
    }
    else{
        return (
            <div>
                
            </div>
        )

    }
}

export default User