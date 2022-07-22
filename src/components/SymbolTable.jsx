import React from 'react';
import { useHistory } from "react-router";

import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine-dark.css"
//import '../App.css';

// Exports a table which takes the symbol data
export default function SymbolTable(rowData) {

  // Center and define widths of columns
  const columns = [
    { headerName: "Name", field: "name", sortable: true, cellClass: "grid-cell-centered", width: 190 },
    { headerName: "Symbol", field: "symbol", sortable: true, cellClass: "grid-cell-centered", width: 195 },
    { headerName: "Industry", field: "industry", sortable: true, cellClass: "grid-cell-centered", filter: "agTextColumnFilter", width: 190 }
  ];

  // Enables rows that link to the price history
  let history = useHistory();

  function linkToPriceHistory(symbol) {
    history.push(`/pricehistory?symbol=${symbol}`)
  }

  // Display a centered table with pagination that is 20 rows deep
  return (
    <div>
      <div
        className="ag-theme-alpine-dark"
        style={{
          height: "500px",
          width: "600px",
          marginLeft: "auto",
          marginRight: "auto"
        }}
      >
        <AgGridReact
          columnDefs={columns}
          rowData={rowData.rowData}
          pagination={true}
          paginationPageSize={20}
          rowSelection="single"
          onRowClicked={(row) => linkToPriceHistory(row.data.symbol)}
        />
      </div>
    </div>
  );
}