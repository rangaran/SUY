import React, { useState } from 'react'
import { auth } from '../config/Config'
import { Link } from 'react-router-dom'
import {useNavigate} from 'react-router-dom';
import { signInWithEmailAndPassword } from "firebase/auth"
import logo from '../images/logo.jpg'
export const Login = (props) => {
    let navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const login = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth,email, password).then(() => {
            let l = email
            setEmail('');
            setPassword('');
            setError('');
            console.log(l)
            if (l.includes("@company.com")){
                navigate('/addproducts')
            }
            else{
            navigate('/')}
        }).catch(err => setError(err.message));
    }

    return (
        <div className='container'>
             <div className='navbox'>
            <div className='rightside'>
                <img width={1020} height={500} src={logo} alt="" />
            </div>
            </div>
            <br />
            <h2>Login</h2>
            <br />
            <form autoComplete="off" className='form-group' onSubmit={login}>
                <label htmlFor="email">Email</label>
                <input type="email" className='form-control' required
                    onChange={(e) => setEmail(e.target.value)} value={email} />
                <br />
                <label htmlFor="password">Password</label>
                <input type="password" className='form-control' required
                    onChange={(e) => setPassword(e.target.value)} value={password} />
                <br />
                <button type="submit" className='btn btn-success btn-md mybtn'>LOGIN</button>
            </form>
            {error && <span className='error-msg'>{error}</span>}
            <br/>
            <span>Sign up <Link to="/signup"> here</Link> if you do not have an account.
                
            </span>
           
        </div>
    )
}