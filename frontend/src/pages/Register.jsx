import { useState } from "react";

import "./Register.css";
// import loginImg from "../assets/img/login-img.png";
// import logo from "../assets/img/logo.png";

import { Link, useNavigate } from "react-router-dom";
import Layout from "../components/Layout";

//Toastify
import { toast } from "react-toastify";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [location, setLocation] = useState("");
  const [type, setType] = useState(2);
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  //SUBMIT
  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const data = { name, email, password, confirmPassword, location, type };

      await fetch(process.env.REACT_APP_API_URL + "/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((res) => res.json())
        .then((res) => {
          if (res._id) {
            toast.success("User Registered Successfuly");
            setName("");
            setEmail("");
            setLocation("");
            setPassword("");
            setConfirmPassword("");
            setType("");
            console.log(res);
            navigate("/list_user");
          }
          if (res.errors) {
            res.errors.map((error) => toast.error(error));
          }
        })
        .catch((err) => {
          toast.error(err);
        });
    } catch (error) {
      toast.error("popopo");
    }
  };

  return (
    <Layout>
      <main>
        <section className="form_module">
          <div className="container-fluid">
            <div className="row justify-content-center align-items-center">
              {/* <div className="col-md-6 col-12 login_left_img">
                <img src={loginImg} alt="" />
              </div> */}
              <div className="col-md-6 col-12 form_fields">
                <div className="form_logo">
                  {/* <img src={logo} alt="" /> */}
                  <b>REGISTER USER</b>
                </div>
                <div className="form_inner">
                  <form>
                    <div className="form-group">
                      <label>Username</label>
                      <input type="text" className="form-control" name="name" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className="form-group">
                      <label>Email</label>
                      <input type="text" className="form-control" name="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="form-group">
                      <label>Location</label>
                      <select name="location" className="form-control" value={location} onChange={(e) => setLocation(e.target.value)}>
                        <option value="">Choose a Option</option>
                        <option value="CANADA">CANADA</option>
                        <option value="USA">USA</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Password</label>
                      <input
                        type="password"
                        className="form-control"
                        name="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label>Confirm Password</label>
                      <input
                        type="password"
                        className="form-control"
                        name=""
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label>User Access Type</label>
                      <select name="type" className="form-control" value={type} onChange={(e) => setType(e.target.value)}>
                        <option value="1">Admin</option>
                        <option value="2">Salesperson</option>
                        <option value="3">Manager</option>
                        <option value="4">Frontdesk</option>
                      </select>
                    </div>

                    <div className="form_btn">
                      <button className="form-btn" onClick={handleSubmit}>
                        Signup
                      </button>
                    </div>
                    <div className="form_links">
                      <Link to="/login">Already have an account?</Link>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
};

export default Register;
