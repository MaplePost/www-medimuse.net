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
 * @param { object } - data loaded and parsed csv data - contains data only not error || meta 
 * @returns { Object } - Compatible with ApexJS chart method options
 */

const getChartData = (data) => {

    let sampleRate = getSampleRateAsSeconds(data[1]);
    let tick = 0;
    let timeSeries = data.slice(2); // remove first 2 rows

    let formattedData = timeSeries.map((v, i) => {
        return [
            tick = tick + sampleRate,
            parseFloat(v),
        ];
    });

    console.log("HR: total samples", formattedData.length);

    let chartOptions = {
        series: [
            {
                name: "Heart Rate",
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
            text: "Heart Rate @1.000Hz ",
            align: "left",
        },
        yaxis: {
            labels: {
                formatter: function (val) {
                    return val.toFixed(0);
                },
            },
            title: {
                text: "HR/BPM",
            },
            tooltip: {
                enabled: false,
            },
        },
        xaxis: {
            type: "numeric",
            /*
            title: {
                text: "Minutes:Seconds from capture start",
                offsetY: 72
            },
            */
            labels: {
                formatter: (v) => {
                    let totalSeconds = v.toFixed(0) - sampleRate;
                    let minutes = Math.floor(totalSeconds / 60);
                    let seconds = totalSeconds - minutes * 60;
                    if (10 > minutes) minutes = '0' + minutes;
                    if (10 > seconds) seconds = '0' + seconds;

                    return minutes + ":" + seconds;
                }
            },
            tooltip: {
                enabled: false,
            },
        },
        annotations: {
            yaxis: [
                {
                    y: 60,
                    y2: 40,
                    borderColor: "#8BC34A",
                    fillColor: "#8BC34A",
                    label: {
                        borderColor: "#ADADAD",
                        borderWidth: 0,
                        borderRadius: 0,
                        offsetX: -5,
                        offsetY: -5,
                        style: {
                            color: "#000000",
                            background: "#8BC34A",
                            fontFamily: "Montserrat",
                            padding: {
                                left: 5,
                                right: 5,
                                top: 3,
                                bottom: 5,
                            },
                        },
                        text: "Resting / Sleeping Heart Rate",
                    },
                },
            ],
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

const HeartRateChart = {
    getChartData: getChartData,
    getChartDataByWindow: getChartDataByWindow
}

export default HeartRateChart;