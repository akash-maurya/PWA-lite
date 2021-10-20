
import style from '../../styles/cart.module.css';
import Cookies from "universal-cookie";
import axios from "axios";
import fallback from '../../components/fallback';
import React , {useState , useEffect} from 'react';
import Link from 'next/link';
// import getcartItems from '../api/cartitems';

const Cart = (props)=>{
    
 // call backend api to collect user cart items
  const cookies  = new Cookies();
  const [items ,setItems] = useState([]);
  const [cost , settotalCost] = useState(0);
  const [numberOfitem ,setNumItems] = useState(0);
  const [proceed , setProceed] = useState(false);
  const [showfallback , setfallback] = useState(false); 
async function getcartItems() {
  // const cookies = new Cookies();

  const authToken = cookies.get("authToken");
  const header = {
    "Content-Type": "application/json",
    "authToken": authToken,
  };

  const getUrl = "http://localhost:5000/api/Cart/getCartItems";
  
  if (authToken) {
    await axios
      .get(getUrl, { headers: header })
      .then((response) => {
        console.log(response.data);
        const data = response.data;
        setItems(data) ;
        let count = 0;
        for (let i = 0; i < data.length; i++) {
          count = count + data[i].amount;
        }
        settotalCost(count);
        setNumItems(data.length);
      })
      .catch((err) => {
        console.log(err);
      });
  }
 
}
useEffect(() => {
  getcartItems();
 
}, [])

const handleCheckout = ()=>{

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
          if(response.data.address.length != 0){
              setProceed(true);
          }
      }
    })
    .catch((err) => {
      console.log(err);
    });
}
    
}

const Product = (props)=>{

 
          return (
            <>
              <div className={style.product_container}>
                <h2>
                  <span>Item</span> : {props.name}
                </h2>
                <p>
                  <span>Amount </span>: {props.amount}Rs
                </p>
               
              </div>
            </>
          );
}

//------------------------------ Cart JSX ---------------------------------
  return (
    <>
      <div className={style.header}>
        <Link href="/">
          <a className={style.home}>
         Go back
          </a>
        </Link>
        <p> Your items are here ... Continue Shopping</p>
        <Link href="/checkout">
          <button  className={style.button}>Checkout</button>
        </Link>
      </div>

      <div className={style.countAndPricing}>
        <p>
          Total Items in your cart{" "}
          <button className={style.count}>{numberOfitem}</button>
        </p>
        <div className={style.pricing}>
          <p>
            Total Amount is <span>{cost}Rs</span>
          </p>
        </div>
      </div>

      <div className={style.pricingAndcount}></div>
      <div className={style.item_container}>
        {items.map((item) => {
          return (
            <Product
              key={item._id}
              itemId={item._id}
              name={item.name}
              amount={item.amount}
            />
          );
        })}
      </div>
    </>
  );
}

export default Cart ;