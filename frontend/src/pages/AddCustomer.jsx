import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

//Bootstrap
import { Card } from "react-bootstrap";

//bootstrap5
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";

//components
import Layout from "../components/Layout";

//Toastify
import { toast } from "react-toastify";

//Context API
import { AuthContext } from "../context/AuthContext";

const AddCustomer = () => {
  const [validated, setValidated] = useState(false);
  const [name, setName] = useState("");
  const [business, setBusiness] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const navigate = useNavigate();

  const { user } = useContext(AuthContext);

  //SUBMIT
  const handleSubmit = async (event) => {
    event.preventDefault();
    setValidated(true);

    const form = event.currentTarget;
    //invalid
    if (form.checkValidity() === false) {
      event.stopPropagation();
      return;
    }

    try {
      const formData = { name, business, email, phone, address };

      await fetch(process.env.REACT_APP_API_URL + "/api/customers/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + user.token,
        },
        body: JSON.stringify(formData),
      })
        .then((res) => res.json())
        .then((res) => {
          if (res._id) {
            toast.success("Customer Add Successfully");
            navigate("/list_customer");
          }
          if (res.errors) {
            res.errors.map((error) => toast.error(error));
          }
        })
        .catch((err) => {
          toast.error(err);
        });
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <Layout>
      <Card className="card-custom-area">
        <Card.Header className="cardHeader-custom" as="h5">
          ADD CUSTOMER
        </Card.Header>
        <Card.Body>
          {/* START FORM HERE */}
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Row className="mb-3">
              {/*NAME*/}
              <Form.Group as={Col} md="4">
                <Form.Label>Name</Form.Label>
                <Form.Control required type="text" value={name} onChange={(e) => setName(e.target.value)} />
                <Form.Control.Feedback type="invalid">Name Required</Form.Control.Feedback>
              </Form.Group>

              {/*BUSINESS*/}
              <Form.Group as={Col} md="4">
                <Form.Label>Business</Form.Label>
                <Form.Control required type="text" value={business} onChange={(e) => setBusiness(e.target.value)} />
                <Form.Control.Feedback type="invalid">Business Required</Form.Control.Feedback>
              </Form.Group>

              {/*EMAIL*/}
              <Form.Group as={Col} md="4">
                <Form.Label>Email</Form.Label>
                <InputGroup hasValidation>
                  <Form.Control required type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                  <Form.Control.Feedback type="invalid">Email Required</Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
            </Row>

            <Row className="mb-3">
              {/*ADDRESS*/}
              <Form.Group as={Col} md="8">
                <Form.Label>Address</Form.Label>
                <Form.Control required type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
                <Form.Control.Feedback type="invalid">Address Required</Form.Control.Feedback>
              </Form.Group>

              {/*PHONE*/}
              <Form.Group as={Col} md="4">
                <Form.Label>Phone</Form.Label>
                <Form.Control required type="number" value={phone} onChange={(e) => setPhone(e.target.value)} />
                <Form.Control.Feedback type="invalid">Phone Required</Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Button type="submit">Submit form</Button>
          </Form>
          {/* END FORM HERE */}
        </Card.Body>
      </Card>
    </Layout>
  );
};

export default AddCustomer;
