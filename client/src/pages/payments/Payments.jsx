import React, {useState} from 'react';
import {CircularProgress} from '@mui/material';
import {useLocation} from 'react-router-dom'

import "./Payments.css"

function Payments() {
const [isSubmitting, setIsSubmitting] = useState(false)
const location = useLocation()
const searchParams = new URLSearchParams(location.search)
const successState = searchParams.get('success')
  function handlePaymentButtonClick(){
    try {
      setIsSubmitting(true)
      fetch('http://localhost:8800/api/payments',{
        method: "GET",
        credentials: 'include'
      })
      .then(res => {
        if(!res.ok){
          return res.json().then(json => Promise.reject(json))
        }
        return res.json()
      })
      .then(({url}) => {
        setIsSubmitting(false)
       window.location = url
      })
      .catch(e=>{
        console.log(e)
        setIsSubmitting(false)
      })
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className='payment-container'>
        <div className="payment-card-container">
            <div className='payment-card'>
                <div className='title'>Premium</div>
                <div className='price'>$ 10</div>
                <div>
                    <button className='payment-button' onClick={handlePaymentButtonClick}>
                     { isSubmitting ? <CircularProgress sx={{color: 'white'}} size={20}/> : "Buy"}
                      </button>
                </div>
                <div className='status'>
          {successState === 'true' ? 'Payment Successful.' : (successState === 'false' ? 'Payment failed!' : "")}
        </div>
            </div>
        </div>
       
    </div>
  )
}

export default Payments