// Import's
import { useState } from "react";

// Asset's
import "./Style.css";

// Types
type apiDataTypes = {
  readonly name: { name: string; common: string; official: string };
  capital: string;
  region: string;
  subregion: string;
  population: string;
  readonly flags: { png: string };
};

const App = () => {
  const [api, setApi] = useState<apiDataTypes[]>([]);
  const [search, setSearch] = useState("");

  const handleGetDatasApi = () => {
    if (search) {
      fetch(`https://restcountries.com/v3.1/name/${search}?fullText=true`)
        .then((response) => response.json())
        .then((data) => setApi(data))
        .catch((error) => console.log(error));

      setSearch("");
    }
  };

  const handleSearchKey = (event: any) => {
    if (event.key === "Enter") {
      handleGetDatasApi();
    }
  };

  return (
    <div className="app">
      <h1 className="title">Countries Search 🌎</h1>
      <small>
        Type countries in english | Made by{" "}
        <a href="https://github.com/KennedyReisz">Kennedy</a>
      </small>

      <div className="searchArea">
        <input
          placeholder="Countrie name..."
          type="text"
          className="searchInput"
          autoFocus={true}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyPress={handleSearchKey}
        />
        <button
          style={search ? { cursor: "pointer" } : { cursor: "not-allowed" }}
          onClick={handleGetDatasApi}
          className="searchButton"
        >
          Search
        </button>
      </div>

      {Array.isArray(api)
        ? api.map((item, index) => (
            <div className="results" key={index}>
              <p className="resultItem">
                <b>Countrie Name:</b> <u>{item.name.common}</u>
              </p>
              <p className="resultItem">
                <b>Countrie Oficial Name:</b> <u>{item.name.official}</u>
              </p>
              <p className="resultItem">
                <b>Capital:</b> <u>{item.capital}</u>
              </p>
              <p className="resultItem">
                <b>Regions:</b> <u>{item.region}</u> - <u>{item.subregion}</u>
              </p>
              <p className="resultItem">
                <b>Population:</b> {item.population}
              </p>
              <img className="resultImage" src={item.flags.png} />
            </div>
          ))
        : null}
    </div>
  );
};

export default App;
