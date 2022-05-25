import { async } from '@firebase/util';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { set } from 'date-fns';
import React, { useState, useEffect } from 'react';

const CheckoutForm = ({ appointment }) => {
  const stripe = useStripe();
  const elements = useElements();

  const [cardError, setCardError] = useState('');
  const [success, setSuccess] = useState('');
  const [processing, setProcessing] = useState(false);
  const [transactionId, setTransactionId] = useState('');
  const [clientSecret, setClientSecret] = useState('');

  const { _id, price, patientEmail, patientName } = appointment;
  useEffect(() => {
    fetch('http://localhost:5000/create-payment-intent', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${localStorage.getItem('accessToken')}`
      },
      body: JSON.stringify({ price })
    })
      .then(res => res.json())
      .then(data => {
        if (data?.clientSecret) {
          setClientSecret(data.clientSecret)
        }
      })

  }, [price])

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    // Use your card Element with other Stripe.js APIs
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card,
    });

    if (error) {
      setCardError(error.message)
    } else {
      setCardError('');

    }

    setSuccess('');
    setProcessing(true);
    // confirm card payment 
    const { paymentIntent, error: intentError } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card: card,
          billing_details: {
            name: patientName,
            email: patientEmail
          },
        },
      },
    );

    if (intentError) {
      setCardError(intentError?.message);
      setProcessing(false);
    } else {
      setCardError('');
      setTransactionId(paymentIntent.id);
      setSuccess('Congrats! You payment is successful!');

      // store payment data 
      const payment = {
        appointment: _id,
        transactionId: paymentIntent.id
      }
      //update paymentinfo
      fetch(`http://localhost:5000/booking/${_id}`, {
        method: 'PATCH',
        headers: {
          'content-type': 'application/json',
          authorization: `Bearer ${localStorage.getItem('accessToken')}`
        },
        body: JSON.stringify({ payment })

      }).then(res => res.json()).then(data => {
        setProcessing(false);
        console.log(data);
      })
    }

  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#424770',
                '::placeholder': {
                  color: '#aab7c4',
                },
              },
              invalid: {
                color: '#9e2146',
              },
            },
          }}
        />
        <button className='btn btn-success btn-sm mt-4' type="submit" disabled={!stripe || !clientSecret}>
          Pay
        </button>
      </form>

      {
        cardError && <p className='text-red-600'>{cardError}</p>
      }
      {
        success && <div className='text-green-600'>
          <p> {success}</p>
          <p> Your Tansaction Id: <span className='text-orange-500 font-bold'>{transactionId}</span></p>

        </div>
      }
    </div>
  );
};

export default CheckoutForm;