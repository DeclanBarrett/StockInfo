import React from 'react';
import { Bar } from 'react-chartjs-2';
import 'chartjs-plugin-zoom';

//Displays a mix line and bar graph
export default function FinancialChart(props) {

  //Sets arrays for data that can be read by chartjs
  const labels = props.chartData.map(stock => (stock.timestamp));
  const openPrice = props.chartData.map(stock => (stock.open));
  const closePrice = props.chartData.map(stock => (stock.close));
  const highPrice = props.chartData.map(stock => (stock.high));
  const lowPrice = props.chartData.map(stock => (stock.low));
  const volume = props.chartData.map(stock => (stock.volumes));

  //Settings for the zoom plugin
  const zoom = {
    pan: {
      enabled: true,
      mode: 'xy',
    },

    zoom: {
      enabled: true,
      mode: 'xy',

    }

  }

  //Displaying different yAxises and label colours
  const options = {
    responsive: true,
    plugins: {
      zoom
    },

    legend: {
      labels: {
        fontColor: 'white'
      }
    },

    tooltips: {
      mode: 'label'
    },

    //Show gridlines, set labels (dates) and make them white
    scales: {
      xAxes: [
        {
          display: true,
          gridLines: {
            display: false
          },
          labels: labels,
          ticks: {
            fontColor: 'white'
          }
        }
      ],

      yAxes: [
        {
          //Set the first y-axis for volume
          type: 'linear',
          display: true,
          position: 'left',
          id: 'y-axis-1',
          gridLines: {
            display: false
          },
          labels: {
            show: true,
          },
          ticks: {
            fontColor: 'white'
          }
        },
        {
          //Set the second y-axis for prices
          type: 'linear',
          display: true,
          position: 'right',
          id: 'y-axis-2',
          gridLines: {
            display: false
          },
          labels: {
            show: true,
          },
          ticks: {
            fontColor: 'white'
          }
        }
      ]
    }
  }

  //Sets the style, contents and displaymode of data
  const data = {
    datasets: [
      {
        label: 'Open Price',
        type: 'line',
        fill: false,
        lineTension: 0.1,
        backgroundColor: '#F0FF00',
        borderColor: '#F0FF00 ',
        borderCapStyle: 'butt',
        pointRadius: 1,
        pointHitRadius: 10,
        data: openPrice,
        yAxisID: 'y-axis-2'
      },
      {
        label: 'Close Price',
        type: 'line',
        fill: false,
        lineTension: 0.1,
        textColor: '#ffffff',
        backgroundColor: '#0090FF',
        borderColor: '#0090FF',
        borderCapStyle: 'butt',
        pointRadius: 1,
        pointHitRadius: 10,
        data: closePrice,
        yAxisID: 'y-axis-2'
      },
      {
        label: 'High Price',
        type: 'line',
        fill: false,
        lineTension: 0.1,
        backgroundColor: '#11FF00',
        borderColor: '#11FF00',
        borderCapStyle: 'butt',
        pointRadius: 1,
        pointHitRadius: 10,
        data: highPrice,
        yAxisID: 'y-axis-2'
      },
      {
        label: 'Low Price',
        type: 'line',
        fill: false,
        lineTension: 0.1,
        backgroundColor: '#FF2D00',
        borderColor: '#FF2D00',
        borderCapStyle: 'butt',
        pointRadius: 1,
        pointHitRadius: 10,
        data: lowPrice,
        yAxisID: 'y-axis-2'
      },
      {
        label: 'Volume',
        type: 'bar',
        data: volume,
        fill: false,
        backgroundColor: '#71B37C',
        borderColor: '#71B37C',
        hoverBackgroundColor: '#71B37C',
        hoverBorderColor: '#71B37C',
        yAxisID: 'y-axis-1'
      }
    ]
  };

  //Displays the graph with a heading
  return (
    <div className="center-contents-flex">
      <div className="chart-div">
        <h2>{props.chartData[0].name}</h2>
        <Bar data={data} options={options} />
      </div>
    </div>
  )
}