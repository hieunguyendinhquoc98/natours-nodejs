/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';
const stripe = Stripe('pk_test_51IfGwUEmh4j6pUnqPsX6fijLEIiFN4amOJqiEldf5liIOSmUKL7bmmjWo5vvMjUgvwRNkzfUW0zvKTZtHt7g4LwB00AzLyRIyp');

// eslint-disable-next-line import/prefer-default-export
export const bookTour = async tourId => {
    //get checkout session from the server
    try {
        const session = await axios(
            `http://localhost:3000/api/v1/bookings/checkout-session/${tourId}`
          );
        console.log(session);
    // Create checkout form + chanre credit card
        await stripe.redirectToCheckout({
            sessionId: session.data.session.id
        })
    } catch(err){
        console.log(err);
        showAlert('error', err);
    }
};
