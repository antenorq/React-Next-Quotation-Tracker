import { useEffect, useState, useContext } from "react";
import Layout from "../components/Layout";
import { Row, Col, Card } from "react-bootstrap";
import "./Home.css";
import ListQuotation from "./ListQuotation";

//Toastify
import { toast } from "react-toastify";

//Context API
import { AuthContext } from "../context/AuthContext";

const Home = () => {
  //const [rowData, setRowData] = useState(null);
  const [qtdPending, setQtdPending] = useState(0);
  const [qtdFinished, setQtdFinished] = useState(0);
  const [qtdCanceled, setQtdCanceled] = useState(0);
  const [qtdApproved, setQtdApproved] = useState(0);

  const { user, logout } = useContext(AuthContext);

  console.log(user);

  //Load ALL Quotation data from api
  useEffect(() => {
    try {
      fetch(process.env.REACT_APP_API_URL + "/api/quotation/list", {
        headers: {
          Authorization: "Bearer " + user.token,
        },
      })
        .then((result) => result.json())
        .then((res) => {
          //console.log(res);
          if (res.errors) {
            res.errors.map((error) => toast.error(error));
          } else {
            //setRowData(res);
            //let total = 0;
            let pending = 0;
            let finished = 0;
            let canceled = 0;
            let approved = 0;
            res.map((res) => {
              if (res.status === "Pending") pending = pending + 1;
              if (res.status === "Finished") finished = finished + 1;
              if (res.status === "Canceled") canceled = canceled + 1;
              if (res.status === "Approved") approved = approved + 1;
              return "";
            });
            setQtdPending(pending);
            setQtdFinished(finished);
            setQtdCanceled(canceled);
            setQtdApproved(approved);
          }
        })
        .catch((err) => {
          toast.error(err.message);
          logout();
        });
    } catch (error) {
      toast.error(error.message);
    }
  }, [user.token, logout]);

  return (
    <Layout>
      <Row>
        <Col className="mb-4" sm={12} md={6} lg={3}>
          <Card className="card-custom finished">
            <Card.Body>
              <div className="title-content">Finished</div>
              <span className="info-content">{qtdFinished}</span>
            </Card.Body>
          </Card>
        </Col>
        <Col className="mb-4 " sm={12} md={6} lg={3}>
          <Card className="card-custom pending">
            <Card.Body>
              <div className="title-content">Pending</div>
              <span className="info-content">{qtdPending}</span>
            </Card.Body>
          </Card>
        </Col>
        <Col className="mb-4" sm={12} md={6} lg={3}>
          <Card className="card-custom canceled">
            <Card.Body>
              <div className="title-content">Canceled</div>
              <span className="info-content">{qtdCanceled}</span>
            </Card.Body>
          </Card>
        </Col>
        <Col className="mb-4" sm={12} md={6} lg={3}>
          <Card className="card-custom approved">
            <Card.Body>
              <div className="title-content">Approved</div>
              <span className="info-content">{qtdApproved}</span>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/*// CARD //*/}
      <Card className="card-custom-area">
        <Card.Header className="cardHeader-custom" as="h5">
          Quotation Tracker
        </Card.Header>
        <Card.Body>
          <ListQuotation activeLayout={false} />
        </Card.Body>
      </Card>
    </Layout>
  );
};

export default Home;
