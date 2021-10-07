import Cookies from "universal-cookie";
import axios from "axios";

async function getcartItems() {

   const cookies = new Cookies();

  const authToken = cookies.get("authToken");
  const header = {
    "Content-Type": "application/json",
    "authToken": authToken,
  };

  const getUrl = "http://localhost:5000/api/Cart/getCartItems";
  let data  ;
  if (authToken) {
    await axios
      .get(getUrl, { headers: header })
      .then((response) => {
        console.log(response.data);
        data = response.data;      
      })
      .catch((err) => {
      });
  }
  return data ; 
}

export default getcartItems;
