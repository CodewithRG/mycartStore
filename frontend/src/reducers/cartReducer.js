import {ADD_TO_CART,REMOVE_CART_ITEM ,SAVE_SHIPPING_INFO} from '../constants/cartConstant';

export const cartReducers = (state = { cartItems: [], shippingInfo:{} }, action) => {
  // let cartItems
  switch (action.type) {
    case ADD_TO_CART :
      //here : cheack the item is allready exist in cart or not 
      const item = action.payload;
      
      const isItemExist = state.cartItems.find(
        (i)=> i.product === item.product 
        
        )
        console.log("action",isItemExist)
        
        if(isItemExist){
             return{
             ...state,
                cartItems : state.cartItems.map((i)=>
                i.product === isItemExist.product ? item :i
                )
            }
           }else{
             
             return{
                ...state,
                cartItems:[...state.cartItems,item]
            }
           }
     
           case REMOVE_CART_ITEM :
            return{
              ...state,
              cartItems: state.cartItems.filter((i)=>i.product !== action.payload),
            }

            case SAVE_SHIPPING_INFO:
              return{
                ...state,
                shippingInfo : action.payload
              }
      default:
        return state;
    }
  };
  