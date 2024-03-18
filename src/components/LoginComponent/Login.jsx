import React, { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {login as authLogin} from '../../store/authSlice'
import {Button, InputButton, Logo} from '../index'
import authService from '../../appwrite/auth'
import { useDispatch } from 'react-redux'
import {useForm} from 'react-hook-form'
import './Login.css'

function Login() {
    const [error, setError]= useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {register, handleSubmit} = useForm();

    const loginsignup = async(data)=>{
        console.log('ok entererd login')
        setError("");

        try {
            const session = await authService.login(data);
            if(session){
                const userInfo = await authService.getCurrentUser();
                console.log(userInfo)

                if(userInfo){
                    dispatch(authLogin({userInfo}));
                }
                else{
                    console.log('unable to login');
                    navigate("/");
                }
            }
        } catch (error) {
            setError(error.message);
            console.log(error)
        }
    }


  return (
    <div className='mainLoginContainer'>
        <div className='formContainer'>
            <div>
                <span>
                    <Logo width='100px'/>
                </span>
            </div>
            <div>
                <h2>
                    SignIn to make Your account
                </h2>
                <p>
                    Don&apos;t have an account?? &nbsp;
                    <Link to="/signup">
                    Sign Up
                    </Link>
                </p>

                {error && <p>{error}</p>}
                <div className="line"></div>
                <form onSubmit={handleSubmit(loginsignup)}>
                    <div className='inputField'>
                        <div>


                            <InputButton
                            label="Email: "
                            type="email"
                            className="email"
                            placeholder="Enter your email"
                            {...register("email",{
                                required: true,
                                validate: {
                                    matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                    "Email address must be a valid address",
                                }
                            })}
                            />


                        </div>



                        <div>
                            <InputButton
                            label="Password: "
                            type="password"
                            placeholder="Enter password"
                            {...register("password", {
                                required: true,
                            })}
                            />
                        </div>

                        
                    </div>
                    <Button type="submit">
                            Sign in
                    </Button>
                </form>
            </div>
        </div>
    </div>
  )
}

export default Login