import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Alert from "react-bootstrap/Alert";
import { SearchIconSVG } from "../assets/svg/SearchIconSVG";

// eslint-disable-next-line react/prop-types
export function SearchForm({ handleSetSearchTerms, resetSearchTerms }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");

  const [showErrorMsg, setShowErrorMsg] = useState(false);

  const clearInputFields = () => {
    setFirstName("");
    setLastName("");
    setEmail("");
    setCompany("");

    resetSearchTerms();
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!firstName && !lastName && !email && !company) {
      setShowErrorMsg(true);
      setTimeout(() => {
        setShowErrorMsg(false);
      }, 2600);

      return;
    }

    const inputsSearchTerms = {
      firstName,
      lastName,
      email,
      company,
    };

    handleSetSearchTerms(inputsSearchTerms);
  };

  return (
    <section className="card">
      <div className="card-header d-flex align-items-center">
        <SearchIconSVG />
        <h3 className="pt-2 px-2">Buscar clientes:</h3>
      </div>

      <div className="card-body px-md-5">
        <Form onSubmit={handleSubmit} className="py-3 justify-content-center">
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
              <Button variant="primary" type="submit" className="mt-3">
                <SearchIconSVG />
                <span className="px-2">Buscar</span>
              </Button>
            </Col>

            <Col xs="auto">
              <Button
                variant="dark"
                className="mt-3"
                onClick={clearInputFields}
              >
                <span className="px-2">Restablecer</span>
              </Button>
            </Col>
          </Row>
        </Form>

        {showErrorMsg && (
          <Alert variant="primary">
            Por favor ingresa al menos un término de búsqueda.
          </Alert>
        )}
      </div>
    </section>
  );
}
