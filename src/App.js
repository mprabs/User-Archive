import React, { useState } from "react";
import { DateRangePicker } from "rsuite";
import "./App.css";

import Logo from "./assets/logo.png";
import SearchIcon from "./assets/icon_search.svg";
import ResultTable from "./Table";

function App() {
  const [date, setDate] = useState(null);
  const [numberOfEmails, setNumberOfEmails] = useState(0);

  // ON USER SELECT DATE RANGE FROM THE DATE PICKER
  const handleTime = (value) => {
    setDate(value);
  };

  // PUT NUMBER OF EMAILS FOUND ON DATE SELECT
  const handleNumberOfResults = (value) => {
    setNumberOfEmails(value);
  };

  return (
    <div className="App">
      <div className="input-container">
        <DateRangePicker onChange={handleTime} format="YYYY-MM-DD" />

        <div className="search-container">
          <img src={SearchIcon} />
        </div>
      </div>

      <div className="result-section">
        <div className="result-title">
          Results:<span>{numberOfEmails}</span>mails(s)
        </div>

        {(!date || numberOfEmails === 0) && (
          <div className="result-main">
            <img src={Logo} />
          </div>
        )}

        {date && (
          <div className="table-container">
            <ResultTable dateInput={date} onDataSize={handleNumberOfResults} />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
