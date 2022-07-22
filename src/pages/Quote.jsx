import React, { useState } from "react";
import { QuoteSearch } from "../APIs/QuoteAPI";
import QuoteTable from "../components/QuoteTable.jsx";
import { SearchBar } from "../components/SearchComponents";

// Quote page with title
export default function Quote() {
  return (
    <div className="HeroSubtle">
      <h2> Quote</h2>
      <LoadQuote />
    </div>
  )
}

// Quote page content
function LoadQuote() {
  const [search, setSearch] = useState("");
  const { quote, error } = QuoteSearch(search);

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

  // Display a search bar and table with error handling
  return (
    <div >
      <SearchBar onSubmit={setSearch} default="Symbol" />
      {ErrorHandling()}
      <QuoteTable rowData={quote} />
    </div>
  );
}
