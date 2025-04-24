import React from 'react';
import ReactApexChart from 'react-apexcharts';

const PubMonthlyChart = () => {
    const [state, setState] = React.useState({
              series: [
                {
                  name: "",
                  data: [15, 35, 60, 45, 82, 48, 72, 35, 90, 25, 78, 60]
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
                  offsetX: 10, 
                },
                colors: ['#6CE5E8', '#545454'],
                stroke: {
                  curve: 'smooth'
                },
                title: {
                  text: '',
                  align: 'left'
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
                  categories: ['2025/01', '2025/02', '2025/03', '2025/04', '2025/05', '2025/06', '2025/07', '2025/08', '2025/09', '2025/10', '2025/11', '2025/12'],
                  title: {
                    text: ''
                  }
                },
                yaxis: {
                  title: {
                    text: ''
                  },
                  min: 0,
                  max: 100
                },
                legend: {
                  position: 'top',
                  horizontalAlign: 'right',
                  floating: true,
                  offsetY: -25,
                  offsetX: 25
                }
              },
          });
    return (
        <div className="bg-[#EDF0FF] p-8 rounded-md">
              <h2 className="text-2xl md:text-4xl font-medium pb-3">
                Performance History
              </h2>
              <div id="chart">
                <ReactApexChart
                  options={state.options}
                  series={state.series}
                  type="line"
                  height={500}
                />
              </div>
            </div>
    );
};

export default PubMonthlyChart;