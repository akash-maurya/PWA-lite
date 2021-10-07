import CardItem from '../components/Card_item';
import Link from 'next/link';
import style from '../styles/Home.module.css';
import Header from './header.js';
import items from '../components/items';
import Head from 'next/head';
import Login from './login';
import Footer from '../components/footer';
// import React , {useState} from 'react';

const  Home = () =>{

 

  return (
    <div>
      <Head>
        <script src="https://use.fontawesome.com/bff91f34a4.js"></script>
      </Head>

      <Header />

  
      <div className={style.grid_container}>
        {items.map((item) => {
          return (
            <CardItem
              key={item.id}
              title={item.title}
              description={item.description}
              image={item.image}
              price={item.price}
            />
          );
        })}
      </div>
      {/* <div className={style.container}>
        <div className={style.layer}>
          <h1 className={style.heading}>Welcome to licious lite</h1>
          <div className={style.routes}>
            <Link href="/login">
                <button className = {style.link}> Sign in</button>
            </Link>
            <Link href="/register">
                <button className = {style.link}>Sign Up</button>
            </Link>
          </div>
        </div>
      </div> */}
      <Footer/>
    </div>
  );
}

export default Home;