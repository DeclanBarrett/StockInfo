import { useState, useEffect } from 'react';

const APIURL = "http://131.181.190.87:3000";

// Returns the stocks/symbols endpoint
export function GetSymbols(industrySearch) {
    const [stocks, setStocks] = useState([]);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      // If search isn't provided, stop search
      industrySearch ?
        getStock(industrySearch)
          .then((res) => {
            // Throw an error if an error is present
            if (res.error !== undefined && res.error === true) { throw res }
            else { return res }
          })
          .then(stocks => {
            // Give stock data retrived to state
            setError(null);
            setStocks(stocks);
          })
          .catch(e => {
            // Handle errors
            setError(e);
          }) : (console.log(""));
    }, [industrySearch]);
    return {
      stocks,
      error
    };
  }
  
  // Request stock symbols from API
  function getStock(industrySearch) {
    let url = `${APIURL}/stocks/symbols`;
  
    // Allow ALL to gather all symbols regardless of industry
    if (industrySearch !== "All") {
      url = `${APIURL}/stocks/symbols?industry=${industrySearch}`;
    }
  
    // Fetch symbols
    return fetch(url)
      .then(res => res.json())
      .then(res => res.map(
        //Format data to fit arrays
        stock => ({
          name: stock.name,
          symbol: stock.symbol,
          industry: stock.industry
        })))
      .catch(e => {
        // Raise errors up request chain
        return { error: true, message: e.message }
      })
  }