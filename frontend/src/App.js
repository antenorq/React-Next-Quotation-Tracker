import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useContext, useEffect } from "react";

//CSS
import "./App.css";

//Booststrap 5
import "bootstrap/dist/css/bootstrap.min.css";

//Components
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ListCustomer from "./pages/ListCustomer";
import ListUser from "./pages/ListUser";
import AddCustomer from "./pages/AddCustomer";
import ListQuotation from "./pages/ListQuotation";
import AddQuotation from "./pages/AddQuotation";
import UpdateQuotation from "./pages/UpdateQuotation";

//Toastify
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

//Context API
import { AuthContext } from "./context/AuthContext";

function App() {
  const { user, setUser } = useContext(AuthContext);

  useEffect(() => {
    // Check if user and token are stored in localStorage
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, [setUser]);

  return (
    <BrowserRouter>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        draggable={false}
        pauseOnHover
        theme="colored"
      />
      <Routes>
        <Route path="/" element={user ? <Home /> : <Login />} />
        <Route path="/login" element={user ? <Home /> : <Login />} />
        <Route path="/register" element={user ? <Register /> : <Login />} />
        <Route path="/list_user" element={user ? <ListUser /> : <Login />} />
        <Route path="/list_customer" element={user ? <ListCustomer /> : <Login />} />
        <Route path="/list_quotation" element={user ? <ListQuotation /> : <Login />} />
        <Route path="/add_customer" element={user ? <AddCustomer /> : <Login />} />
        <Route path="/add_quotation" element={user ? <AddQuotation /> : <Login />} />
        <Route path="/update_quotation/:id" element={user ? <UpdateQuotation /> : <Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
