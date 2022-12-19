/**
 * getChartData
 * 
 * Generate an ApexJS Options object for the full data set
 * 
 * Notes: 
 *  1. The first row is the initial time of the session expressed as unix timestamp in UTC.
 *  2. The second row is the sample rate expressed in Hz. 
 *  3. ApexJS uses Js Date object for timeseries values.
 *  
 *  I only grab the first Hz float from row 2 in the csv ( they should be all same )
 * 
 * @param { object } - data loaded and parsed csv data - contains data only not error || meta 
 * @returns { Object } - Compatible with ApexJS chart method options
 */


const getChartData = (data) => {


    let sampleRate = 1; // 1 / data[1]; we will use reduced data set 0.03125 or 32 samples per second ie: display 1 sample a second
    let tick = 0;
    let timeSeries = data.slice(2, data.length - (32 * 10 + 32)); // fixing to match other sets

    let xData = [];
    let yData = [];
    let zData = [];

    timeSeries.filter((v, i) => {
        if (i % 32 == 0) {
            tick = tick + sampleRate;
            xData.push([
                tick,
                parseFloat(v[0])
            ]);
            yData.push([
                tick,
                parseFloat(v[1])
            ]);
            zData.push([
                tick,
                parseFloat(v[2])
            ]);
        }
    });

    console.log("ACC: total samples", "X:" + xData.length, "Y:" + yData.length, "Z:" + zData.length);

    let chartOptions = {
        series: [
            {
                name: "X",
                data: xData
            },
            {
                name: "Y",
                data: yData
            },
            {
                name: "Z",
                data: zData
            },
        ],
        stroke: {
            width: 2,
        },
        chart: {
            type: "line",
            stacked: true,
            height: 350,
            width: "100%",
            fontFamily: "Montserrat",
            animations: {
                enabled: false,
                initialAnimation: {
                    enabled: false,
                },
            },
            zoom: {
                type: "x",
                enabled: true,
                autoScaleYaxis: true,
            },
            toolbar: {
                autoSelected: "zoom",
            },
        },
        dataLabels: {
            enabled: false,
        },
        markers: {
            size: 0,
        },
        title: {
            text: "3-axis accelerometer [-2g, 2g]",
            align: "left",
        },
        yaxis: {
            max: 220,
            min: -160,
            labels: {
                formatter: function (val) {
                    return val.toFixed(0);
                },
            },
            title: {
                text: "1/64g",
            },
            tooltip: {
                enabled: false,
            },
        },
        xaxis: {
            type: "numeric",
            tooltip: {
                enabled: false,
            },
            labels: {
                formatter: (v) => {
                    let totalSeconds = v.toFixed(0) - sampleRate;
                    let minutes = Math.floor(totalSeconds / 60);
                    let seconds = totalSeconds - minutes * 60;
                    if (minutes < 10) minutes = '0' + minutes;
                    if (seconds < 10) seconds = '0' + seconds;

                    return minutes + ":" + seconds;
                }
            },
        },
        tooltip: {
            shared: true,
            x: {
                show: false,
            },
            y: {
                formatter: function (val) {
                    return val;
                },
                title: {
                    formatter: (seriesName) => seriesName,
                },
            },
            marker: {
                show: true,
            },
        },
    };

    return chartOptions;
}

const getChartDataByWindow = (data) => {
    return null;
}

// Helpers

/**
 * dateFromTimestampAsMilliseconds
 * 
 * @param {*} timeStamp 
 * @returns { Date } new Date object from timeStamp
 */
const dateFromTimestampAsMilliseconds = (timeStamp) => {
    // Times 1000 to make it milliseconds
    return new Date(timeStamp * 1000);
}

/**
 * getSampleRateAsSeconds
 * 
 * tick count interval in seconds
 * method: Frequency = cycles/seconds
 * 
 * examples: 
 * 1 / 1.000 = 1 sample per second 
 * 1 / 64.000 = 0.015625 samples per second
 * 
 * @param {Number} hz 
 * @returns {Number} Seconds
 */
const getSampleRateAsSeconds = (hz) => {
    return 1 / hz;
}

const AccelerometerChart = {
    getChartData: getChartData,
    getChartDataByWindow: getChartDataByWindow
}

export default AccelerometerChart;