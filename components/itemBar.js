import style from "../styles/cart.module.css";
import Cookies from "universal-cookie";
import axios from "axios";





const item_bar = (props) => {



const cookies = new Cookies();

  const handleDelete = () => {
    const hitUrl = `https://licious-lite.herokuapp.com/api/Cart/deleteItem`;
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
      <div className="justify-content-between">
      <div className="d-flex flex-row bd-highlight">
        <div className="p-2 flex-grow-1 bd-highlight text-start">
          <h5>{props.name}</h5>
          <h6>
            <span>₹ </span>: {props.amount}Rs
          </h6>

        </div>
        <div className="p-2 bd-highlight">
          <button className={style.delete}>Delete</button>
        </div>
      </div>
    </div>
    </>
  );
};

export default item_bar;
