/* eslint-disable react/jsx-key */
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";

import { EditSVG } from "../assets/svg/EditSVG";
import { DeleteSVG } from "../assets/svg/DeleteSVG";

// eslint-disable-next-line react/prop-types
export function DataTable({ data }) {
  // eslint-disable-next-line react/prop-types
  const tableData = data.map((element) => (
    <tr key={element.id}>
      <td>{element.first}</td>
      <td>{element.last}</td>
      <td>{element.email}</td>
      <td>{element.company}</td>
      <td>{element.country}</td>
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

  return (
    <section className="my-5 mx-2">
      <Table striped bordered hover>
        <thead>{tableHead}</thead>
        <tbody>{tableData}</tbody>
      </Table>
    </section>
  );
}
