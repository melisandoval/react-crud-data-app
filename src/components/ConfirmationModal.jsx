import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

export function ConfirmationModal(props) {
  // eslint-disable-next-line react/prop-types
  const { handleDeleteCustomer } = props;

  return (
    <Modal {...props} size="lg" centered className="text-center">
      <Modal.Header closeButton>
        <Modal.Title className="text-center"></Modal.Title>
      </Modal.Header>

      <Modal.Body className="mt-5 mb-4">
        <p>¿Está seguro que quiere borrar de forma permanente este registro?</p>
      </Modal.Body>

      <Modal.Footer>
        <Button onClick={handleDeleteCustomer}>Confirmar</Button>
      </Modal.Footer>
    </Modal>
  );
}
