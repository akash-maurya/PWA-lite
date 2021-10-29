import style from "../../styles/cart.module.css";
import Cookies from "universal-cookie";
import axios from "axios";
import ItemBar from "../../components/itemBar";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Fallback from "../../components/fallback";
// import getcartItems from '../api/cartitems';

const Cart = (props) => {
  // call backend api to collect user cart items
  const cookies = new Cookies();
  const [items, setItems] = useState([]);
  const [cost, settotalCost] = useState(0);
  const [numberOfitem, setNumItems] = useState(0);
  const [proceed, setProceed] = useState(false);
  const [nonetwork, setnonetwork] = useState(false);
  async function getcartItems() {
    // const cookies = new Cookies();

    const authToken = cookies.get("authToken");
    const header = {
      "Content-Type": "application/json",
      authToken: authToken,
    };

    const getUrl = "https://licious-lite.herokuapp.com/api/Cart/getCartItems";

    if (authToken) {
      await axios
        .get(getUrl, { headers: header })
        .then((response) => {
          console.log(response.data);
          const data = response.data;
          setItems(data);
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
  });

  const handleCheckout = () => {
    const hitUrl = "https://licious-lite.herokuapp.com/api/update/getdetails";
    const authToken = cookies.get("authToken");
    const header = {
      "Content-Type": "application/json",
      authToken: authToken,
    };

    if (authToken) {
      axios
        .get(hitUrl, {
          headers: header,
        })
        .then((response) => {
          console.log(response.data);

          if (response.data.success === true) {
            if (response.data.address.length != 0) {
              setProceed(true);
            }
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  //------------------------------ Cart JSX ---------------------------------
  return (
    <>
      <div className="sticky-sm-top">
        <div
          className={`text-center d-flex bd-highlight`}
          style={{ background: "#e41d36" }}
        >
          <div className="p-2 bd-highlight">
            <Link href="/">
              <a style={{ color: "#4A4A4A" }}>{`<`}</a>
            </Link>
          </div>
          <div className="p-2 flex-grow-1 bd-highlight">
            <h2 style={{ color: "#fff" }}>Cart</h2>
          </div>
        </div>
      </div>
      <div className="container-sm col-sm-6">
        <div className={style.countAndPricing}>
          <h5>
            Total Items in your cart{" "}
            <button className={style.count}>{numberOfitem}</button>
          </h5>
        </div>

        <div>
          <div className="card text-center">
            <div className="card-header text-start">Order Summary</div>
            <div className="list-group list-group-flush">
              {items.map((item) => {
                // console.log(item._id);
                return (
                  <div className="list-group-item">
                    <ItemBar
                      key={item._id}
                      itemId={item._id}
                      name={item.name}
                      amount={item.amount}
                      refresh={getcartItems}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div>
          <div className={`text-center d-flex flex-row bd-highlight`}>
            <div
              className={`p-2 flex-fill bd-highlight align-self-center`}
              style={{ background: "#fff" }}
            >
              <h5>
                <small className="text-muted">Total : </small>
                <span>₹{cost}</span>
              </h5>
            </div>

            <Link href="/checkout" passHref>
              <button
                className={`p-2 flex-fill bd-highlight btn`}
                style={({ color: "#fff" }, { background: "#e41d36" })}
              >
                <h5 style={{ color: "#fff" }}>
                  Checkout
                  <span>{` `}</span>
                  <img src="/play-symbol c.png" alt="Arrow image"></img>
                </h5>
                <style jsx>
                  {`
                     {
                      color: "#fff";
                    }
                  `}
                </style>
              </button>
            </Link>
          </div>
        </div>

        {nonetwork && <Fallback />}
      </div>
    </>
  );
};

export default Cart;
