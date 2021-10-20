
import React  , {useState , useEffect} from 'react';
import Cookies from "universal-cookie";
import axios from "axios";
import style from '../../styles/checkout.module.css';
import Fallback from '../../components/fallback';
import Link from 'next/link';

const checkout = ()=>{

   const [proceed , setProceed ] = useState(false);
   const [showfallback , setfallback] =useState(false);
   const cookies = new Cookies();

const updateAddprensent = ()=>{  
const hitUrl = "http://localhost:5000/api/update/getdetails";
const authToken = cookies.get("authToken");
const header = {
  "Content-Type": "application/json",
  "authToken": authToken,
};

if (authToken) {
  axios
    .get(hitUrl, {
      headers: header,
    })
    .then((response) => {
      console.log(response.data);

      if (response.data.success === true) {
        console.log("------");
        console.log(response.data.address);
        if (response.data.data.address.length != 0) {
          setProceed(true);
        }
      }
    })
    .catch((err) => {
      setfallback(true);
      console.log(err);
    });
}
}

useEffect(() => {
  
 updateAddprensent();
}, []);

    return (<>

            {!showfallback && proceed && <div className = {style.success_container}><p className = {style.order_placed}> Your order has been placed successfully</p></div>}


           {!showfallback && !proceed &&< div className = {style.fail_container}><p className = {style.failed}> Please fill your address , failed to place the order</p></div>  }         
            {!showfallback && <Link href = '/cart'>
               <button className = {style.btn}>Back to cart</button>
            </Link>}
            {showfallback && <Fallback/>}
    </>)


}
export default checkout;