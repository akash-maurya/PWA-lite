import { useState } from "react";
import { useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import "bootstrap/dist/css/bootstrap.css";
import axios from "axios";
import Styles from "/styles/profilePage.module.css";
import { openDB } from "idb";

//import Localbase from "localbase";
function profilePage(props) {
  const router = useRouter();

  const mobileNumber = router.query.mobile;

  const [nameValue, setnameValue] = useState("");
  const [imageValue, setimageValue] = useState("/Images/profile_icon_2.svg");
  const [addressValue, setaddressValue] = useState("");
  const [orderValue, setorderValue] = useState("");
  const [isvalid, setisvalid] = useState(false);

  useEffect(() => {
    Promise.resolve(getUserInfo()).then((userdata) => {
      const data = {
        mobileNumber: mobileNumber,
        name: userdata[0].name,
        address: userdata[0].address,
        image: userdata[0].image,
      };
      writeData(data, mobileNumber)
        .then(() => console.log("Details written to IndexedDb"))
        .catch((err) => console.log(err));
      if (userdata.length != 0) {
        if (typeof userdata[0].name != undefined)
          setnameValue(userdata[0].name);
        if (typeof userdata[0].address != undefined)
          setaddressValue(userdata[0].address);
        if (typeof userdata[0].image != undefined)
          setimageValue(userdata[0].image);
        if (typeof userdata[0].orderCount != undefined)
          setorderValue(userdata[0].orderCount);
      }
    });
  }, []);

  //Function for creating and writing data in indexedDb
  async function writeData(data, key) {
    const dbPromise = openDB("profile", 1, {
      upgrade(db) {
        db.createObjectStore("info");
      },
    });

    return (await dbPromise).put("info", data, key);
  }
  async function getUserInfo() {
    try {
      const abc = mobileNumber;
      const res = await fetch(`http://localhost:8000/profilePage/${abc}`, {
        method: "GET",
        header: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      return data;
    } catch (err) {
      return err.message;
    }
  }

  function saveUserdetails() {
    const searchtag = mobileNumber;
    let user = {
      name: nameValue,
      address: addressValue,
      image: imageValue,
    };
    console.log(JSON.stringify(user));
    const api = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };
    axios
      .put(`http://localhost:8000/profilePage/${searchtag}`, user, {
        headers: api,
      })
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  function submitHandler(event) {
    let userDetails = {
      mobileNumber: mobileNumber,
      name: nameValue,
      address: addressValue,
      image: imageValue,
    };
    console.log(userDetails);
    saveUserdetails();
    if ("serviceWorker" in navigator && "SyncManager" in window) {
      navigator.serviceWorker.ready.then(function (sw) {
        writeData(userDetails, mobileNumber)
          .then(function () {
            return sw.sync.register("profileUpdate");
          })
          .catch(function (err) {
            console.log(err);
          });
      });
    } else {
      saveUserdetails();
    }

    // setisvalid(validate());
    // if (isvalid) {

    //   //db.collection('user').add(userDetails);

    // }
    event.preventDefault();
  }

  function nameHandler(event) {
    setnameValue(event.target.value);
  }

  function imageHandler(event) {
    setimageValue(event.target.value);
  }
  function addressHandler(event) {
    setaddressValue(event.target.value);
  }

  function validate() {
    let name_err = false;
    let add_err = false;
    if (nameValue.length > 4 && nameValue.length < 26) {
      name_err = true;
    }

    if (addressValue.length > 5 && addressValue < 255) {
      add_err = true;
    }
    if (name_err == true && add_err == true) {
      return true;
    }
    return false;
  }

  return (
    <div className="row justify-content-center mb-3 pb-3">
      <div>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        <div className="d-flex p-1 justify-content-between col-lg-10">
          <h1 className="flex-grow-1 text-center p-1">My Profile</h1>
        </div>
        <div className={`my-1 ${Styles.imgbox} col-lg-10`}>
          <div className="d-flex flex-column text-center">
            <div>
              <img
                className={Styles.profilepic}
                src={imageValue}
                alt="Profile pic"
              />
            </div>
          </div>
        </div>
        <fieldset>
          <form onSubmit={submitHandler} className="InputForm col-lg-10">
            <div className="my-2">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                id="name"
                type="text"
                className="form-control"
                onChange={nameHandler}
                value={nameValue}
                placeholder="Name"
              ></input>
              <small className="form-text text-muted">
                Please enter your full name.
              </small>
            </div>
            <div className="my-2">
              <label htmlFor="mob-number" className="form-label">
                Mobile
              </label>
              <input
                id="mob-number"
                type="number"
                className="form-control"
                value={mobileNumber}
                placeholder="Mobile number"
                readOnly
              ></input>
            </div>
            <div className="my-2">
              <label htmlFor="address" className="form-label">
                Address
              </label>

              <input
                id="address"
                type="text"
                className="form-control"
                value={addressValue}
                onChange={addressHandler}
                placeholder="Address"
              ></input>
              <small className="form-text text-muted">
                Items will be delivered to this address.
              </small>
            </div>
            <div className="my-2">
              <label htmlFor="image" className="form-label">
                Image
              </label>

              <input
                id="image"
                type="url"
                className="form-control"
                value={imageValue}
                onChange={imageHandler}
                placeholder="Image Url"
              ></input>
            </div>
            <div className="my-2">
              <label htmlFor="ordercount" className="form-label">
                Orders Placed
              </label>

              <input
                id="ordercount"
                type="number"
                className="form-control"
                value={orderValue}
                placeholder="Orders Placed"
                readOnly
              ></input>
            </div>
            <div className="text-center">
              <button
                type="submit"
                className={`${Styles.submitbtn} btn`}
                onClick={submitHandler}
                disabled={isvalid}
              >
                Submit
              </button>
            </div>
          </form>
        </fieldset>
      </div>
    </div>
  );
}

export default profilePage;
