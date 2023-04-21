import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { SearchForm } from "./components/SearchForm";
import { DataTable } from "./components/DataTable";
import { getCustomers } from "./supabaseAPI";
import { useEffect } from "react";
import Alert from "react-bootstrap/Alert";
import Spinner from "react-bootstrap/Spinner";

function App() {
  const [searchTerms, setSearchTerms] = useState(null);
  const [data, setData] = useState(null);
  const [pending, setPending] = useState(false);

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

  return (
    <main className="min-vh-100 pt-5 p-4 container-lg">
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

        {searchTerms && data && <DataTable data={data} />}
      </section>
    </main>
  );
}

export default App;
