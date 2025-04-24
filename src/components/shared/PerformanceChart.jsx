import React from "react";
import ReactApexChart from "react-apexcharts";

const PerformanceChart = ({ data }) => {
  const chartData = {
    series: [
      {
        name: "Performance",
        data: data.map(item => item.percentage)
      },
    ],
    options: {
      chart: {
        height: 350,
        type: 'line',
        dropShadow: {
          enabled: true,
        },
        zoom: {
          enabled: false
        },
        toolbar: {
          show: false
        },
      },
      colors: ['#6CE5E8'],
      stroke: {
        curve: 'smooth'
      },
      grid: {
        borderColor: '#C1C3CF',
        row: {
          colors: ['#EDF0FF'], 
        },
      },
      markers: {
        size: 1
      },
      xaxis: {
        categories: data.map(item => {
          const date = new Date(item.date);
          return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        }),
      },
      yaxis: {
        title: {
          text: 'Performance Score (%)'
        },
        min: 0,
        max: 100
      },
    },
  };

  return (
    <div className="bg-[#EDF0FF] p-8 rounded-md">
      <h2 className="text-2xl md:text-4xl font-medium pb-3">Weekly Performance</h2>
      <div id="chart">
        <ReactApexChart
          options={chartData.options}
          series={chartData.series}
          type="line"
          height={500}
        />
      </div>
    </div>
  );
};

export default PerformanceChart;
