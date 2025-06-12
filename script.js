// Wait for the DOM to load
document.addEventListener('DOMContentLoaded', () => {
const simulationForm = document.getElementById('simulationForm');
const resultsList = document.getElementById('resultsList');
const growthChartCtx = document.getElementById('growthChart').getContext('2d');
let growthChart; // Global variable to store our Chart.js instance

// Event listener for the simulation form submission
simulationForm.addEventListener('submit', (e) => {
e.preventDefault(); // Prevent traditional form submission

// Read inputs
const businessName = document.getElementById('businessName').value.trim();
const investmentAmtInput = document.getElementById('investmentAmount').value;
const investmentAmount = parseFloat(investmentAmtInput);

// Validate inputs
if (!businessName || isNaN(investmentAmount) || investmentAmount < 1000) {
alert("Please enter a valid business name and an investment amount (minimum $1,000).");
return;
}

// Generate projection for 5 years
let currentValue = investmentAmount;
const projections = [];
resultsList.innerHTML = ''; // Clear previous results

for (let year = 1; year <= 5; year++) {
// Generate random growth between 5% and 15%
const growthRate = (Math.random() * (15 - 5) + 5) / 100;
currentValue = Math.round(currentValue * (1 + growthRate));
projections.push(currentValue);

// Create a new list item for each year and add to results panel
const li = document.createElement('li');
li.textContent = `Year ${year}: $${currentValue.toLocaleString()}`;
resultsList.appendChild(li);
}

// If there is an existing chart, destroy it before drawing a new one
if (growthChart) {
growthChart.destroy();
}

// Render the Chart.js line chart
growthChart = new Chart(growthChartCtx, {
type: 'line',
data: {
labels: ['Year 1', 'Year 2', 'Year 3', 'Year 4', 'Year 5'],
datasets: [{
label: `${businessName} Projection`,
data: projections,
backgroundColor: 'rgba(0, 51, 102, 0.2)', // Semi-transparent dark blue fill
borderColor: 'rgba(0, 51, 102, 1)', // Dark blue border
borderWidth: 2,
fill: true,
tension: 0.2,
}]
},
options: {
responsive: true,
scales: {
y: {
beginAtZero: true,
ticks: {
// Format the y-axis labels as dollars
callback: function(value) {
return '$' + value.toLocaleString();
}
}
}
},
plugins: {
legend: {
position: 'top'
},
tooltip: {
callbacks: {
label: function(context) {
return '$' + context.parsed.y.toLocaleString();
}
}
}
}
}
});
});
});
