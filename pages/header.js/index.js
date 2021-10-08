import style from "../../styles/header.module.css";
import Image from "next/image";
import logo from "../../public/Licious-Logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import Login from "../login";
import React , {useState, useEffect} from 'react';
import Cart from '../cart';
import Cookies from "universal-cookie";




const Product = (props) => {

const [showlogin , setLogin] = useState(false);
const [CheckLogin , setCheckLogin]  = useState(false);
const [showCart , setShowCart] = useState(false);
const cookies = new Cookies();
// check whether someone login or not ;

const checklogin = ()=>{

  const authToken = cookies.get('authToken');
  if(!authToken){
    setCheckLogin(false);
  }
  else if(authToken){
    setCheckLogin(true);
  }
}

const toggleCart = (event )=>{
   event.preventDefault() ;
   setShowCart(!showCart);
}
  

const handleclick = (event)=>{
   event.preventDefault();
   setLogin((prevVal)=>{
     return !prevVal ;
   })
}

useEffect(() => {
 checklogin();
 
}, [showlogin ,CheckLogin]);

  return (
    <>
      <div>
        <nav className={style.navbar}>
          <h1 className={style.heading}>
            <span className={style.blue}>Licious</span>
            <span className={style.green}>Lite</span>
          </h1>

          {/* Search Box */}
          <div className={style.search_box}>
            <input
              className={style.input_s}
              type="search"
              placeholder="search"
            />

            <button className={style.icon}>
              <FontAwesomeIcon icon={faSearch}></FontAwesomeIcon>
            </button>
          </div>

          {/* Login Buuton to login the user  */}
          <div className={style.flex_box}>
            {!CheckLogin && (
              <Link href="/auth">
                <button onClick={handleclick} className={style.btn}>
                  Login
                </button>
              </Link>
            )}

            {/* Profile Button which will be visible if user logged in */}
            {CheckLogin && (
              <Link href="/profilePage">
                <button className={style.btn}>
                  <span>Profile</span>
                </button>
              </Link>
            )}

            {/* Cart buttton */}
            <Link href="/cart" >
              <button className = {style.btn}><span>Cart</span></button>
            </Link>
          </div>
          {showlogin && <Login toggleLogin={handleclick}></Login>}

          {showCart && <Cart togglebar={toggleCart}></Cart>}
        </nav>
      </div>
    </>
  );
};

export default Product;
