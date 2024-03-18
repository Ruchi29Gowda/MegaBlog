import React from 'react'
import {Link} from 'react-router-dom'
import {LogoutButton, Logo, Container} from '../index'
import { useSelector} from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './Header.css'

function Header() {
  const authStatus = useSelector((state)=>state.auth.status);

  const navigate = useNavigate();

  const navItems = [
    {
      name: "Home",
      slug: "/",
      status: true
    },
    {
      name: "Login",
      slug: "/login",
      status: !authStatus
    },
    {
      name: "SignUp",
      slug: "/signup",
      status: !authStatus
    },
    {
      name: "Add Posts",
      slug: "/add-post",
      status: authStatus
    },
    {
      name: "Profile",
      slug: "/Profile",
      status: authStatus
    },
    
  ]
  return (
    <div  >
      <Container >
      <header >
        <nav className='headerContainer'>
          <div className='logoText'>
            <Link to='/'>
              <div style={{
                marginTop:"10px"
              }}>
                <Logo width="80px"/>
              </div>
            </Link>
            <h1 style={{marginTop:"10px", marginLeft:"1vmin"}}>PostPearl</h1>
          </div>
          
          <div className='divOfNav'>
            <ul className='navContainer'>

              {navItems.map((item)=>(item.status? (
                <li 
                  style={{listStyle: 'none'}}
                  key={item.name}>

                  <button className='btnHeader'
                    onClick={()=>navigate(item.slug)}
                  >
                    {item.name}
                  </button>

                </li>
              ) :null))}
            </ul>
            <div>
              {authStatus && 
                <li style={{listStyle: 'none'}}>
                   <LogoutButton/>
                </li>}
            </div>
          </div>
        </nav>
        <div className='hr'></div>
      </header>
      </Container>
    </div>
  )
}

export default Header