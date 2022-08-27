import React, { useState, useEffect, useContext } from 'react'
import { auth, db } from '../config/Config'
import { Cartprops } from '../cartprocesses/Cartprops'
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom'
import {
    ref,
    uploadBytes,
    getDownloadURL,
    listAll,
    uploadBytesResumable,
    list,
  } from "firebase/storage";
  import { v4 } from "uuid";
 
  import { collection, addDoc , doc, setDoc, query, where, getDocs   } from 'firebase/firestore';
export const Suggestions = (props) => {

    const history = useNavigate();



    // defining state
    const [suggestion, setSuggestion] = useState('');

    const [error, setError] = useState('');
    const [successMsg, setSuccessMsg] = useState('');
    
    
    const cashoutSubmit = (e) => {
        e.preventDefault();
        auth.onAuthStateChanged(user => {
            const userRef = collection(db, 'Suggestion ' + user.uid);
            if (user) {
                
                const date = new Date();
                const time = date.getTime();
                addDoc(userRef, {
                    Suggestion: suggestion,
                    
                })
                .then(() => {
                    setSuggestion('');
                    setSuccessMsg('Your suggestion has been noted. Redirecting to main page');
                    setTimeout(() => {
                        history('/')
                    }, 5000)
                }).catch(err => setError(err.message))
            }
        })
    
    }

    return (
        <>
            <Navbar user={props.user} />
            <div className='container'>
                <br />
                <h2>Suggestions</h2>
                <br />
                <a href='https://billhist-worker.niyatharangarajan.workers.dev/'>
                <h5>Style Inspiration? Check out Unsplash</h5>
                </a>
                <br />
                {successMsg && <div className='success-msg'>{successMsg}</div>}
                <form autoComplete="off" className='form-group' onSubmit={cashoutSubmit}>
                    
                    <label htmlFor="Delivery Address">We are expanding our database. SUY sellers want to what kind of products you like. Use the above unsplash link to give some suggestions catered to your style.</label>
                    <input type="text" className='form-control' required
                        onChange={(e) => setSuggestion(e.target.value)} value={suggestion} />
                    <br />
                    

                    <button type="submit" className='btn btn-success btn-md mybtn'>SUBMIT</button>
                </form>
                {error && <span className='error-msg'>{error}</span>}
            </div>
        </>
    )
}