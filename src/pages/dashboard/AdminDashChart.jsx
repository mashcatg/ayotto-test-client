
import React from "react";
import ReactApexChart from "react-apexcharts";


const AdminDashChart = () => {
    const [state, setState] = React.useState({
        series: [{
            name: 'Quiz Submissions',
            data: [5, 12, 9, 20, 15, 18, 22] // প্রতিদিন কতোজন কুইজ দিয়েছে 
        }],
        options: {
            chart: {
                type: 'bar',
                height: 250
            },
            plotOptions: {
                bar: {
                    horizontal: false,
                    columnWidth: '40%',
                    borderRadius: 5,
                    borderRadiusApplication: 'end'
                },
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                show: true,
                width: 2,
                colors: ['transparent']
            },
            xaxis: {
                categories: getLast7Days(), // শেষ ৭ দিনের তারিখ দেখাবে
            },
            yaxis: {
                title: {
                    text: 'Total Submissions'
                }
            },
            fill: {
                opacity: 1
            },
            tooltip: {
                y: {
                    formatter: function (val) {
                        return val + " submissions"
                    }
                }
            }
        },
    });

    function getLast7Days() {
        const days = [];
        for (let i = 6; i >= 0; i--) {
            const date = new Date();
            date.setDate(date.getDate() - i);
            days.push(date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }));
        }
        return days;
    }
    

    return (
        <div>
            <div id="chart">
                <ReactApexChart options={state.options} series={state.series} type="bar" height={250} />
              </div>
          </div>
    );
};

export default AdminDashChart;