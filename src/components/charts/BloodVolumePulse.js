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
 *  To match with the online portal... 
 *    1. invert values
 *    2. scale ( without changing distance between peaks )
 *    3. under-sample 
 * 
 * @param { object } - data loaded and parsed csv data - contains data only not error || meta 
 * @returns { Object } - Compatible with ApexJS chart method options
 */

const getChartData = (data) => {

    let sampleRate = 1; // 1 / data[1]; we will use reduced data set 0.015625 samples per second ie: display 1 sample a second
    let tick = 0;
    let timeSeries = data.slice(2, data.length - (64 * 9 + 64)); // fixing to match other sets
    let timeSeriesReduced = timeSeries.filter((v, i) => {
        return i % 64 == 0;
    });
    let formattedData = timeSeriesReduced.map((v, i) => {
        let value = parseFloat(v);
        let invertedValue = value * -1;
        let scaleBy = 1; // keep same since I did not normalize the peaks
        return [
            tick = tick + sampleRate,
            invertedValue * scaleBy
        ];
    });

    console.log("BVP: total samples", formattedData.length);

    const chartOptions = {
        series: [
            {
                name: "BVP",
                data: formattedData
            },
        ],
        stroke: {
            width: 2,
        },
        theme: {
            mode: "light",
            palette: "palette3",
            monochrome: {
                enabled: true,
                color: "#666666",
                shadeTo: "dark",
                shadeIntensity: 0.65,
            },
        },
        chart: {
            type: "line",
            stacked: false,
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
            text: "Blood Volume Pulse @64.000Hz (Photoplethysmography)",
            align: "left",
        },
        yaxis: {
            labels: {
                formatter: function (val) {
                    return val.toFixed(0);
                },
            },
            title: {
                text: "nano (Watt)",
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
            shared: false,
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

const BloodVolumePulseChart = {
    getChartData: getChartData,
    getChartDataByWindow: getChartDataByWindow
}

export default BloodVolumePulseChart;