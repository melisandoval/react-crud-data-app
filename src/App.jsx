import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";

import { SearchForm } from "./components/SearchForm";
import { DataTable } from "./components/DataTable";

import { exampleData } from "../exampleData";

function App() {
  const [searchTerms, setSearchTerms] = useState(null);

  const [data, setData] = useState(null);

  const getData = () => {
    setData(exampleData);
    console.log(data);
  };

  const handleSetSearchTerms = (searchFormData) => {
    setSearchTerms(searchFormData);
    getData();
  };

  return (
    <main className="p-4 container-lg">
      <SearchForm handleSetSearchTerms={handleSetSearchTerms} />

      {searchTerms && data && <DataTable data={data} />}
    </main>
  );
}

export default App;
