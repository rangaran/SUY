import React, { useContext, useEffect, useState } from 'react'
import { Cartprops } from '../cartprocesses/Cartprops'
import  Navbar  from './Navbar';
import { Icon } from 'react-icons-kit'
import { ic_add } from 'react-icons-kit/md/ic_add'
import { ic_remove } from 'react-icons-kit/md/ic_remove'
import { iosTrashOutline } from 'react-icons-kit/ionicons/iosTrashOutline'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { auth } from '../config/Config'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export const Cart = ({ user }) => {

    const { shoppingCart, dispatch, totalPrice, totalQty, totalPoints } = useContext(Cartprops);

    const history = useNavigate();

    useEffect(() => {
        auth.onAuthStateChanged(user => {
            if (!user) {
                history('/login');
            }
        })
    })

   


    const [totalPrices,settotalprices]=useState(totalPrice)
    const [totalPointss,settotalpoints]=useState(totalPoints)

    return (
        <>
            <Navbar user={user} />
            <>
                {shoppingCart.length !== 0 && <center><h1>Cart</h1></center>}
                <div className='cart-container'>
                    {
                        shoppingCart.length === 0 && <>
                            <div>Cart has 0 items</div>
                            <div><Link to="/">Return to Home page</Link></div>
                        </>
                    }
                    {shoppingCart && shoppingCart.map(cart => (

                        <div>
                        <div className='cart-card' key={cart.ProductID}>

                            <div className='cart-img'>
                                <img src={cart.ProductImg} alt="not found" />
                            </div>

                            <div className='cart-name'>{cart.ProductName}</div>

                            <div className='cart-price-orignal'>CAD {cart.ProductPrice}.00</div>

                            <div className='inc' onClick={() => dispatch({ type: 'INC', id: cart.ProductID, cart })}>
                                <Icon icon={ic_add} size={24} />
                            </div>

                            <div className='quantity'>{cart.qty}</div>

                            <div className='dec' onClick={() => dispatch({ type: 'DEC', id: cart.ProductID, cart })}>
                                <Icon icon={ic_remove} size={24} />
                            </div>

                            <div className='cart-price'>
                                CAD {cart.TotalProductPrice}.00
                            </div>

                            <div className='cart-price'>
                                Points {cart.TotalProductPoints}
                            </div>

                            <button className='delete-btn' onClick={() => dispatch({ type: 'DELETE', id: cart.ProductID, cart })}>
                                <Icon icon={iosTrashOutline} size={24} />
                            </button>
                            
                        </div>
                        
                        </div>

                        
                    ))
                    }
                    {shoppingCart.length > 0 && <div className='cart-summary'>
                        <div className='cart-summary-heading'>
                            Cart-Summary
                        </div>
                        <div className='cart-summary-price'>
                            <span>Total Price</span>
                            <span>{totalPrice}</span>
                            </div>
                            <div className='cart-summary-price'>
                            <span>Total Points</span>
                            <span>{totalPoints}</span>
                        </div>
                        <div className='cart-summary-price'>
                            <span>Total Qty</span>
                            <span>{totalQty}</span>
                        </div>
                        <Link to='/cashout' className='cashout-link'>
                            <button className='btn btn-success btn-md' style={{ marginTop: 5 + 'px' }}>
                                Go to Delivery
                        </button>
                        </Link>
                        <button className='btn btn-success btn-md' onClick={()=>{ if (totalPoints>300) {
                toast.info('With '+totalPoints+ ' points, you get '+Math.floor(totalPoints/300)+' free goodie bag/s', {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: false,
                    progress: undefined,
                })}
                
                else{
                    toast.info('With '+totalPoints+ ' points, you do not have enough points to cash in', {
                        position: "top-right",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: false,
                        draggable: false,
                        progress: undefined,
                    })
                }}
                
                } style={{ marginTop: 5 + 'px' }} >
                               Cash in Points
                            </button>
                        
                    </div>}
                </div>
            </>
        </>
    )
}