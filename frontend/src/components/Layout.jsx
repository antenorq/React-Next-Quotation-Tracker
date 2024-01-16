import { useState, useEffect, useContext } from "react";
import "./Layout.css";

import SideBar from "../components/SideBar";
import NavBarComp from "../components/NavBarComp";
import Container from "react-bootstrap/Container";

//Context API
import { AuthContext } from "../context/AuthContext";

const Layout = ({ children, activeLayout }) => {
  const [open, setOpen] = useState("open");

  const { user } = useContext(AuthContext);

  //choose the screen size
  const handleResize = () => {
    if (window.innerWidth < 720) {
      setOpen("");
    } else {
      setOpen("open");
    }
  };

  //create an event listener everytime when resize
  useEffect(() => {
    window.addEventListener("resize", handleResize);
  });

  useEffect(() => {
    handleResize();
  }, []);

  if (activeLayout === false) {
    return children;
  } else {
    return (
      <>
        <SideBar open={open} user={user} />
        <section className="main-content">
          <NavBarComp open={open} setOpen={setOpen} />
          <Container fluid className="geral-container">
            <Container fluid className="white-container">
              {children}
            </Container>
          </Container>
        </section>
      </>
    );
  }
};

export default Layout;
