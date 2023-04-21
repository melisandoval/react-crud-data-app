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

function App() {
  const [searchTerms, setSearchTerms] = useState(null);
  const [data, setData] = useState(null);
  const [pending, setPending] = useState(false);
  const [showCustomerFormModal, setShowCustomerFormModal] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

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
    }
  };

  const handleCustomerFormModalSubmit = (customerFromForm) => {
    console.log(customerFromForm);
    setSelectedCustomer(null);
    setShowCustomerFormModal(false);
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
          />
        )}
      </section>
    </main>
  );
}

export default App;
