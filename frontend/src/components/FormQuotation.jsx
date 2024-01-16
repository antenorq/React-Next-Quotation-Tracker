import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";

//Bootstrap
import { Card } from "react-bootstrap";

//bootstrap5
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import FormControl from "react-bootstrap/FormControl";

//Context API
import { AuthContext } from "../context/AuthContext";

import { NumericFormat } from "react-number-format";

const FormQuotation = ({ formData, setFormData, customerList, handleSubmit, validated }) => {
  //userlogged
  const { user } = useContext(AuthContext);
  const userName = formData.userId.name;

  //ID PARAM FROM LIST QUOTATION EDIT BUTTOM
  const { id } = useParams();

  useEffect(() => {
    if (userName === undefined) {
      document.getElementById("username").setAttribute("value", user.name);
    } else {
      document.getElementById("username").setAttribute("value", userName);
    }
  }, [userName, user.name]);

  return (
    <Card className="card-custom-area">
      <Card.Header className="cardHeader-custom" as="h5">
        {id ? "UPDATE QUOTATION" : "ADD QUOTATION"}
      </Card.Header>
      <Card.Body>
        {/* START FORM HERE */}
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Row className="mb-3">
            {/*CUSTOMER*/}
            <Form.Group as={Col} md="6">
              <Form.Label>Customer / Business</Form.Label>
              <Form.Control as="select" required value={formData.customerId._id} onChange={(e) => setFormData({ ...formData, customerId: e.target.value })}>
                <option value="">Choose...</option>
                {customerList.map((customer) => (
                  <option key={customer._id} value={customer._id}>
                    {customer.name} / {customer.business}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>

            {/*QUOTE GIVEN*/}
            <Form.Group as={Col} md="2">
              <Form.Label>Quote Given</Form.Label>
              <NumericFormat
                customInput={FormControl}
                required
                thousandSeparator={false}
                prefix={""}
                allowNegative={false}
                decimalScale={2}
                placeholder="$0.00"
                value={formData.quoteGiven}
                onChange={(e) => setFormData({ ...formData, quoteGiven: e.target.value })}
              />

              <Form.Control.Feedback type="invalid">Quote Given Required</Form.Control.Feedback>
            </Form.Group>

            {/*STATUS*/}
            <Form.Group as={Col} md="2">
              <Form.Label>Status</Form.Label>
              <Form.Control as="select" required value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value })}>
                <option value="">Choose...</option>

                {/*admin or manager*/}
                {(user.type === 1 || user.type === 3) && (
                  <>
                    <option value="Pending">Pending</option>
                    <option value="Approved">Approved</option>
                    <option value="Finished"> Finished </option>
                    <option value="Canceled">Canceled</option>
                  </>
                )}

                {/*salesperson*/}
                {user.type === 2 && (
                  <>
                    <option value="Pending">Pending</option>
                    <option value="Canceled">Canceled</option>
                  </>
                )}
              </Form.Control>
              <Form.Control.Feedback type="invalid">Status Required</Form.Control.Feedback>
            </Form.Group>

            {/*SALESPERSON*/}
            <Form.Group as={Col} md="2">
              <Form.Label>Salesperson</Form.Label>
              <Form.Control
                readOnly
                disabled
                type="text"
                id="username"
                //value={userName}
              />
            </Form.Group>
          </Row>

          <Row className="mb-3">
            {/*QUOTE DETAIL*/}
            <Form.Group as={Col} md="6">
              <Form.Label>Quote Note</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                required
                value={formData.quoteDetails}
                onChange={(e) => setFormData({ ...formData, quoteDetails: e.target.value })}
              />
              <Form.Control.Feedback type="invalid">Quote Details Required</Form.Control.Feedback>
            </Form.Group>

            {/*DATE*/}
            <Form.Group as={Col} md="2">
              <Form.Label>Date</Form.Label>
              <Form.Control required type="date" value={formData.date} onChange={(e) => setFormData({ ...formData, date: e.target.value })} />
              <Form.Control.Feedback type="invalid">Date Required</Form.Control.Feedback>
            </Form.Group>

            {/*FOLLOW UP*/}
            <Form.Group as={Col} md="2">
              <Form.Label>Follow Up</Form.Label>
              <Form.Control required type="date" value={formData.followUp} onChange={(e) => setFormData({ ...formData, followUp: e.target.value })} />
              <Form.Control.Feedback type="invalid">Follow Up Required</Form.Control.Feedback>
            </Form.Group>
          </Row>

          <Row className="mb-5">
            {/*QUOTATION PDF*/}
            <Form.Group as={Col} md="6">
              <Form.Label>Quotation File</Form.Label>
              <Form.Control
                required={id ? false : true}
                name="file"
                type="file"
                accept=".pdf"
                onChange={(e) => setFormData({ ...formData, file: e.target.files[0] })}
              />
              <Form.Control.Feedback type="invalid">Quotation File Required</Form.Control.Feedback>
            </Form.Group>
          </Row>

          <Button type="submit">{id ? "Update Quotation" : "Submit Quotation"}</Button>
        </Form>
        {/* END FORM HERE */}
      </Card.Body>
    </Card>
  );
};

export default FormQuotation;
