/* eslint-disable react/prop-types */
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { useState } from "react";
import { countryNamesList } from "../utils";
import { useEffect } from "react";
import { checkEmptyProperties } from "../utils";

const INITIAL_INPUTS_VALUE = {
  firstName: "",
  lastName: "",
  email: "",
  company: "",
  country: "",
};

export function CustomerFormModal(props) {
  const [customerFromForm, setCustomerFromForm] =
    useState(INITIAL_INPUTS_VALUE);

  const [validated, setValidated] = useState(false);

  const { title, handleSubmit, customer } = props;

  useEffect(() => {
    setValidated(false);

    if (customer) {
      const customerDetails = {
        ...customerFromForm,
        firstName: customer.firstName,
        lastName: customer.lastName,
        email: customer.email,
        company: customer.company,
        country: customer.country,
      };

      if (customer.id) {
        customerDetails.id = customer.id;
      }

      setCustomerFromForm(customerDetails);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [customer]);

  const handleFormSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);

    if (checkEmptyProperties(customerFromForm)) {
      handleSubmit(customerFromForm);
    }

    setCustomerFromForm(INITIAL_INPUTS_VALUE);
  };

  const handleClose = () => {
    setValidated(false);
    setCustomerFromForm(INITIAL_INPUTS_VALUE);
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton onHide={handleClose}>
        <Modal.Title id="contained-modal-title-vcenter">{title}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form
          noValidate
          validated={validated}
          className="px-2 py-3 justify-content-center"
        >
          <Row className="d-flex justify-content-center justify-content-md-start align-items-center">
            <Col xs="auto">
              <Form.Group className="mb-3" controlId="firstName">
                <Form.Label>Nombre *</Form.Label>
                <Form.Control
                  required
                  autoFocus
                  type="text"
                  placeholder="Antonio"
                  value={customerFromForm.firstName}
                  onChange={(e) =>
                    setCustomerFromForm({
                      ...customerFromForm,
                      firstName: e.target.value,
                    })
                  }
                  autoComplete="off"
                />
              </Form.Group>
            </Col>

            <Col xs="auto">
              <Form.Group className="mb-3" controlId="lastName">
                <Form.Label>Apellido *</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="García"
                  value={customerFromForm.lastName}
                  onChange={(e) =>
                    setCustomerFromForm({
                      ...customerFromForm,
                      lastName: e.target.value,
                    })
                  }
                  autoComplete="off"
                />
              </Form.Group>
            </Col>

            <Col xs="auto">
              <Form.Group className="mb-3" controlId="email">
                <Form.Label>Email *</Form.Label>
                <Form.Control
                  required
                  type="email"
                  placeholder="ejemplo@mail.com"
                  value={customerFromForm.email}
                  onChange={(e) =>
                    setCustomerFromForm({
                      ...customerFromForm,
                      email: e.target.value,
                    })
                  }
                  autoComplete="off"
                />
              </Form.Group>
            </Col>

            <Col xs="auto">
              <Form.Group className="mb-3" controlId="company">
                <Form.Label>Empresa *</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Mercadona"
                  value={customerFromForm.company}
                  onChange={(e) =>
                    setCustomerFromForm({
                      ...customerFromForm,
                      company: e.target.value,
                    })
                  }
                  autoComplete="off"
                />
              </Form.Group>
            </Col>

            <Col xs="auto">
              <Form.Group className="mb-3" controlId="company">
                <Form.Label>País</Form.Label>

                <Form.Select
                  value={customerFromForm.country}
                  onChange={(e) =>
                    setCustomerFromForm({
                      ...customerFromForm,
                      country: e.target.value,
                    })
                  }
                >
                  <option></option>
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
        <Button onClick={handleFormSubmit}>Aceptar</Button>
      </Modal.Footer>
    </Modal>
  );
}
