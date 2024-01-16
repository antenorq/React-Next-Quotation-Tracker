import { useContext, useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

//Context
import { AuthContext } from "../context/AuthContext";

//CSS
import "./NavBarComp.css";

//canada-usa flags
import canada from "../assets/img/canada.png";
import usa from "../assets/img/usa.png";

const NavBarComp = ({ open, setOpen }) => {
  const [userType, setUserType] = useState("");
  const { user, logout } = useContext(AuthContext);

  useEffect(() => {
    if (user.type === 1) setUserType("Admin");
    if (user.type === 2) setUserType("Salesperson");
    if (user.type === 3) setUserType("Manager");
    if (user.type === 4) setUserType("Frontdesk");
  }, [user.type]);

  const toggleopen = () => {
    open === "open" ? setOpen("") : setOpen("open");
  };

  return (
    <Navbar fixed="top" expand="lg" className="navbar-custom">
      <Container fluid>
        <i className="bx bx-menu" id="btn" onClick={toggleopen}></i>
        <Navbar.Brand className="">{user.name}</Navbar.Brand>
        {/* <Navbar.Toggle aria-controls="basic-navbar-nav" /> */}
        {/* <Navbar.Collapse id="basic-navbar-nav"> */}
        <Nav className="justify-content-end flex-grow-1 pe-5">
          <Navbar.Text>
            {user.location === "CANADA" && <img className="flag" src={canada} alt="" />}
            {user.location === "USA" && <img className="flag" src={usa} alt="" />}
          </Navbar.Text>
          <NavDropdown title={userType} id="basic-nav-dropdown">
            <NavDropdown.Item href="#">Profile</NavDropdown.Item>
            <NavDropdown.Item href="#">Info</NavDropdown.Item>
            <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
          </NavDropdown>
        </Nav>
        {/* </Navbar.Collapse> */}
      </Container>
    </Navbar>
  );
};

export default NavBarComp;
