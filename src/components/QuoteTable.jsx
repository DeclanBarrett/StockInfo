import React from 'react';
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine-dark.css"
//import '../App.css';

//Provides a table to store the quote in
export default function QuoteTable(props) {

  const columns = [
    { headerName: "Timestamp", field: "timestamp", width: 110 },
    { headerName: "Symbol", field: "symbol", width: 85 },
    { headerName: "Name", field: "name", width: 170 },
    { headerName: "Industry", field: "industry", width: 150 },
    { headerName: "Open", field: "open", width: 70 },
    { headerName: "High", field: "high", width: 70 },
    { headerName: "Low", field: "low", width: 70 },
    { headerName: "Close", field: "close", width: 70 },
    { headerName: "Volume", field: "volumes", width: 120 }
  ];

  //Makes all columns centered and movable
  const defaultColDef = {
    resizable: true,
    cellClass: "grid-cell-centered"
  }

  //Displays, centers and themes the table with 20 rows
  return (
    <div className="center-contents-flex">
      <div
        className="ag-theme-alpine-dark"
        style={{
          height: "200px",
          width: "900px",
          marginLeft: "auto",
          marginRight: "auto"
        }}
      >
        <AgGridReact
          columnDefs={columns}
          rowData={props.rowData}
          defaultColDef={defaultColDef}
          pagination={true}
          paginationPageSize={20}
        />
      </div>
    </div>
  );
}

