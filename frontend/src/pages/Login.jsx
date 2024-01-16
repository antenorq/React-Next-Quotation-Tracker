import { useContext, useState } from "react";

import "./Login.css";
import loginImg from "../assets/img/login-img.png";
//import logo from "../assets/img/logo.png";
import { useNavigate } from "react-router-dom";

//Context API
import { AuthContext } from "../context/AuthContext";

//Toastify
import { toast } from "react-toastify";

//Google Login
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  console.log("ATUAL", email, password);

  const { setUser } = useContext(AuthContext);

  const navigate = useNavigate();

  //Google Login Functions
  const responseMessage = (response) => {
    const userObject = jwtDecode(response.credential);
    console.log(userObject);
    console.log(userObject.email);
    setEmail(userObject.email);

    if (userObject.email_verified && userObject.email) {
      handleSubmitGoogleLogin(userObject.email);
    }
  };
  const errorMessage = (error) => {
    console.log(error);
  };

  //SUBMIT REGULAR
  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = { email, password };
    await fetch(process.env.REACT_APP_API_URL + "/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res._id) {
          toast.success("User Logged Successfuly");
          setEmail("");
          setPassword("");
          setUser(res);
          localStorage.setItem("user", JSON.stringify(res));
          navigate("/");
        }
        if (res.errors) {
          res.errors.map((error) => toast.error(error));
        }
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  //SUBMIT GOOGLE LOGIN
  const handleSubmitGoogleLogin = async (email) => {
    const data = { email };

    await fetch(process.env.REACT_APP_API_URL + "/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res._id) {
          toast.success("User Logged Successfuly");
          setEmail("");
          setUser(res);
          localStorage.setItem("user", JSON.stringify(res));
          navigate("/");
        }
        if (res.errors) {
          res.errors.map((error) => toast.error(error));
        }
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  return (
    <main>
      <section className="form_module">
        <div className="container-fluid">
          <div className="row justify-content-center align-items-center">
            <div className="col-md-6 col-12 login_left_img">
              <img src={loginImg} alt="" className="img-fluid" />
            </div>
            <div className="col-md-6 col-12 form_fields">
              <div className="form_logo">
                LOGIN
                <br />
                <br />
              </div>
              <div style={{ textAlign: "-webkit-center" }}>
                <GoogleLogin onSuccess={responseMessage} onError={errorMessage} shape={"pill"} theme="filled_blue" width={250} />
              </div>
              <br></br>
              <br></br>

              <div style={{ textAlign: "center" }}>OR</div>
              <br></br>
              <br></br>
              <div className="form_inner">
                <div className="form-group">
                  <label>Username/Email</label>
                  <input type="text" className="form-control" name="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="form-group">
                  <label>Password</label>
                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    required={true}
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <div className="form_links">
                    <a href="/">Forgot your password?</a>
                  </div>
                </div>
                <div className="form_btn">
                  <button className="form-btn" onClick={handleSubmit}>
                    Login
                  </button>
                </div>
                <br />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Login;
