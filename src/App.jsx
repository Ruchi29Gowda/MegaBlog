import { useEffect, useState } from 'react'
import './App.css'
import { Header, Footer } from './components'
import { useDispatch } from 'react-redux';
import authService from './appwrite/auth';
import { login, logout } from './store/authSlice';
import { Outlet } from 'react-router-dom';


function App() {

  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();


  useEffect(()=>{
    authService.getCurrentUser()
    .then((userInfo)=>{
      if(userInfo){
        dispatch(login({userInfo}))
      }
      else{
        dispatch(logout());
      }
    })
    .finally(()=>setLoading(false));

  },[])

  if(!loading){
    return (
      <>
       <Header/>
       <Outlet/>
       <Footer/>
      </>
    )
  }
  else{
    return null;
  }
  
}

export default App
