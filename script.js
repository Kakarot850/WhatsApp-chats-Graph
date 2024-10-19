import {filterData} from './data_filter.js';
import sample_data from './sample_data.js';

const chatfile = document.getElementById("file-input");
const yearDropdown = document.getElementById("year-dropdown");
const monthDropdown = document.getElementById("month-dropdown");
const chartType = document.getElementById("chart-type");

let filteredData = sample_data;
let years = Object.keys(filteredData);


//Creating Chart
const ctx = document.getElementById("myChart");
const data = {
    labels: ["aproil"],
    datasets: [
        {
            label: "year",
            data: [],
            borderWidth: 1,
            // backgroundColor: ["rgb(255, 99, 132)", "rgb(54, 162, 235)", "rgb(255, 205, 86)"],
            hoverOffset: 4,
        },
        // {
        //     label: "2025",
        //     data: [2, 9, 13, 15, 12, 13],
        //     borderWidth: 1,
        // },
        
    ],
}
const config = {
    type: chartType.value,
    data,
    options: {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true,
            },
            x: {
                ticks: {
                    stepSize: 1, // Add step size for y-axis
                },
            }
        },
        tooltips: {
            enabled: true,
        },
    },
};
const myChart = new Chart(ctx, config);



chatfile.addEventListener("change", (e) => {
    console.log("File Uploaded");
    yearDropdown.innerHTML = "";
    monthDropdown.innerHTML = "";
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
        const content = e.target.result;
        filteredData = filterData(content);
        years = Object.keys(filteredData);
        console.log(years);
        render();
        
    }
    reader.readAsText(file);
});


function render() {
    years.forEach(year => {
        const option = document.createElement("option");
        option.value = year;
        option.textContent = year;
        yearDropdown.appendChild(option);
    });

    let months = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"];
    months = months.map(month => month.charAt(0).toUpperCase() + month.slice(1));
    months.forEach(month => {
        const option = document.createElement("option");
        option.value = month;
        option.textContent = month;
        monthDropdown.appendChild(option);
    });
    createYearChart(years[0]);
}


function loadYearChart(year) { 
    pass;
}


render();

chartType.addEventListener("change", (e) => {
    myChart.config.type = e.target.value;
    myChart.update();
});


//Event Listener for Year Dropdown
yearDropdown.addEventListener("change", (e) => {
    const year = e.target.value;
    createYearChart(year);
});
yearDropdown.addEventListener("dblclick", (e) => {
    const year = e.target.value;
    createYearChart(year);
});


//Event Listener for Month Dropdown
monthDropdown.addEventListener("change", (e) => {
    const year = yearDropdown.value;
    const month = e.target.value;
    createMonthChart(year, month);
});
monthDropdown.addEventListener("dblclick", (e) => {
    const year = yearDropdown.value;
    const month = e.target.value;
    createMonthChart(year, month);
});



const chartTypes = ["line", "bar", "radar", "doughnut", "polarArea", "bubble", "scatter"];







// Chart with Months as labels and no of messages as data
function createYearChart(year) {
    function getMonthsMessage(year) {
    const months = Object.keys(filteredData[year]);
    let month_messages = {};
    months.forEach(month => { 
        const no_of_msg = filteredData[year][month]["no_of_messages"];
        month_messages[month] = no_of_msg;
    })
    return month_messages;
}
    let month_messages = getMonthsMessage(year);
    myChart.config.data.datasets[0].label = year;
    myChart.config.data.datasets[0].data.length = 0;
    myChart.config.data.labels.length = 0;

    for (const month in month_messages) {
        if (Object.hasOwnProperty.call(month_messages, month)) {
            const no_of_msg = month_messages[month];
            myChart.config.data.labels.push(month);
            myChart.config.data.datasets[0].data.push(no_of_msg);
            // console.log(myChart.config.data.labels, myChart.config.data.datasets[0].data);
        }
    }
    myChart.update();
}

// Chart with days as labels and no of messages as data
function createMonthChart(year, month) {
    year = String(year);
    month = month.charAt(0).toUpperCase() + month.slice(1);
    let days = filteredData[year][month];
    delete days["no_of_messages"];
    let days_messages = {};
    // console.log(days);
    
    for (const key in days) {
        days_messages[(Number(key))] = days[key];
    }

    
    // console.log(days_messages);
    myChart.config.data.datasets[0].label = `${month} ${year}`;
    myChart.config.data.datasets[0].data.length = 0;
    myChart.config.data.labels.length = 0;

    for (const day in days_messages) {
        if (Object.hasOwnProperty.call(days_messages, day)) {
            const no_of_msg = days_messages[day];
            myChart.config.data.labels.push(day);
            myChart.config.data.datasets[0].data.push(no_of_msg);
            // console.log(myChart.config.data.labels, myChart.config.data.datasets[0].data);
        }
    }
    myChart.update();
}

// createYearChart(2022);
createYearChart(2024);


// createMonthChart(2023, "april");