import React, { useContext } from 'react'
import {Link} from 'react-router-dom'
import logo from '../images/logo.jpg'
import { useNavigate } from 'react-router-dom'
import { auth } from '../config/Config'
import { Icon } from 'react-icons-kit'
import { cart } from 'react-icons-kit/entypo/cart'
import { Cartprops } from '../cartprocesses/Cartprops'
function Navbar({ user }) {
  const navigate = useNavigate();
  const { totalQty } = useContext(Cartprops);
  const handleLogout = () => {
    auth.signOut().then(() => {
        navigate('/login');
    })
}
  return (
    <div className='navbox'>
            <div className='leftside'>
                
            </div>
            {!user && <div className='rightside'>
                <span><Link to="signup" className='navlink'>SIGN UP</Link></span>
                <span><Link to="login" className='navlink'>LOGIN</Link></span>
            </div>}
            {user && <div className='rightside'>
                <span><Link to="/" className='navlink'>{user}</Link></span>
                <div className='relative'>

                <span className='no-of-products'>{totalQty}</span>

                </div>
                <span><Link to="/cartproducts" className='navlink'><Icon icon={cart} /></Link></span>
                
                <span><button className='logout-btn' onClick={handleLogout}>Logout</button></span>
            </div>}
        </div>
  )
}

export default Navbar