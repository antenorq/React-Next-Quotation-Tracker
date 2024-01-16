import { useState, useEffect, useContext } from "react";
//Toastify
import { toast } from "react-toastify";
//Context API
import { AuthContext } from "../context/AuthContext";

const useListCustomers = () => {
  const [customerList, setCustomerList] = useState([]);

  //userlogged
  const { user } = useContext(AuthContext);

  //Load Customers data from api to populate the select input
  useEffect(() => {
    try {
      fetch(process.env.REACT_APP_API_URL + "/api/customers/list", {
        headers: {
          Authorization: "Bearer " + user.token,
        },
      })
        .then((result) => result.json())
        .then((res) => {
          if (res.errors) {
            res.errors.map((error) => toast.error(error));
          } else {
            setCustomerList(res);
          }
        })
        .catch((err) => {
          toast.error(err);
        });
    } catch (error) {
      toast.error(error);
    }
  }, [user.token]);

  return customerList;
};

export default useListCustomers;
