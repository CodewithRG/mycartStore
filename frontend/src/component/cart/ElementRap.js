import React, { Fragment ,useEffect, useState } from 'react'
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";


const ElementRap = (props) => {
    const {Component} = props;


    const [stripeApiKey, setStripeApiKey] = useState("");

    async function getStipeApiKey() {
      const {data} = await axios.get("/api/v1/stripeApiKey");
    //   console.log("stripeApiKey",data)
  
      setStripeApiKey(data.stripeApiKey);
    }

    useEffect(() => {
    getStipeApiKey();
        
    }, []);

  return (
    <Fragment>

    <Elements stripe={loadStripe(stripeApiKey)} >
           {stripeApiKey && <Component/>}
          </Elements>
              </Fragment>
  )
}

export default ElementRap