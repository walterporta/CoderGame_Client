
import { useState } from "react";
import style from './CoinBuyer.module.css';
import { loadStripe } from "@stripe/stripe-js";
import {  Elements } from "@stripe/react-stripe-js";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toBePartiallyChecked } from "@testing-library/jest-dom/dist/matchers";
import { useSelector } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
import CheckoutForm from "./CheckoutForm";
import { useEffect } from "react";




function CoinBuyer() {
    const {user} = useAuth0()
    const [stripePromise, setStripePromise] = useState(null);
    const [clientSecret, setClientSecret] = useState("");
    const [input, setInput] = useState(0);
    const [inputError, setInputError] = useState(true) 

    const handleChange = (e) => {
      setInput(e.target.value);
      input > 0 ? setInputError(false) : setInputError(true)
      }

    useEffect(() => {
        setStripePromise(loadStripe('pk_test_51MyDyrJEIGHeaJyNx4T7jf2neAOnJcNytwXOwJtkQB6CWZyP5H1j9nGnMwWCEdqDtokBmLtA3JwlStdgBpV1Aw7p004S44I6K8'));
      }, []);
  
    const handleClick = async (e) => {
      e.preventDefault();
      const {data} = await axios.post("http://localhost:3001/checkout", {input})
        setClientSecret(data.clientSecret);
    }
  
    return (
      <div className={style.container}>
        <div>
          <h3>Ingrese la cantidad deseada de CoderCoins a comprar</h3>
          <p>Ingresar una cantidad mayor a 10</p>
          <input type="text" name="coins" className={style.inp} placeholder='Ingrese Cantidad Aquí' onChange={handleChange} />
          <p>coins</p>
          <p>Su total es de : {input} USD</p>
          <button disabled={inputError} className={style.btn} onClick={handleClick}>Confirmar</button>
        </div>
        {clientSecret && stripePromise  && (
          <Elements stripe={stripePromise} options={{ clientSecret }} >
            <CheckoutForm input={input} user={user} />
          </Elements>
        )}
      </div>
    );
  }
// const CheckoutForm = () =>{
//     const stripe = useStripe();
//     const element = useElements();
//     const navigate = useNavigate();
//     const [loading, setLoading] = useState(false);
//     const [input, setInput] = useState(0);
//     const {user} = useAuth0()
//     const handleChange = (e) => {
//         setInput(e.target.value);
//     }

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         const { error, paymentMethod} = await stripe.createPaymentMethod({
//             type: 'card',
//             card: element.getElement(CardElement),
//         });

//         setLoading(true);

//         if(!error) {
//             const { id } = paymentMethod;
//             try {
//                 const { data } = await axios.post('http://localhost:3001/checkout', 
//                 {
//                     id,
//                     amount: input * 100, //cent
//                     user
//                 }
//                 );
                
//                 console.log(data)
//                 console.log(user.sub)
//                 if(data.status !== 'succeeded'){
//                     navigate('/canceled');
//                 }
//                 //element.getElement(CardElement).clear();
//                 else {
//                     navigate('/success');
//                 }

//             } catch (error) {
//                 navigate('/canceled');
//             }
//             setLoading(false);

            
//         }
//     }

//     return(
//         <form onSubmit={handleSubmit} className={style.container}>
//             <h3>Ingrese la cantidad deseada de CoderCoins a comprar</h3>
//             <input type="text" name="coins" className={style.inp} placeholder='Ingrese Cantidad Aquí' onChange={handleChange} />
//             <p>coins</p>
//             <p>Su total es de : {input} USD</p>
//             <div className="form-group">
//                 <CardElement className={style.CardElement} />
//                 <PaymentElement />
//             </div>
//             <button disabled={!stripe} className="btn btn-success">
//                 {loading ? (
//                 <div className="spinner-border text-light" role="status">
//                     <span className="sr-only">Loading...</span>
//                 </div>
//                 ) : (
//                   "Buy"
//                 )}
//             </button>
//         </form>
//     )
// }
// const CoinBuyer = () => {
//     return(
//         <Elements stripe={stripePromise}>
//             <div className="container p-4">
//                 <div className="row h-100">
//                     <div className="col-md-10 offset-md-4 h-100">
//                         <CheckoutForm />
//                     </div>
//                 </div>
//             </div>
//         </Elements>
//     )
// }

export default CoinBuyer;
