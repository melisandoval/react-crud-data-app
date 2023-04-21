/* eslint-disable react/jsx-key */
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";

import { EditSVG } from "../assets/svg/EditSVG";
import { DeleteSVG } from "../assets/svg/DeleteSVG";

// eslint-disable-next-line react/prop-types
export function DataTable({ data }) {
  const tableHead = (
    <tr>
      <th>Nombre</th>
      <th>Apellido</th>
      <th>Email</th>
      <th>Empresa</th>
      <th>País</th>
      <th>Acciones</th>
    </tr>
  );

  // eslint-disable-next-line react/prop-types
  const tableBody = data.map((customer) => (
    <tr key={customer.id}>
      <td>{customer.first}</td>
      <td>{customer.last}</td>
      <td>{customer.email}</td>
      <td>{customer.company}</td>
      <td>{customer.country}</td>
      <td className="d-flex">
        <Button variant="secondary" className="m-1">
          <EditSVG />
        </Button>
        <Button variant="secondary" className="m-1">
          <DeleteSVG />
        </Button>
      </td>
    </tr>
  ));

  return (
    <section className="my-5 mx-2">
      <Table striped bordered hover>
        <thead>{tableHead}</thead>
        <tbody>{tableBody}</tbody>
      </Table>
    </section>
  );
}
