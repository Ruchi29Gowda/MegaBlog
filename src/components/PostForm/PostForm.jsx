import React, { useEffect } from 'react'
import { useCallback } from 'react'
import {Button, InputButton, Select, RTE} from '../index'
import service from '../../appwrite/config'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import './PostForm.css'


function PostForm({post}) {

    const {register, handleSubmit, watch, setValue, control, getValues}= useForm({
        defaultValues:{
            title: post?.title || '',
            slug: post?.slug || '',
            content: post?.content || '',
            status: post?.status || "active",
        }
    });

    const navigate = useNavigate();
    
    const userInfo = useSelector(state => state.auth.userInfo);

    const submit = async(data)=>{
        if(post){
            const file = data.image[0]? service.uploadFile(data.image[0]) :null;
            
            if(file){
                service.deleteFile(post.featuredImage)
            }

            const dbPost = await service.updatePost(post.$id, {
                ...data,
                featuredImage: file? file.$id : undefined
            });

            if(dbPost){
                navigate(`/post/${dbPost.$id}`);
            }
        }
        else{
            const file = await service.uploadFile(data.image[0]);

            if(file){
                const fileId = file.$id;
                data.featuredImage = fileId;
                console.log(userInfo)

                const dbPost = await service.createPost({ ...data, userId: userInfo.$id });

                if(dbPost){
                    navigate(`/post/${dbPost.$id}`)
                }
            }
        }

    }

    const slugTransform = useCallback((value)=>{
        if(value && typeof value =='string'){
            return value
            .trim()
            .toLowerCase()
            .replace(/[^a-zA-Z\d\s]+/g, "-")
            .replace(/\s/g, "-")

        }
        else{
            return "";
        }
    },[]);

    useEffect(()=>{
        const subscription = watch((value, {name})=>{
            if(name==="title"){
                setValue(
                        "slug", 
                        slugTransform(value.title),{shouldValidate: true}
                        )
            }
            
        });

        return ()=>{
            subscription.unsubscribe();
        }
    }, [watch,  slugTransform, setValue])


  return (
    <div>
        <form onSubmit={handleSubmit(submit)} className='postForm'>
            
                <div className='div1'>

                    <InputButton
                    label= 'Title: '
                    type="text"
                    placeholder='Enter title'
                    className="postform-inpts inpt"
                    {...register(
                        'title',{
                            required: true
                        }
                    )}
                    />

                    <InputButton
                    label= 'Slug: '
                    placeholder="SLug"
                    className='postform-inpts inpt'
                    {...register(
                        'slug',{
                            required: true
                        }
                    )}
                    onInput={(e)=>{
                        setValue('slug',slugTransform(e.currentTarget.value),{
                            shouldValidate: true
                        })
                    }}
                    />

                    <RTE
                    label="Caption: "
                    name="content"
                    control={control}
                    defaultValue={getValues("content")}
                    />

                </div>

                <div className="div2">
                    <section >
                        <InputButton
                        label='Featured Image: '
                        type='file'
                        className="inptImg"

                        accept='image/png, image/jpeg, image/gif'
                        {...register('image', {
                            required: !post
                        })}
                        />
                    </section>

                    {post && (
                        <div>
                            <img src={service.previewFile(post.featuredImage)} alt={post.title} 
                            
                            style={{
                                width:"90%",
                                marginTop:"20px",
                                borderRadius:'10px',

                            }}
                            />
                        </div>
                    )}

                    <Select
                    options={['active', 'inactive']}
                    label='Status: '
                    className='select'
                    {...register('status',{
                        required: true
                    })}
                    />

                    <Button
                    type='submit'
                    className='submitBtn'
                    >
                        {post? "Update": "Submit"}
                    </Button>
                </div>

        </form>
    </div>
  )
}

export default PostForm