import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import { deleteProductReducers, newProductReducers, newReviewReducers, productDetailsReducers, productReducers, productReviewsReducers, reviewReducers } from './reducers/productReducer'
import { profiletReducers, usertReducers, forgotPasswordReducers, allUsersReducers, userDetailsReducers } from './reducers/userReducer';
import { cartReducers } from './reducers/cartReducer'
import { allOrdersReducers, myOrdersReducers, newOrderReducers, OrderDetailsReducers, orderReducers } from './reducers/orderReducers';


const reducer = combineReducers({
    products: productReducers,
    productDetails: productDetailsReducers,
    user: usertReducers,
    profile: profiletReducers,
    forgetPassword: forgotPasswordReducers,
    cart: cartReducers,
    newOrder: newOrderReducers,
    myOrders: myOrdersReducers,
    orderDetails:OrderDetailsReducers,
    newReview: newReviewReducers,
    newProduct: newProductReducers,
    deleteProduct: deleteProductReducers,
    allOrders:allOrdersReducers,
    order: orderReducers,
    allUsers: allUsersReducers,
    userDetails: userDetailsReducers,
    productReviews: productReviewsReducers,
    reviews:reviewReducers,
});
let intitialeState = {
    cart:{
        cartItems : localStorage.getItem("cartItems") ? 
        JSON.parse(localStorage.getItem("cartItems")) : [],

        shippingInfo: localStorage.getItem("shippingInfo") ? 
        JSON.parse(localStorage.getItem("shippingInfo")) : {},

    }

}; 

const middleware = [thunk]

const store = createStore(
    reducer,
    intitialeState,
    composeWithDevTools( applyMiddleware(...middleware))
)

export default store;
