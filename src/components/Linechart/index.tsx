import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';

if(process.env.NODE_ENV !== 'test'){
  Chart.register(...registerables);
}

const Linechart: React.FC<Linecharts> = ({
  cases, 
  deaths, 
  incidence,
  dates
}) => {
  return (
    <Line
        width={1300}
        height={300}
        data={{
            labels: dates, //new Array(cases.length).fill('03/04'), //["03/04", "03/04", "03/04","03/04", "03/04", "03/04","03/04", "03/04", "03/04","03/04", "03/04", "03/04", "03/04","03/04", "03/04", "03/04","03/04", "03/04", "03/04","03/04", "03/04", "03/04", "03/04","03/04", "03/04", "03/04","03/04", "03/04", "03/04","03/04", ],
            datasets: [
                {
                    label: "Cases",
                    backgroundColor: "rgba(255, 99, 132, 0.7)",
                    borderColor: 'rgba(255, 99, 132, 1)',
                    data: cases
                },
                {
                    label: "Incidences",
                    backgroundColor: "rgba(54, 162, 235, 0.7)",
                    borderColor: 'rgba(54, 162, 235, 1)',
                    data: incidence
                },
                {
                    label: "Deaths",
                    backgroundColor: "rgba(255, 206, 86, 0.7)",
                    borderColor: 'rgba(255, 206, 86, 1)',
                    data: deaths
                },
            ]
        }}
        options={{
          plugins: {
            title: {
              display: true,
              text: "History of cases, deaths and incidences"
            },
            legend: {
              display: true,
              position: "bottom"
           }
          }
        }}
      />
  )
}

export default Linechart;

interface Linecharts {
    cases: number[];
    deaths: number[]; 
    incidence: number[];
    dates: string[];
}