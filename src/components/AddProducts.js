
import React, {useState} from 'react'
import { storage, db } from '../config/Config.js'
import { useNavigate } from 'react-router-dom'
import { auth } from '../config/Config'
import {
    ref,
    uploadBytes,
    getDownloadURL,
    listAll,
    uploadBytesResumable,
    list,
  } from "firebase/storage";
  import { v4 } from "uuid";
 
  import { collection, addDoc , doc, setDoc  } from 'firebase/firestore';

export const AddProducts = () => {
    const navigate = useNavigate();
    const [productName,setProductName] = useState('');
    const [snap,setsnap] = useState(null);
    const [productPrice,setProductPrice] = useState(0);
    const [productPoints,setProductPoints] = useState(0);
    const [productImg,setProductImg] = useState(null);
    const [error,setError] = useState('');
    const types = ['image/png', 'image/jpeg']; // image types
    const [imageUrls, setImageUrls] = useState([]);
    const productImgHandler = (e) => {
        let selectedFile = e.target.files[0];
        if (selectedFile && types.includes(selectedFile.type)) {
            setProductImg(selectedFile);
            setError('')
        }
        else {
            setProductImg(null);
            setError('Please select a valid image type (jpg or png)');
        }
    }

    // const addProduct = (e) => {
    //     e.preventDefault();
    //     const imageRef = ref(storage, `images/${productImg.name + v4()}`);
    //     uploadBytes(imageRef, productImg).then((snapshot) => {
    //       getDownloadURL(snapshot.ref).then((url) => {
    //         setImageUrls((prev) => [...prev, url]);
    //       });
    //     });
    //   };
        // add product
        const addProduct = (e) => {
            e.preventDefault();
            const fileToUpload = productImg;
            const userRef = collection(db, "Products");
            const refs = ref(storage,`images/${productImg.name + v4()}`)
            const uploadTask = uploadBytesResumable(refs,fileToUpload);
            uploadBytes(refs, fileToUpload).then((snapshot) => {
                getDownloadURL(snapshot.ref).then((url) => {
                        addDoc(userRef, {
                            ProductName: productName,
                            ProductPrice: Number(productPrice),
                            ProductImg: url,
                            productPoints: Number(productPoints)
                        })
                       .then(() => {
                            setProductName('');
                            setProductPrice(0)
                            setProductImg('');
                            setProductPoints(0);
                            setError('');
                            document.getElementById('file').value = '';
                        }).catch(err => setError(err.message))
                    });
                });
        }
        const handleLogout = () => {
            auth.signOut().then(() => {
                navigate('/login');
            })
        }
  return (
    <>
    <center>
    <span><button className='logout-btn' style ={{ marginTop: 20}}onClick={handleLogout}>Logout</button></span>
    </center>
    <div className='container'>
            <br />
            
            
           
            <h2>ADD PRODUCTS</h2>
            <hr style={{
      borderColor: 'black',
    }}/>
            <form autoComplete="off" className='form-group' onSubmit={addProduct} >
                <label htmlFor="product-name">Product Name</label>
                
                <input type="text" className='form-control' required
                    onChange={(e) => setProductName(e.target.value)} value={productName} />
                <br />
                <label htmlFor="product-price">Product Price</label>
                <input type="number" className='form-control' required
                  onChange={(e) => setProductPrice(e.target.value)} value={productPrice} />
                <br />
                <label htmlFor="product-points">Sustainability Points following Sustainability guidlines</label>
                <input type="number" className='form-control' required
                  onChange={(e) => setProductPoints(e.target.value)} value={productPoints} />
                <br />
                <label htmlFor="product-img">Product Image</label>
                <input type="file" className='form-control' id="file" required
                  onChange={productImgHandler}   />
                <br />
                <button type="submit" className='btn btn-success btn-md mybtn'>ADD</button>
            </form>
            {error && <span className='error-msg'>{error}</span>}
            </div>
            </>
  )
}
