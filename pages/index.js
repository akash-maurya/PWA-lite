import CardItem from '../components/Card_item';
import Script from 'next/script';
import style from '../styles/Home.module.css';
import Header from './header';
//import items from '../components/items';
import Head from 'next/head';

import Footer from '../components/footer';
import React , {useEffect, useState} from 'react';
import AddPop from '../components/addpopup';

const  Home = () =>{

  const [Items,setItems] = useState([]);

 const [showPopup , setPopup] = useState(false);

 useEffect(()=>{
getItems()
 //  eslint-disable-line react-hooks/exhaustive-deps
 },[]);

 async function getItems(){
  await fetch("https://licious-lite.herokuapp.com/api/items/getItems",{
    method : "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  }).then((res)=>{
    return res.json();
  }).then((item)=>{
    const ItemsArray = item.map((itemdata) => {
      return {
        itemId: itemdata.itemId,
        title : itemdata.title,
        description : itemdata.description,
        price : itemdata.price,
        weight : itemdata.weight,
        image  : itemdata.image
      };
    });
    setItems(ItemsArray);
  })
 }

 const handSetPopup = (event)=>{
    event.preventDefault();
    setPopup((prevVal)=>{
      return !prevVal;
    });
    setTimeout( ()=>{
      setPopup((prevVal)=>{
        return!prevVal;
      })
    },500);
 }
 

  return (
    <div>
      <div>
        <Script src="https://use.fontawesome.com/bff91f34a4.js"></Script>

        <Header />
      </div>
      {showPopup && <AddPop></AddPop>}

      <div className={style.grid_container}>
        {Items.map((item) => {
          return (
            <CardItem
              triggerPopup={handSetPopup}
              key={item.itemId}
              title={item.title}
              description={item.description}
              image={item.image}
              price={item.price}
              weight={item.weight}
            />
          );
        })}
      </div>

      <Footer />
    </div>
  );
}

export default Home;