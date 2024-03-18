import React from 'react'
import service from '../../appwrite/config'
import {Link} from 'react-router-dom'


function PostCard({$id,featuredImage,title,}) {
  return (
    <div>
        <Link to={`/post/${$id}`}>
            <div style={{width: 'max-content',
            }}>

                <div>
                    
                    <img src={service.previewFile(featuredImage)} alt={title} 
                    style={{height:"300px", borderRadius:"20px"}}/>
                    
                </div>
                
            </div>
        </Link>
        <h2 style={{
          marginTop:'15px',
          color: "black", 
          fontFamily:"sans-serif" ,  
          textAlign:"center",
          padding:"5px",
          textDecoration:"none"
                      
        }}>

          {title}

        </h2>
    </div>
  )
}

export default PostCard