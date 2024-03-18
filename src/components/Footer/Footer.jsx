import React from 'react'
import './Footer.css'
import insta from'./insta.png'
import facebook from './facebook (1).png'
import gmail from './gmail.png'
import linkedin from './linkedin.png'

function Footer() {
  return (
    <div id="footer">
        <div className='container'>

          <span className='txt'>
            Contact us for more information
          </span>

          <span className='txt1'>
            The successful free to play games are selling positive emotions. Not content.
          </span>
            
            <div className="icons">
              
                <div className="images">
                  <img src={insta}alt="insta" height="100%" className='insta'/>
                </div>

                <div className="line1"></div>

                <div className="images">
                  <img src={facebook} alt="" height="100%" />
                </div>

                <div className="line1"></div>

                <div className="images">
                  <img src={linkedin} alt="" height="100%"/>
                </div>

                <div className="line1"></div>

                <div className="images">
                  <img src={gmail} alt="" height="110%"/>
                </div>
            </div>


            
            <span>Copyright © 2023 PlayFair, Inc.</span>
            <ul>
                <li>privacy policy</li>
                <li>|</li>
                <li>security</li>
                <li>|</li>
                <li>cookies</li>
                
            </ul>
        </div>
    </div>
  )
}

export default Footer