import style from "../styles/cart.module.css";
import Cookies from "universal-cookie";
import axios from "axios";





const item_bar = (props) => {



const cookies = new Cookies();

  const handleDelete = () => {
    const hitUrl = `http://localhost:5000/api/Cart/deleteItem`;
    const authToken = cookies.get("authToken");
    const header = {
      "Content-Type": "application/json",
      "authToken": authToken,
    };
   const data  = {"itemID" : props.itemId};
   console.log(data);
    if (authToken) {
      console.log("called");
      axios
        .put(hitUrl, data ,{
          headers: header,
        })
        .then((response) => {
          console.log("item deleted successfully");
          props.refresh();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <>
      <div className={style.product_container}>
        <h2>
          <span>Item</span> : {props.name} 
        </h2>
        <p>
          <span>Amount </span>: {props.amount}Rs
        </p>
        <button className = {style.delete} onClick={handleDelete}>Delete</button>
      </div>
    </>
  );
};

export default item_bar;
