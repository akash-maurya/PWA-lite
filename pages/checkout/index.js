
import React  , {useState , useEffect} from 'react';
import Cookies from "universal-cookie";
import axios from "axios";
import style from '../../styles/checkout.module.css';
import Fallback from '../../components/fallback';
import Link from 'next/link';

const Checkout = ()=>{

   const [proceed , setProceed ] = useState(false);
   const [items , setItems]  = useState([]);
   const [showfallback , setfallback] =useState(false);
   const cookies = new Cookies();



const getOrderItems = async() => {
  const hitUrl = "https://licious-lite.herokuapp.com/api/Cart/getCartItems";
  const authToken = cookies.get("authToken");
  const header = {
    "Content-Type": "application/json",
    "authToken": authToken,
  };

  if (authToken) {
    await axios
      .get(hitUrl, {
        headers: header,
      })
      .then((response) => {
        
        console.log(response.data);

        
          setItems(response.data);
         
       
      })
      .catch((err) => {
        setfallback(true);
        console.log(err);
      });
  }
};


const updateAddprensent = async()=>{  
  const hitUrl = "https://licious-lite.herokuapp.com/api/update/getdetails";
  const authToken = cookies.get("authToken");
  const header = {
  "Content-Type": "application/json",
  "authToken": authToken,
  };



if (authToken) {
  await axios
    .get(hitUrl, {
      headers: header,
    })
    .then((response) => {
      // console.log(response.data);
      
      if (response.data.success === true) {
        console.log("------");
        // console.log(response.data.data.address);
        if (response.data.data.address.length !== 0) {
          setProceed(true);
          getOrderItems();
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
});


const ItemBox = (props)=>{

  return <>
          <div className = {style.item_container}>
            <h1 className = {style.item_heading}>
              {props.name}
            </h1>
          </div>
    </>
}


    return (<>

            {!showfallback && proceed && <div className = {style.success_container}><p className = {style.order_placed}> Your order has been placed successfully</p></div>}
            
               <div className = {style.grid_container}>
                 {
                   
                   items.map((item)=>{
                     console.log(item);
                     return (<ItemBox 
                      key = {item._id}
                       name = {item.name}
                     />);
                   })
                 }
               </div>
            

           {!showfallback && !proceed &&< div className = {style.fail_container}><p className = {style.failed}> Please fill your address , failed to place the order</p></div>  }         
            {!showfallback && <Link href = '/cart' passHref>
               <button className = {style.btn}>Back to cart</button>
            </Link>}
            {showfallback && <Fallback/>}
    </>)


}
export default Checkout;