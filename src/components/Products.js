import React, { useContext } from 'react'
import { CartContextProvider } from '../cartprocesses/Cartprops';
import { Productscreation } from '../cartprocesses/Productcreation'
import { Cartprops } from '../cartprocesses/Cartprops'

export const Products = () => {

    const { products } = useContext(Productscreation);
    const { dispatch } = useContext(Cartprops);
    return (
        <>
            {products.length !== 0 && <center><h1>Product Catalogue</h1></center>}
            <hr style={{
      borderColor: 'black',}}/>
            <div className='products-container'>
                {products.length === 0 && <div>slow internet...no products to display</div>}
                {products.map(product => (
                    <div className='product-card' key={product.ProductID}>
                        <div className='product-img'>
                            <img src={product.ProductImg} alt="not found" />
                        </div>
                        <div className='product-name'>
                            {product.ProductName}
                        </div>
                        <div className='product-price'>
                            CAD {product.ProductPrice}.00
                    </div>
                    <div className='product-sustain'>
                            Points {product.ProductPoints}
                    </div>
                    <button className='addcart-btn' onClick={() => dispatch({ type: 'ADD_TO_CART', id: product.ProductID, product })}>ADD TO CART</button>
                    </div>
                ))}
            </div>
        </>
    )
}