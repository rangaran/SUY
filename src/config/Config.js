import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getAuth, GoogleAuthProvider  } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
    apiKey: "AIzaSyDn4Vbu1W-5faCXsAMceaWaigGKn4gfgQs",
    authDomain: "shoppingcart-a0fb6.firebaseapp.com",
    projectId: "shoppingcart-a0fb6",
    storageBucket: "shoppingcart-a0fb6.appspot.com",
    messagingSenderId: "694790467645",
    appId: "1:694790467645:web:af3b8bf5a437188a7b3a54",
    measurementId: "G-7NGD16YV47"
  };
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const auth = getAuth();
  const storage = getStorage(app);
  //const provider=new GoogleAuthProvider()
  
  export { db, auth, storage };