import { useState, useEffect } from 'react';
import formatDate from '../components/FormatDate.js'

const APIURL = "http://131.181.190.87:3000";

// Returns the stocks/auth/{symbol} endpoint
export function PriceSearch(props) {
  const [stocks, setStocks] = useState("");
  const [error, setError] = useState(null);

  // Retrieve array of information by date on a stock
  function getStockInformation(props) {

    const token = localStorage.getItem("token");
    const headers = {
      accept: "application/json", "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }

    // Format the URL with query parameters that the API accepts
    let url = `${APIURL}/stocks/authed/${props.symbol}`

    if (props.fromDate !== "" || props.toDate !== "") {
      if (props.fromDate !== "" && props.toDate !== "") {
        url += `?from=${props.fromDate}&to=${props.toDate}`
      } else if (props.fromDate !== "") {
        url += `?from=${props.fromDate}`
      } else if (props.toDate !== "") {
        url += `?to=${props.toDate}`
      }
    }

    // Change what response is expected based on the query parameters sent
    if (props.fromDate === "" && props.toDate === "") {
      // Expect an object if no dates are sent along
      return (fetch(url, { headers })
        .then(res => res.json())
        .then((res) => {
          // Throw error if error is present
          if (res.error !== undefined) { throw res }
          else { return res }
        })
        .then(res => ({
          // Format data from an object
          timestamp: formatDate(res.timestamp),
          symbol: res.symbol,
          name: res.name,
          industry: res.industry,
          open: res.open,
          high: res.high,
          low: res.low,
          close: res.close,
          volumes: res.volumes,
        })
        ).catch(
          // Send errors up chain 
          e => {
            return { error: true, message: e.message }
          }
        )
      )
    } else {
      // Expect an array if dates are sent along
      return (fetch(url, { headers })
        .then(res => res.json())
        .then((res) => {
          // Throw error if error is present
          if (res.error !== undefined) { throw res }
          else { return res }
        })
        .then(res =>
          // Format data from an array
          (res.map(
            stock => ({
              timestamp: formatDate(stock.timestamp),
              symbol: stock.symbol,
              name: stock.name,
              industry: stock.industry,
              open: stock.open,
              high: stock.high,
              low: stock.low,
              close: stock.close,
              volumes: stock.volumes,
            })))
        )
        .catch(e => {
          // Raise errors up request chain
          return { error: true, message: e.message }
        })
      )

    }
  }

  useEffect(() => {
    // If no search term is provided then it won't search
    props.symbol ?
      getStockInformation(props)
        .then((res) => {
          // Throw an error if an error is present
          if (res.error !== undefined && res.error === true) { throw res }
          else { return res }
        })
        .then(data => {
          // Wrap in an array if neccessary for ag-grid purposes
          (Array.isArray(data)) ? setStocks(data) : setStocks([data]);
          setError(null)
        })
        .catch(e => {
          // Handle errors
          setError(e);
          setStocks("");
        }) : console.log("");
  }, [props]);
  return {
    stocks,
    error,
  }
}


