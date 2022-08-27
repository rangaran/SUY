import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();

export const Cartactions = (state, action) => {

    const { shoppingCart, totalPrice, totalQty, totalPoints } = state;

    let product;
    let index;
    let updatedPrice;
    let updatedPoints;
    let updatedQty;

    switch (action.type) {

        case 'ADD_TO_CART':

            const check = shoppingCart.find(product => product.ProductID === action.id);
            if (check) {
                toast.info('this product is already in your cart', {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: false,
                    progress: undefined,
                });
                return state;
            }
            else {
                product = action.product;
                product['qty'] = 1;
                product['TotalProductPrice'] = product.ProductPrice * product.qty;
                product['TotalProductPoints'] = product.ProductPoints * product.qty;
                updatedQty = totalQty + 1;
                updatedPrice = totalPrice + product.ProductPrice;
                updatedPoints = totalPoints + product.ProductPoints;
                return {
                    shoppingCart: [product, ...shoppingCart], totalPrice: updatedPrice, totalQty: updatedQty, totalPoints: updatedPoints
                }
            }
            break;

        case 'INC':
            product = action.cart;
            product.qty = ++product.qty;
            product.TotalProductPrice = product.qty * product.ProductPrice;
            product.TotalProductPoints = product.qty * product.ProductPoints;
            updatedQty = totalQty + 1;
            updatedPrice = totalPrice + product.ProductPrice;
            updatedPoints = totalPoints + product.ProductPoints;
            index = shoppingCart.findIndex(cart => cart.ProductID === action.id);
            shoppingCart[index] = product;
            return {
                shoppingCart: [...shoppingCart], totalPrice: updatedPrice, totalQty: updatedQty, totalPoints: updatedPoints
            }
            break;

        case 'DEC':
            product = action.cart;
            if (product.qty > 1) {
                product.qty = product.qty - 1;
                product.TotalProductPrice = product.qty * product.ProductPrice;
                product.TotalProductPoints = product.qty * product.ProductPoints;
                updatedPrice = totalPrice - product.ProductPrice;
                updatedPoints = totalPoints - product.ProductPoints;
                updatedQty = totalQty - 1;
                index = shoppingCart.findIndex(cart => cart.ProductID === action.id);
                shoppingCart[index] = product;
                return {
                    shoppingCart: [...shoppingCart], totalPrice: updatedPrice, totalQty: updatedQty, totalPoints: updatedPoints
                }
            }
            else {
                return state;
            }
            break;

        case 'DELETE':
            const filtered = shoppingCart.filter(product => product.ProductID !== action.id);
            product = action.cart;
            updatedQty = totalQty - product.qty;
            updatedPrice = totalPrice - product.qty * product.ProductPrice;
            updatedPoints = totalPoints- product.qty * product.ProductPoints;
            return {
                shoppingCart: [...filtered], totalPrice: updatedPrice, totalQty: updatedQty, totalPoints: updatedPoints
            }
            break;

            case 'POINTS':
                
                return {
                    totalPrice: totalPrice - totalPoints%300
                }
                break;

        case 'EMPTY':
            return {
                shoppingCart: [], totalPrice: 0, totalQty: 0, totalPoints: 0
            }

        default:
            return state;

    }
   

}