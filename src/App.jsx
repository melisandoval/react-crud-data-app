import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { SearchForm } from "./components/SearchForm";
import { DataTable } from "./components/DataTable";
import { getCustomers } from "./supabaseAPI";
import { useEffect } from "react";
import Alert from "react-bootstrap/Alert";
import Spinner from "react-bootstrap/Spinner";
import Button from "react-bootstrap/Button";
import { AddIconSVG } from "./assets/svg/AddIconSVG";
import { CustomerFormModal } from "./components/CustomerFormModal";
import { ConfirmationModal } from "./components/ConfirmationModal";

function App() {
  const [searchTerms, setSearchTerms] = useState(null);
  const [data, setData] = useState(null);
  const [pending, setPending] = useState(false);
  const [showCustomerFormModal, setShowCustomerFormModal] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  const getData = async (searchTerms) => {
    try {
      setPending(true);
      const { data, error } = await getCustomers(searchTerms);
      if (data) {
        if (data.length === 0) {
          setData(null);
          setPending(false);
        } else {
          setData(data);
          setPending(false);
        }
        if (error) {
          throw new Error();
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSetSearchTerms = (searchFormData) => {
    setSearchTerms(searchFormData);
  };

  useEffect(() => {
    if (searchTerms) {
      getData(searchTerms);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerms]);

  const resetSearchTerms = () => {
    setSearchTerms(null);
  };

  const handleShowCustomerFormModal = (customer) => {
    setShowCustomerFormModal(true);

    if (customer) {
      setSelectedCustomer(customer);
    } else setSelectedCustomer(null);
  };

  const handleCustomerFormModalSubmit = (customerFromForm) => {
    // Supabase ofrece la posibilidad de Upsert data (TO-DO: probar).
    // Si upsert es posible remover la condición siguiente y hacer una sola llamada
    // para insertar nuevo registro o editar registro en lugar de dos diferentes:
    if (customerFromForm.id) {
      try {
        // TO-DO: llamar a supabase para editar un registro de la tabla.
        // Si no hay error:
        console.log(`Cliente editado es: ${JSON.stringify(customerFromForm)}`);
        // si Supabase devuelve un error lanzar error al catch.
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        //TO-DO: llamar a Supabase para crear un registro nuevo.
        // Si no hay error:
        console.log(`Cliente nuevo es ${JSON.stringify(customerFromForm)}`);
        // si Supabase devuelve un error lanzar error al catch.
      } catch (error) {
        console.log(error);
      }
    }
    setShowCustomerFormModal(false);
    setSelectedCustomer(null);
  };

  const handleShowConfirmationModal = (customer) => {
    setShowConfirmationModal(true);
    setSelectedCustomer(customer);
  };

  const handleDeleteCustomer = () => {
    if (selectedCustomer) {
      try {
        // TO-DO: llamar a Supabase para eliminar el registro que tenga el id de selectedCustomer.
        // Si Supabase no devuelve un error:
        console.log(
          `El cliente con id ${selectedCustomer.id}, nombre ${selectedCustomer.firstName} y apellido ${selectedCustomer.lastName} ha sido borrado`
        );
        // si Supabase devuelve un error lanzar error al catch.
      } catch (error) {
        console.log(error);
      }
    }
    setShowConfirmationModal(false);
  };

  const customerModalTitle = "Datos del cliente:";

  return (
    <main className="min-vh-100 pt-5 p-4 container-lg">
      <Button
        variant="secondary"
        className="my-3 p-2 d-flex align-items-center"
        onClick={handleShowCustomerFormModal}
      >
        <AddIconSVG />
        <span className="px-2">Nuevo cliente</span>
      </Button>

      <CustomerFormModal
        title={customerModalTitle}
        show={showCustomerFormModal}
        onHide={() => setShowCustomerFormModal(false)}
        handleSubmit={handleCustomerFormModalSubmit}
        customer={selectedCustomer}
      />

      <ConfirmationModal
        show={showConfirmationModal}
        onHide={() => setShowConfirmationModal(false)}
        handleDeleteCustomer={handleDeleteCustomer}
      />

      <SearchForm
        handleSetSearchTerms={handleSetSearchTerms}
        resetSearchTerms={resetSearchTerms}
      />

      <section className="pt-5">
        {searchTerms && pending && (
          <div className="text-center">
            <Spinner animation="border" variant="primary" />
          </div>
        )}

        {searchTerms && !pending && !data && (
          <Alert variant="light" className="text-center">
            Lo sentimos, no hemos encontrado ningún registro que coincida con el
            término de búsqueda indicado.
          </Alert>
        )}

        {searchTerms && data && (
          <DataTable
            data={data}
            handleEditCustomer={handleShowCustomerFormModal}
            handleDeleteCustomer={handleShowConfirmationModal}
          />
        )}
      </section>
    </main>
  );
}

export default App;
