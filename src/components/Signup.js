import React, { useState } from 'react'
import { auth, db } from '../config/Config'
import { Route , withRouter} from 'react-router-dom';
import { Link } from 'react-router-dom'
import {useNavigate} from 'react-router-dom';
import { createUserWithEmailAndPassword } from "firebase/auth"
import { collection, addDoc , doc, setDoc  } from 'firebase/firestore';
 export const Signup = (props) => {

     // defining state
     const [name, setName] = useState('');
     const [email, setEmail] = useState('');
     const [password, setPassword] = useState('');
     const [error, setError] = useState('');
     let navigate = useNavigate();
     // signup
     const signup = (e) => {
        const userRef = collection(db, "SignedUpUsersData");
         e.preventDefault();
         createUserWithEmailAndPassword( auth, email, password).then((cred) => {
            addDoc(userRef, {
                Name: name,
                 Email: email,
                 Password: password
            }).then(() => {
                 setName('');
                 setEmail('');
                 setPassword('');
                 setError('');
                 
                 navigate('/login');
             }).catch(err => setError(err.message));
         }).catch(err => setError(err.message));
     }
 
  return (
    <div className='container'>
      
            <h2>Sign up</h2>
            <br />
            <form autoComplete="off" className='form-group' onSubmit={signup}>
                <label htmlFor="name">Name</label>
                <input type="text" className='form-control' required
                    onChange={(e) => setName(e.target.value)} value={name} />
                <br />
                <label htmlFor="email">Email</label>
                <input type="email" className='form-control' required
                    onChange={(e) => setEmail(e.target.value)} value={email} />
                <br />
                <label htmlFor="passowrd">Password</label>
                <input type="password" className='form-control' required
                    onChange={(e) => setPassword(e.target.value)} value={password} />
                <br />
                <button type="submit" className='btn btn-success btn-md mybtn'>REGISTER</button>
            </form>
            {error && <span className='error-msg'>{error}</span>}
            <br />
            <span>Log in 
                <Link to="/login"> Here</Link>
            </span>

        
        </div>
  )
}
