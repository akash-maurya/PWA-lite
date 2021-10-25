import Image from 'next/image';
import img from '../public/Licious-Logo.png';
import style from '../styles/product.module.css';
import Cookies from "universal-cookie";
import axios from 'axios';
// import items from '../components/items';

const CardItem = (props)=>{


const cookies = new Cookies();

const addItem = async (event)=>{
    //  props.triggerPopup(event);
     event.preventDefault();
     const authToken = cookies.get('authToken');
     const header = {
      "Content-Type": "application/json",
       "authToken" : authToken,
    };

    if(authToken){
        const data = {name : props.title , amount : props.price};
        console.log(data);
        const addUrl =
          "https://licious-lite.herokuapp.com/api/Cart/updateOrder";
       await axios.post(addUrl , data  , {headers : header})
        .then((res)=>{
            console.log(res.data);
             props.triggerPopup(event);
        })
        .catch((error)=>{
          console.log(error);
        })
    }
}


    return (
      <>
        <div className={style.card_container}>
         <div className = {style.card_image}>
            <Image src= {props.image} className = {style.image}layout="fill" alt="picture" />
          </div>
          <div className={style.text_container}>
            <h2 className={style.title}>{props.title}</h2>
          
            <p >{props.description}</p>

            <div className={style.priceAndbutton}>
              <h3 className={style.price}>MRP : {props.price} Rs</h3>
              <h3 className={style.price}>{props.weight}gms</h3>
              <a>
                <button  onClick = {addItem} className = {style.button}>Add to Cart</button>
              </a>
            </div>
          </div>
        </div>
      </>
    );
}

export default CardItem ;