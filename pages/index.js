import CardItem from '../components/Card_item';
import Link from 'next/link';
import style from '../styles/Home.module.css';
import Header from './header';
import items from '../components/items';
import Head from 'next/head';
import Login from './login';
import Footer from '../components/footer';
import React , {useState} from 'react';
import AddPop from '../components/addpopup';

const  Home = () =>{

 const [showPopup , setPopup] = useState(false);

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
      <Head>
        <script src="https://use.fontawesome.com/bff91f34a4.js"></script>
      </Head>
      <div>
        <Header />
      </div>
      {showPopup && <AddPop></AddPop>}

      <div className={style.grid_container}>
        {items.map((item) => {
          return (
            <CardItem
              triggerPopup={handSetPopup}
              key={item.id}
              title={item.title}
              description={item.description}
              image={item.image}
              price={item.price}
            />
          );
        })}
      </div>

      <Footer />
    </div>
  );
}

export default Home;