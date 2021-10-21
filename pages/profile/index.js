import style from '../../styles/profile.module.css'

import Head from 'next/head'
import Link from 'next/link'
import user from '../../public/user.jpeg';
import Image from 'next/image'
import { useState , useEffect} from 'react';
import Cookies from "universal-cookie";
import axios from "axios";
import Router from 'next/router';
import Script from 'next/script';

const Profile = ()=>{

const cookies = new Cookies();


const [firstname , setfirstname] = useState("");
const [lastname , setlastname]   = useState("");
const [address , setadress]      = useState("");

const [mobileNumber , setmobileNumber] = useState(0);

const handlefirstname = (event)=>{
    setfirstname(event.target.value);
}

const handlelastname = (event) => {
  setlastname(event.target.value);
};

const handleadress = (event) => {
  setadress(event.target.value);
};


async function getdetails (){

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
      console.log(response.data);

      if(response.data.success === true){
           const resdata = response.data.data;
          const namesplit = resdata.name.split(" ");
          console.log(namesplit);
          setfirstname(namesplit[0]);
          setlastname(namesplit[1]);
          setadress(resdata.address);
          setmobileNumber(resdata.mobileNumber);
      }
    })
    .catch((err) => {
      console.log(err);
    });
}
    
}


   useEffect(()=>{
      getdetails();
   } )


const handlelogout = ()=>{
    cookies.remove("authToken");
    Router.push('/');
}

async function updateProfile(fname , lname , userAddress){
  let res = "";
  const data = {
      firstname : fname ,
      lastname : lname ,
      address : userAddress
  }
   const hitUrl =
     "https://licious-lite.herokuapp.com/api/update/updateDetails";
  const authToken = cookies.get("authToken");
  const header = {
    "Content-Type": "application/json",
    "authToken": authToken,
  };

if(authToken){
  await axios.put(hitUrl , data , {
    headers : header
  })
  .then((response)=>{
    console.log(response.data);
    return response.data ;
  })
   .catch((err)=>{
      console.log(err);
   })
 }
 return res ;
}



const handleSubmit = (event)=>{

  event.preventDefault() ;
  console.log(firstname + " "+lastname + " "+address);
  // const data = {
  //   "id" : 2 ,
  //   "firstname" :firstname,
  //   "lastname" :lastname
  // }

  const resdata = updateProfile(firstname ,lastname ,address) ;
  if(resdata.success && resdata.success === true){
     console.log(resdata + "updated successfully");
  }
  else{
       const authToken = cookies.get("authToken");
       const data = {
         "authToken": authToken,
         "firstname": firstname,
         "lastname": lastname,
         "address": address,

       };

       if ("serviceWorker" in navigator && "SyncManager" in window) {
         navigator.serviceWorker.ready.then(function (sw) {
          //  sw.sync.register("sync-new-profile");

           writedata("profile", data)
             .then(function () {
               console.log("sync new profile registered");
               return sw.sync.register("sync-new-profile");
             })
             .catch(function (err) {
               console.log(err);
             });
         });
       }
      console.log("failed to update");
  }
}


    return (
      <>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
          {/* <Script src = '/idb.js'></Script>
          <Script  src = '/utility.js'></Script> */}

        <div className={style.container}>
          <div className={style.update_box}>
            <Link href="/">
              <a className={style.back_link}>Home</a>
            </Link>
            <h1 id={style.heading}>Update profile</h1>
          </div>

          <div className={style.image_section}>
            <Image src={user} className={style.image} alt = "user Image"></Image>
            <input
              type="file"
              encType="multipart/form-data"
              placeholder="upload your image"

            />
          </div>

          <form autoComplete = "off" onSubmit={handleSubmit}>
            <div className={style.text_container}>
              <div className={style.name}>
                <div className={style.column_flex}>
                  <label className={style.label}>First Name</label>
                  <input
                    className={style.name_input}
                    name="firstname"
                    type="text"
                    autoComplete = "false"
                    onChange={handlefirstname}
                    value={firstname}
                  />
                </div>

                <div className={style.column_flex}>
                  <label className={style.label}>Last Name</label>
                  <input
                    className={style.name_input}
                    name="lastname"
                    type="text"
                    autoComplete = "false"
                    onChange={handlelastname}
                    value={lastname}
                  />
                </div>
              </div>

              <label className={style.label}>Phone no</label>
              <input
                className={style.input}
                disabled
                name="phoneNumber"
                type="tel"
                value={mobileNumber}
              />

              <label className={style.label}>Address</label>
              <input
                className={style.input}
                onChange={handleadress}
                name="address"
                type="text"
                autoComplete = "false"
                value={address}
              />

              <button className={style.btn}> Submit </button>
            </div>
          </form>
          <button onClick={handlelogout} className={style.btn_logout}>
            LOGOUT
          </button>
        </div>
      </>
    );

}


export default Profile ;