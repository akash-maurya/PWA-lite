
import style from '../../styles/cart.module.css';
import Cookies from "universal-cookie";
import axios from "axios";
import ItemBar from '../../components/itemBar';
import React , {useState , useEffect} from 'react';
import Link from 'next/link';
import Fallback from '../../components/fallback';
// import getcartItems from '../api/cartitems';

const Cart = (props)=>{
    
 // call backend api to collect user cart items
  const cookies  = new Cookies();
  const [items ,setItems] = useState([]);
  const [cost , settotalCost] = useState(0);
  const [numberOfitem ,setNumItems] = useState(0);
  const [proceed , setProceed] = useState(false);
  const [nonetwork ,setnonetwork] = useState(false);
async function getcartItems() {
  // const cookies = new Cookies();

  const authToken = cookies.get("authToken");
  const header = {
    "Content-Type": "application/json",
    "authToken": authToken,
  };

  const getUrl = "https://licious-lite.herokuapp.com/api/Cart/getCartItems";
  
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
        setnonetwork(true);
        console.log(err);
      });
  }
 
}

useEffect(() => {
  getcartItems();
})

const handleCheckout = ()=>{

const hitUrl = "https://licious-lite.herokuapp.com/api/update/getdetails";
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
        <Link href="/checkout" passHref>
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
          // console.log(item._id);
          return (
            <ItemBar
              key={item._id}
              itemId={item._id}
              name={item.name}
              amount={item.amount}
              refresh = {getcartItems}
            />
          );
        })}
      </div>
      {nonetwork && <Fallback/>}
    </>
  );
}

export default Cart ;