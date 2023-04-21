import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { SearchForm } from "./components/SearchForm";

function App() {
  const [searchTerms, setSearchTerms] = useState(null);

  const handleSetSearchTerms = (searchFormData) => {
    setSearchTerms(searchFormData);
  };

  return (
    <main className="p-4 container-lg">
      <SearchForm handleSetSearchTerms={handleSetSearchTerms} />
    </main>
  );
}

export default App;
