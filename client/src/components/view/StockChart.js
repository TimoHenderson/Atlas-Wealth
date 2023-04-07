// To show graph of a single stock. Requires a single stock data

import React, { useState, useEffect } from "react";
import Highcharts from 'highcharts/highstock'
import HighchartsReact from 'highcharts-react-official'
import './StockChart.css'

require('highcharts/indicators/indicators')(Highcharts)
require('highcharts/modules/accessibility')(Highcharts);
require('highcharts/modules/hollowcandlestick')(Highcharts);


const StockChart = ({ selectedStock }) => {

    const [chartOptions, setChartOptions] = useState({
        rangeSelector: {
            selected: 1,
            allButtonsEnabled: true,
            buttons: [{
                type: 'month',
                count: 1,
                text: '1m',
                title: 'View 1 month'
            }, {
                type: 'month',
                count: 3,
                text: '3m',
                title: 'View 3 months'
            }, {
                type: 'month',
                count: 6,
                text: '6m',
                title: 'View 6 months'
            }, {
                type: 'ytd',
                text: 'YTD',
                title: 'View year to date'
            }]
        },

        series: [{
            type: 'candlestick',
            name: 'Loading',
            title: 'Loading',
            data: [],
        }]
    })

    useEffect(() => {
        const updateSeries = (stock) => {
            const newChartOptions = { ...chartOptions }
            newChartOptions.series[0].data = stock.graphData;
            newChartOptions.series[0].title = stock.symbol;
            newChartOptions.series[0].name = stock.symbol;
            setChartOptions(newChartOptions);
        }
        if (selectedStock) {
            updateSeries(selectedStock);
        }
    }, [selectedStock]);

    return (
        <div>
            <HighchartsReact
                highcharts={Highcharts}
                constructorType='stockChart'
                options={chartOptions}
            />
        </div>
    );
}

export default StockChart;