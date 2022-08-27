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
export const CashOut = (props) => {

    const history = useNavigate();

    const { shoppingCart, totalPrice, totalQty, dispatch, totalPoints } = useContext(Cartprops);

    // defining state
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [cell, setCell] = useState('');
    const [address, setAddress] = useState('');
    const [error, setError] = useState('');
    const [successMsg, setSuccessMsg] = useState('');
    
    useEffect(() => {
        auth.onAuthStateChanged(user => {
            
                if (user) {
                    const fetchData = async () => {
                    const q = query(collection(db, "SignedUpUsersData"), where("Email", "==", user.email));
    
                    const querySnapshot = await getDocs(q);
                    let c = 0
    {c==0 &&querySnapshot.forEach((doc) => {
    
      setName(doc.data().Name);
      setEmail(doc.data().Email);
      c=c+1;
    });}
    

}
fetchData();
}
              
            
            else {
                history('/login')
            }
        })
    })
    
    const cashoutSubmit = (e) => {
        e.preventDefault();
        auth.onAuthStateChanged(user => {
            const userRef = collection(db, 'Buyer-info ' + user.uid);
            if (user) {
                const date = new Date();
                const time = date.getTime();
                addDoc(userRef, {
                    BuyerName: name,
                    BuyerEmail: email,
                    BuyerCell: cell,
                    BuyerAddress: address,
                    BuyerPayment: totalPrice,
                    BuyerQuantity: totalQty,
                    BuyerPoints: totalPoints
                })
                .then(() => {
                    setCell('');
                    setAddress('');
                    dispatch({ type: 'EMPTY' })
                    setSuccessMsg('Your order has been placed successfully. Thanks for visiting us. You will be redirected to home page after 5 seconds');
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
                <h2>Cashout Details</h2>
                <br />
                {successMsg && <div className='success-msg'>{successMsg}</div>}
                <form autoComplete="off" className='form-group' onSubmit={cashoutSubmit}>
                    <label htmlFor="name">Name</label>
                    <input type="text" className='form-control' required
                        value={name} disabled />
                    <br />
                    <label htmlFor="email">Email</label>
                    <input type="email" className='form-control' required
                        value={email} disabled />
                    <br />
                    <label htmlFor="Cell No">Cell No</label>
                    <input type="number" className='form-control' required
                        onChange={(e) => setCell(e.target.value)} value={cell} placeholder='eg 03123456789' />
                    <br />
                    <label htmlFor="Delivery Address">Delivery Address</label>
                    <input type="text" className='form-control' required
                        onChange={(e) => setAddress(e.target.value)} value={address} />
                    <br />
                    <label htmlFor="Price To Pay">Price To Pay</label>
                    <input type="number" className='form-control' required
                        value={totalPrice} disabled />
                    <br />
                    <label htmlFor="Price To Pay">Number of Points to cash in</label>
                    <input type="number" className='form-control' required
                        value={totalPoints} disabled />
                    <br />
                    <label htmlFor="Total No of Products">Total No of Products</label>
                    <input type="number" className='form-control' required
                        value={totalQty} disabled />
                    <br />

                    <button type="submit" className='btn btn-success btn-md mybtn'>SUBMIT</button>
                </form>
                {error && <span className='error-msg'>{error}</span>}
            </div>
        </>
    )
}