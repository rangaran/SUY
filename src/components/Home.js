import React, { useEffect } from 'react'
import Navbar from './Navbar'
import '../css/Home.css'
import { useNavigate } from 'react-router-dom'
import {Products} from './Products'
import { auth } from '../config/Config'
export const Home = ({user}) => {
  const history = useNavigate();
  useEffect(() => {
    // forcing user to signup
    auth.onAuthStateChanged(user => {
        if (!user) {
            history('/login');
        }
    })
})
  return (
    <div className='wrapper'>
        <Navbar user ={user}/>
        <Products />
    </div>
  )
}

