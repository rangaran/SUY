import React, { createContext } from 'react'
import { db } from '../config/Config'
import { onSnapshot, collection } from 'firebase/firestore';
export const Productscreation = createContext();

export class ProductscreationProvider extends React.Component {

    state = {
        products: []
    }

    componentDidMount() {

        const prevProducts = this.state.products;
        onSnapshot(collection(db,'Products'),(snapshot) => {
            let changes = snapshot.docChanges();
            changes.forEach(change => {
                if (change.type === 'added') {
                    prevProducts.push({
                        ProductID: change.doc.id,
                        ProductName: change.doc.data().ProductName,
                        ProductPrice: change.doc.data().ProductPrice,
                        ProductImg: change.doc.data().ProductImg,
                        ProductPoints: change.doc.data().ProductPoints
                    })
                }
                this.setState({
                    products: prevProducts
                })
            })
        })

    }
    render() {
        return (
            <Productscreation.Provider value={{ products: [...this.state.products] }}>
                {this.props.children}
            </Productscreation.Provider>
        )
    }
}