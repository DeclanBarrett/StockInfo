import React from 'react';
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine-dark.css"
//import '../App.css';


//Returns a table compatible with price history
export default function StockDataTable(props) {

  const columns = [
    { headerName: "Timestamp", field: "timestamp", comparator: dateComparator },
    { headerName: "Open", field: "open", sortable: true, filter: 'agNumberColumnFilter' },
    { headerName: "High", field: "high", sortable: true, filter: 'agNumberColumnFilter' },
    { headerName: "Low", field: "low", sortable: true, filter: 'agNumberColumnFilter' },
    { headerName: "Close", field: "close", sortable: true, filter: 'agNumberColumnFilter' },
    { headerName: "Volume", field: "volumes", sortable: true, filter: 'agNumberColumnFilter' }
  ];

  //Set to be centered and movable
  const defaultColDef = {
    resizable: true,
    sortable: true,
    flex: 1,
    cellClass: "grid-cell-centered"
  }

  return (
    <div className="center-contents-flex">
      <div
        className="ag-theme-alpine-dark"
        style={{
          height: "600px",
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


//Date comparison from https://embed.plnkr.co/FylOQ5cAD9id4LbgI3NN/
function dateComparator(date1, date2) {
  var date1Number = monthToComparableNumber(date1);
  var date2Number = monthToComparableNumber(date2);

  if (date1Number === null && date2Number === null) {
    return 0;
  }
  if (date1Number === null) {
    return -1;
  }
  if (date2Number === null) {
    return 1;
  }

  return date1Number - date2Number;
}

// eg 29/08/2004 gets converted to 20040829
function monthToComparableNumber(date) {
  if (date === undefined || date === null || date.length !== 10) {
    return null;
  }

  var yearNumber = date.substring(6, 10);
  var monthNumber = date.substring(3, 5);
  var dayNumber = date.substring(0, 2);

  var result = yearNumber * 10000 + monthNumber * 100 + dayNumber;
  return result;
}