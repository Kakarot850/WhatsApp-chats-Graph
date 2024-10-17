import {filteredData} from './data_filter.js';

let years = Object.keys(filteredData);

//Creating Year Dropdown
const yearDropdown = document.getElementById("year-dropdown");
years.forEach(year => {
    const option = document.createElement("option");
    option.value = year;
    option.textContent = year;
    yearDropdown.appendChild(option);
});

//Creating Month Dropdown
const monthDropdown = document.getElementById("month-dropdown");
const months = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"];
months.forEach(month => {
    const option = document.createElement("option");
    option.value = month;
    option.textContent = month.charAt(0).toUpperCase() + month.slice(1);
    monthDropdown.appendChild(option);
});

//Event Listener for Year Dropdown
yearDropdown.addEventListener("change", (e) => {
    const year = e.target.value;
    createYearChart(year);
});

//Event Listener for Month Dropdown
monthDropdown.addEventListener("change", (e) => {
    const year = yearDropdown.value;
    const month = e.target.value;
    createMonthChart(year, month);
});








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
    type: "bar",
    data,
    options: {
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    },
};
const myChart = new Chart(ctx, config);

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

    
    console.log(days_messages);
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