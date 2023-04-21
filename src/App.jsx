import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { SearchForm } from "./components/SearchForm";
import { DataTable } from "./components/DataTable";
import { getCustomers } from "./supabaseAPI";
import { useEffect } from "react";

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

  return (
    <main className="p-4 container-lg">
      <SearchForm handleSetSearchTerms={handleSetSearchTerms} />

      {searchTerms && pending && <p>Pending...</p>}

      {searchTerms && !pending && !data && (
        <p>
          Lo sentimos, no hemos encontrado ningún registro que coincida con el
          término de búsqueda indicado.
        </p>
      )}

      {searchTerms && data && <DataTable data={data} />}
    </main>
  );
}

export default App;
