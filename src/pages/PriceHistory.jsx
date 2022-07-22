import React, { useState } from "react";
import { PriceSearch } from '../APIs/StocksAPI.js';
import { Container, Col, Row, FormGroup, Label, Input, InputGroup, Button } from "reactstrap";
import FinancialChart from "../components/FinancialChart";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css"
import StockDataTable from '../components/StockDataTable.jsx'

import { useLocation } from "react-router-dom";

// Price history page
export default function PriceHistory() {
  let query = useQuery();
  
  // Get url query data 
  const values = ((query) !== {}) ?
    { symbol: query.get("symbol"), fromDate: new Date("2019-11-06"), toDate: new Date("2020-03-23") } : "";

  // Show title and content
  return (
    <div className="HeroSubtle">
      <h2> Price History </h2>
      <PriceHistoryContent startSearch={values} />
    </div>
  );
}

// Returns forms, table and graph for price history
function PriceHistoryContent(props) {
  const [search, setSearch] = useState(props.startSearch);
  const { stocks, error } = PriceSearch(search);

  // API returns "" if blank which ag-grid cannot process
  const filteredData = (stocks === "") ? [] : stocks;
  const stockName = (stocks !== "") ? (filteredData[0].symbol + " - " + filteredData[0].name) : ("");

  function ErrorHandling(error) {
    // Return general messages (for security) to errors in paragraph format
    if (error !== null && error !== undefined) {
      if (error.message.includes("No entry")) {
        return <p> Sorry, cannot find that stock symbol</p>
      } else if (error.message.includes("fetch")) {
        return <p> Check Internet Connection </p>
      } else if (error.message.includes("incorrect format")) {
        return <p> Symbols are 3 characters long and are all capitals </p>
      } else if (error.message.includes("No entries")) {
        return <p> Our data begins at 06/11/2019 and ends at 23/03/2020 </p>
      }
    } else {
      // Display stock name if there are no errors
      return <h1>{stockName}</h1>
    }
  }

  // Return the form, errors, stock table and if applicable, the finincial
  return (
    <div>
      <DateSelection onSubmit={setSearch} toStart={props.startSearch} />
      {ErrorHandling(error)}
      <StockDataTable rowData={filteredData} />
      {(filteredData.length > 1) ? <FinancialChart chartData={filteredData} /> : ""}
    </div>
  )
}

// Return the forms for symbol and date selection
function DateSelection(props) {
  const [innerFromDate, setInnerFromDate] = useState("");
  const [innerToDate, setInnerToDate] = useState("");
  const [innerSymbol, setInnerSymbol] = useState(props.toStart.symbol);

  return (
    <div>
      {/* Symbol Search */}
      <InputGroup className="center-contents-flex">
        <FormGroup>
          <Label for="search"></Label>
          <Input
            type="text"
            name="search"
            id="search"
            value={innerSymbol}
            onChange={event => { setInnerSymbol(event.target.value) }}
            placeholder="Stock Symbol"
          />
        </FormGroup>
      </InputGroup>

      {/* Date Selection and Submit in columns and rows */}
      <InputGroup className="center-contents-flex">
        <div className="center-contents-flex">
          <Container>
            <Row>
              <Col xs={5}><Label>From</Label></Col>
              <Col xs={5}><Label>To</Label></Col>
              <Col xs={1}></Col>
            </Row>
            <Row>
              <Col xs={5}>
                <Input
                  type="date"
                  name="date"
                  id="DateFrom"
                  value={innerFromDate}
                  onChange={event => { setInnerFromDate(event.target.value) }}
                  placeholder="date placeholder"
                />
              </Col>
              <Col xs={5}>
                <Input
                  type="date"
                  name="date"
                  id="DateTo"
                  value={innerToDate}
                  onChange={event => { setInnerToDate(event.target.value) }}
                  placeholder="date placeholder"
                />
              </Col>
              <Col xs={1}>
                <Button onClick={event => { props.onSubmit({ symbol: innerSymbol, toDate: innerToDate, fromDate: innerFromDate }) }} >Submit</Button>
              </Col>
            </Row>
          </Container>
        </div>
      </InputGroup>
    </div>
  )
}

// Enables getting query parameters from url
function useQuery() {
  return new URLSearchParams(useLocation().search);
}