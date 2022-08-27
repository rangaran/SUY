
import React, {Component} from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import {AddProducts}  from './components/AddProducts';
import {Home} from './components/Home'
import { Login } from './components/Login';
import { Signup } from './components/Signup';
import { ProductscreationProvider } from './cartprocesses/Productcreation';
import {auth,db} from './config/Config'
import { CartpropsProvider } from './cartprocesses/Cartprops'
import { Cart } from './components/Cart';
import { CashOut } from './components/CashOut';
import { Suggestions } from './components/suggestions';
import { collection, addDoc , doc, setDoc, query, where, getDocs   } from 'firebase/firestore';
export class App extends Component {

  state = {
      user: null,
  }

  componentDidMount() {

      // getting user info for navigation bar
      auth.onAuthStateChanged(user => {
          if (user) {
            const fetchData = async () => {
              const q = query(collection(db, "SignedUpUsersData"), where("Email", "==", user.email));

              const querySnapshot = await getDocs(q);
              let c = 0
{c==0 &&querySnapshot.forEach((doc) => {
  this.setState({
    user: doc.data().Name
})
c=c+1;
});}


}
fetchData();
            
             
          }
          else {
              this.setState({
                  user: null
              })
          }
      })

  }
  render(){
  return (
    <ProductscreationProvider>
      <CartpropsProvider>
    <BrowserRouter>
    <Routes>
      {/*  */}
    <Route exact path = '/' element = {<Home user={this.state.user}/>}/>
    
      <Route exact path = '/addproducts' element = {<AddProducts/>}/>
      <Route exact path = '/login' element = {<Login/>}/>

      <Route exact path = '/signup' element = {<Signup/>}/>   
      <Route exact path = '/cartproducts' element = {<Cart user={this.state.user}/>}/>
      <Route exact path = '/cashout' element = {<CashOut user={this.state.user}/>}/>   
      <Route exact path = '/suggestions' element = {<Suggestions user={this.state.user}/>}/>    </Routes>
    </BrowserRouter>
    </CartpropsProvider>
    </ProductscreationProvider>
  );
}
}
export default App;
