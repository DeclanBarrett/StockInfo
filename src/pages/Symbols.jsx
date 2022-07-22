import React, { useState } from "react";
import SymbolTable from "../components/SymbolTable.jsx";
import { SearchBarAuto, SearchDropDown } from "../components/SearchComponents";
import { GetSymbols } from '../APIs/SymbolAPI.js';

// Symbols page with title
export default function Symbols() {
  return (
    <div className="HeroSubtle">
      <h2> Symbols </h2>
      <SymbolSearch />
    </div>
  );
}

// Symbols form and table
function SymbolSearch() {

  const industries = ["All", "Health Care", "Industrials", "Consumer Discretionary", "Information Technology",
    "Consumer Staples", "Utilities", "Financials", "Real Estate", "Materials", "Energy",
    "Telecommunication Services"]

  // All is chosen by default and is uniquely handled by StocksAPI.js to make it easier to navigate
  const [search, setSearch] = useState("All");
  const [filter, setFilter] = useState("");

  // Retrieves all the industries symbols from the database and filter it
  let { stocks, error } = GetSymbols(search);
  const rowData = stocks;
  const regexp = new RegExp(filter, 'i');
  const filteredData = rowData.filter(stock => regexp.test(stock.name));

  // Handle Errors and return appropriate response
  function ErrorHandling() {
    if (error !== null) {
      if (error.message.includes("No entry")) {
        return <p> Sorry, cannot find that stock symbol</p>
      } else if (error.message.includes("fetch")) {
        return <p> Check Internet Connection </p>
      } else if (error.message.includes("incorrect format")) {
        return <p> Symbols are 3 characters long and are all capitals </p>
      }
    }
  }

  // Returns forms and table with filtered data from form
  return (
    <div id="SymbolFormDiv">
      <div inline="true" className="center-contents-flex">
        <SearchDropDown id="IndustryDropDown" onSubmit={setSearch} dropOptions={industries} />
        <SearchBarAuto onSubmit={setFilter} default="Stock Name" />
      </div>
      {ErrorHandling()}
      <SymbolTable rowData={filteredData} />
    </div>
  )
}
