import React from 'react';
import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

function ChartComponent({ chartData }) {
  console.log(chartData);

  return (
    <div>
      <h3>Bar Chart</h3>
      <Bar
        data={chartData}
        options={{
          scales: {
            x: [
              {
                type: 'category', 
                title: {
                  display: true,
                  text: 'Category Labels',
                },
              },
            ],
            y: [
              {
                beginAtZero: true,
                title: {
                  display: true,
                  text: 'Values',
                },
              },
            ],
          },
        }}
      />
    </div>
  );
}

export default ChartComponent;
