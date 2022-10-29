import React,{Fragment, useRef,useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import CheckoutSteps from './Cart/CheckoutSteps'
import { useSelector, useDispatch } from 'react-redux'
import MetaData from '../layout/MetaData'
import { Typography } from '@material-ui/core'
import { useAlert } from 'react-alert'
import { CardNumberElement, CardCvcElement, CardExpiryElement, useStripe, useElements} from '@stripe/react-stripe-js'
// import axios from 'axios'
import './payment.css'
import CreditCardIcon from '@material-ui/icons/CreditCard'
import EventIcon from '@material-ui/icons/Event'
import VpnKeyIcon from '@material-ui/icons/VpnKey'
import axios from 'axios'
import { createOrder, clearError } from '../../actions/orderAction'


const Payment = () => {
    const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
    const navigate = useNavigate();

    const dispatch = useDispatch()
    const alert = useAlert()
    const stripe = useStripe()
    const elements = useElements( )
    const payBtn = useRef(null)

        const { shippingInfo, cartItems} = useSelector((state)=>state.cart)
        const {user } = useSelector((state)=>state.user)
        const { error } = useSelector((state)=>state.newOrder)

        const paymentData = {
            amount: Math.round(orderInfo.totalPrice * 100),
        }

        const order = {
            shippingInfo,
            orderItems:cartItems,
            // paymentInfo:
            itemPrice:orderInfo.subTotal,
            taxPrice:orderInfo.Tax,
            shippingPrice:orderInfo.shippingCharges,
            totalPrice:orderInfo.totalPrice,
            // orderStatus:"processing",
            users: {
                _id: user._id,
                name: user.name,
                email:user.email,


            },



        }

    const SubmitHandler = async (e)=>{
        e.preventDefault()
        payBtn.current.disabled = true
        
        try{
            const config = {
                headers:{
                    "Content-Type":"application/json",   
                },

            };
            const { data } = await axios.post("/api/v1/payment/proccess",paymentData,config);
            // console.log("pay...",data)

            const client_secret = data.client_secret

            if(!stripe || !elements) return;

            const result = await stripe.confirmCardPayment(client_secret,{
                payment_method: {
                    card: elements.getElement(CardNumberElement),
                    billing_details:{
                        name: user.name,
                        email:user.email,
                        address:{
                            line1:shippingInfo.address,
                            city:shippingInfo.city,
                            state:shippingInfo.state,
                            postal_code:shippingInfo.pincode,
                            country:shippingInfo.country,
                        },
                    },
                },
            });

            if(result.error){
                payBtn.current.disabled = false;
                alert.error(result.error.message)
            }else{
                if(result.paymentIntent.status === "succeeded"){
                    order.paymentInfo = {
                        id: result.paymentIntent.id,
                        status:result.paymentIntent.status,
                    }

                    dispatch(createOrder(order))
                    navigate("/success")
                }else{
                    alert.error("There's some issue while proccessing payment")
                }
            }

        }catch(error){
            payBtn.current.disabled = false;
            alert.error("Payment failed")
        }
    }

    useEffect(() => {
        if(error){
            alert.error(error)
            dispatch(clearError())
        }
    }, [dispatch,error,alert]);
  return (
    <Fragment>
        <MetaData title="Payment" / >
            <CheckoutSteps activeStep={2} />

            <div className='paymentContainer'>
                <form className='paymentForm' onSubmit={(e)=>SubmitHandler(e)}>
                    <Typography>Card Info</Typography>
                    <div>
                        <CreditCardIcon/>
                        <CardNumberElement className='paymentInput' />
                    </div>
                    <div>
                        <EventIcon/>
                        <CardExpiryElement className='paymentInput' />
                    </div>
                    <div>
                        <VpnKeyIcon/>
                        <CardCvcElement className='paymentInput' />
                    </div>

                    <input type="submit" value={`pay - ${orderInfo && orderInfo.totalPrice}`} ref={payBtn} className='paymentFormBtn' />

                </form>

            </div>
    </Fragment>
    )
}

export default Payment