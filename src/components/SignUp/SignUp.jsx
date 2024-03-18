import React, { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import authService from '../../appwrite/auth'
import {login} from '../../store/authSlice'
import {Logo, Button, InputButton} from '../index'
import {useForm} from 'react-hook-form'
import './SignUp.css'

function SignUp() {
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const dispatch = useDispatch();
    const {register, handleSubmit} = useForm();

    const create = async(data)=>{
        setError(" ")
        try {
            console.log("SignUp data"+data)
            const createUser = await authService.createAccount(data);
            if(createUser){
                const userInfo = await authService.getCurrentUser();
                if(userInfo){
                    dispatch(login(userInfo));
                    navigate('/')
                }
            }
        } catch (error) {
            setError(error.message)
            console.log(error)
        }
    }

  return (
    <div className='SignupComponent'>
        <div className='formContainer'>
            <div >
                <Logo width='100px'/>
            </div>
            <div>
            <div>
                <h2>SignUp to create an account</h2>
                    <p>
                        Already have an Account?
                        <Link to="/signin" className='signin'>
                        SignIn
                        </Link>
                    </p>
            </div>
            <div className="line"></div>

                {error && <p>{error}</p>}

                <form onSubmit={handleSubmit(create)}>

                    <div>
                        <InputButton
                        label="Name: "
                        placeholder="Enter full name"
                        type="text"
                        className="Name"
                        {...register("name",{
                            required: true
                        })}
                        />

                        <InputButton
                        label="Email: "
                        placeholder="Enter Email"
                        type="email"
                        className="Email"
                        {...register("email",{
                            required: true,
                            validate: {
                                matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                "Email address must be a valid address",
                            }
                        })}

                        />

                        <InputButton
                        label="Password: "
                        placeholder="Enter password"
                        type="password"
                        className="Password"
                        {...register("password",{
                            required: true
                        })}
                        />

                        <Button type="submit">
                            Sign Up
                        </Button>
                    </div>

                </form>
                
                
            </div>
        </div>
    </div>
  )
}

export default SignUp