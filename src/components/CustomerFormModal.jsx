/* eslint-disable react/prop-types */
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { useState } from "react";
import { countryNamesList } from "../utils";
import { useEffect } from "react";

export function CustomerFormModal(props) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [country, setCountry] = useState("");

  useEffect(() => {
    console.log(props.customer);

    if (props.customer) {
      setFirstName(props.customer.firstName);
      setLastName(props.customer.lastName);
      setEmail(props.customer.email);
      setCompany(props.customer.company);
      setCountry(props.customer.country);
    }
  }, [props.customer]);

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {props.title}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form className="px-2 py-3 justify-content-center">
          <Row className="d-flex justify-content-center justify-content-md-start align-items-center">
            <Col xs="auto">
              <Form.Group className="mb-3" controlId="firstName">
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Antonio"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  autoComplete="off"
                />
              </Form.Group>
            </Col>

            <Col xs="auto">
              <Form.Group className="mb-3" controlId="lastName">
                <Form.Label>Apellido</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="García"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  autoComplete="off"
                />
              </Form.Group>
            </Col>

            <Col xs="auto">
              <Form.Group className="mb-3" controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="ejemplo@mail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="off"
                />
              </Form.Group>
            </Col>

            <Col xs="auto">
              <Form.Group className="mb-3" controlId="company">
                <Form.Label>Empresa</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Mercadona"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  autoComplete="off"
                />
              </Form.Group>
            </Col>

            <Col xs="auto">
              <Form.Group className="mb-3" controlId="company">
                <Form.Label>País</Form.Label>

                <Form.Select
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                >
                  <option>Elige el país</option>
                  {countryNamesList.map((countryName, index) => (
                    <option key={index}>{countryName}</option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button onClick={props.onHide}>Aceptar</Button>
      </Modal.Footer>
    </Modal>
  );
}
