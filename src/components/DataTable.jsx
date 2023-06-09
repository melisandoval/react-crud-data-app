/* eslint-disable react/jsx-key */
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";

import { EditIconSVG } from "../assets/svg/EditIconSVG";
import { DeleteIconSVG } from "../assets/svg/DeleteIconSVG";

// eslint-disable-next-line react/prop-types
export function DataTable({ data, handleEditCustomer, handleDeleteCustomer }) {
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
  const tableBody = data.map((element) => {
    const customer = {
      id: element.id,
      firstName: element.first,
      lastName: element.last,
      email: element.email,
      company: element.company,
      country: element.country,
    };

    return (
      <tr key={customer.id}>
        <td>{customer.firstName}</td>
        <td>{customer.lastName}</td>
        <td>{customer.email}</td>
        <td>{customer.company}</td>
        <td>{customer.country}</td>
        <td className="d-flex">
          <Button
            variant="secondary"
            className="m-1"
            onClick={() => {
              handleEditCustomer(customer);
            }}
          >
            <EditIconSVG />
          </Button>
          <Button
            variant="secondary"
            className="m-1"
            onClick={() => {
              handleDeleteCustomer(customer);
            }}
          >
            <DeleteIconSVG />
          </Button>
        </td>
      </tr>
    );
  });

  return (
    <section className="my-5 mx-2">
      <Table striped bordered hover responsive>
        <thead>{tableHead}</thead>
        <tbody>{tableBody}</tbody>
      </Table>
    </section>
  );
}
