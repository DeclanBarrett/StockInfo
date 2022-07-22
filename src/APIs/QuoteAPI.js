import { useState, useEffect } from 'react';
import formatDate from '../components/FormatDate.js'

const APIURL = "http://131.181.190.87:3000";

// Returns the stocks/{symbol} endpoint
export function QuoteSearch(search) {
  const [quote, setQuote] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // If no search term is provided then it won't search
    search ?
      getQuoteInformation(search)
        .then((res) => {
          // Throw an error if an error is present
          if (res.error !== undefined && res.error === true) { throw res }
          else { return res }
        })
        .then(data => {
          // Place the returned object in a ag-grid compatable array
          (typeof data === "object") ? setQuote([data]) : setQuote(data);
          setError(null);
        })
        .catch(e => {
          // Handle Errors
          setError(e);
          setQuote(null);
        })
      : console.log("");
  }, [search]);
  return {
    quote,
    error,
  }
}

// Requests the server give it the quote
function getQuoteInformation(search) {
  const url = `${APIURL}/stocks/${search}`;

  return (fetch(url)
    .then(res => res.json())
    .then((res) => {
      // Throw error if error is present
      if (res.error !== undefined) { throw res }
      else { return res }
    })
    .then(res => ({
      // Format data
      timestamp: formatDate(res.timestamp),
      symbol: res.symbol,
      name: res.name,
      industry: res.industry,
      open: res.open,
      high: res.high,
      low: res.low,
      close: res.close,
      volumes: res.volumes,
    }))
    .catch(
      // Send errors up chain 
      e => {
        return { error: true, message: e.message }
      }
    )
  )
}