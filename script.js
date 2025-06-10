/ Listen for the simulate button click and kick off the simulation
document.getElementById('simulateButton').addEventListener('click', function() {
const businessName = document.getElementById('businessName').value.trim();
const investment = parseFloat(document.getElementById('investment').value);

if (!businessName || isNaN(investment)) {
alert('Please enter a valid business name and investment amount.');
return;
}

// Generate simulation: a simple 5-year growth projection.
let simulationData = [];
let baseValue = investment;
for (let year = 1; year <= 5; year++) {
// Simulate a realistic growth rate between 5% and 15%
const growthRate = Math.random() * 0.10 + 0.05;
baseValue *= (1 + growthRate);
simulationData.push({ year: year, value: Math.round(baseValue) });
}

// Display the simulation results
displayOutput(businessName, simulationData);
// Update the analytics chart with the new simulation data
updateChart(simulationData);
});

// Function to display the simulation output in a readable list.
function displayOutput(businessName, simData) {
const outputDiv = document.getElementById('outputContent');
let htmlContent = `<p><strong>${businessName}</strong> projected performance:</p>`;
htmlContent += `<ul>`;
simData.forEach(item => {
htmlContent += `<li>Year ${item.year}: $${item.value}</li>`;
});
htmlContent += `</ul>`;
outputDiv.innerHTML = htmlContent;
}

// Define the chart instance variable globally for reuse.
let chart;

// Function to update (or create) the Chart.js line chart
function updateChart(simData) {
const ctx = document.getElementById('businessChart').getContext('2d');

// Prepare labels and data
const labels = simData.map(item => "Year " + item.year);
const dataValues = simData.map(item => item.value);

// If a chart instance exists, destroy it before creating a new one
if (chart) {
chart.destroy();
}

chart = new Chart(ctx, {
type: 'line',
data: {
labels: labels,
datasets: [{
label: 'Business Value Over 5 Years',
data: dataValues,
borderColor: 'rgba(75, 192, 192, 1)',
backgroundColor: 'rgba(75, 192, 192, 0.2)',
fill: true,
tension: 0.15
}]
},
options: {
scales: {
y: {
beginAtZero: true,
ticks: {
callback: function(value) {
return '$' + value;
}
}
}
}
}
});
}
