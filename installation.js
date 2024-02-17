

// Function to add a new row to the thickness table
function addRow() {
  // Get the thickness table body
  var thicknessTableBody = document.getElementById("thickness-table-body");

  // Create a new table row
  var newRow = document.createElement("tr");

  // Create table data for cutting material dropdown
  var materialCell = document.createElement("td");
  var materialSelect = document.createElement("select");
  materialSelect.name = "material"; // Assign a unique name if needed

  // Add options to the material dropdown
  var materialOptions = ["Mild Steel", "Stainless Steel", "Aluminum", "Titanium", "Galvanized", "Copper", "Brass"];
  for (var i = 0; i < materialOptions.length; i++) {
    var option = document.createElement("option");
    option.value = materialOptions[i];
    option.text = materialOptions[i];
    materialSelect.appendChild(option);
  }

  materialCell.appendChild(materialSelect);

  // Create table data for thickness input
  var thicknessCell = document.createElement("td");
  var thicknessInput = document.createElement("input");
  thicknessInput.type = "text";
  thicknessInput.name = "thickness"; // Assign a unique name if needed
  thicknessInput.placeholder = "Enter Thickness";
  thicknessCell.appendChild(thicknessInput);
  thicknessCell.innerHTML += " mm";

  // Create table data for result dropdown
  var resultCell = document.createElement("td");
  var resultSelect = document.createElement("select");
  resultSelect.name = "result"; // Assign a unique name if needed

  // Add options to the result dropdown
  var resultOptions = ["OK", "Not OK"];
  for (var j = 0; j < resultOptions.length; j++) {
    var resultOption = document.createElement("option");
    resultOption.value = resultOptions[j];
    resultOption.text = resultOptions[j];
    resultSelect.appendChild(resultOption);
  }

  resultCell.appendChild(resultSelect);

  // Create table data for remark input
  var remarkCell = document.createElement("td");
  var remarkInput = document.createElement("input");
  remarkInput.type = "text";
  remarkInput.name = "remark"; // Assign a unique name if needed
  remarkInput.placeholder = "Enter Remark";
  remarkCell.appendChild(remarkInput);

  // Append cells to the new row
  newRow.appendChild(materialCell);
  newRow.appendChild(thicknessCell);
  newRow.appendChild(resultCell);
  newRow.appendChild(remarkCell);

  // Append the new row to the thickness table body
  thicknessTableBody.appendChild(newRow);
}

let pdfGenerated = false; // Variable to track if PDF has been generated

// Function to handle form submission
function submitForm(event) {
    event.preventDefault();

    // Hide placeholders when the submit button is clicked
    hidePlaceholders();

    // Check if the PDF has already been generated
    if (pdfGenerated) {
        alert("PDF has already been generated. Please proceed to the next step.");
        return;
    }

    // Collect form data (you can use FormData or any method you prefer)
    let formData = new FormData(document.getElementById('report-form'));
// Validate the number of working days
let startDate = new Date(formData.get('Start-date'));
let endDate = new Date(formData.get('End-date'));
let totalDays = Math.ceil((endDate - startDate) / (24 * 60 * 60 * 1000)) + 1; // Calculate total days
let numberOfDays = formData.get('no-of-days');

// Check if numberOfDays contains only digits
if (!/^\d+$/.test(numberOfDays)) {
alert("Number of working days must be a positive integer. Please enter a valid number.");
return;
}

numberOfDays = parseInt(numberOfDays, 10);

if (isNaN(numberOfDays) || numberOfDays <= 0 || numberOfDays > totalDays) {
alert("Number of working days is invalid. Please make sure it is a positive number and not greater than the total days between the selected start and end dates.");
return;
}


    // Display a confirmation dialog
    if (confirm("Are you sure you want to submit the form?")) {
        // Example: Sending form data via fetch to a Google Apps Script
        fetch('https://script.google.com/macros/s/AKfycbw7b-_js6MJRHqf15y5sAdLgMM7fHSl3s4xMEqMEBm9zoAW1pX-tMtsdNjcpE4DQ6K-GA/exec', {
            method: 'POST',
            body: formData
        })
        .then(response => response.text())
    .then(tokenNumber => {
        // Include the token number in your PDF
let words = tokenNumber.split(',');
let firstWord = words[0];
let lastWord = words[words.length - 1];
        console.log('Token Number:', firstWord);
        document.getElementById('token-number').innerText=firstWord;
        // After the form submission logic, initiate the print
        window.print();
        pdfGenerated = true;
  // Reset the form after successful submission
  document.getElementById('report-form').reset();
            })
            .catch(error => {
                console.error('Error submitting form:', error);
            });
    }
    // Function to reset the form
function resetForm() {
document.getElementById('report-form').reset();
}
}

function updateNumberOfDays() {
    var startDate = new Date(document.getElementById("Start-date").value);
    var endDate = new Date(document.getElementById("End-date").value);

    // Calculate the difference in days
    var totalDays = Math.ceil((endDate - startDate) / (24 * 60 * 60 * 1000)) + 1;

    // Update the input field for the total days
    document.getElementById("total-days").value = totalDays;

    // Calculate the number of working days (excluding weekends)
    var workingDays = 0;
    var currentDate = startDate;

    while (currentDate <= endDate) {
        var dayOfWeek = currentDate.getDay();
        if (dayOfWeek !== 0 && dayOfWeek !== 6) {
            // Count only weekdays (Monday to Friday)
            workingDays++;
        }
        currentDate.setDate(currentDate.getDate() + 1);
    }

    // Update the input field for the number of working days
    document.getElementById("no-of-days").value = workingDays;
}

// Add an event listener to update the number of working days when the dates change
document.getElementById("Start-date").addEventListener("change", updateNumberOfDays);
document.getElementById("End-date").addEventListener("change", updateNumberOfDays);

// Function to hide placeholders
function hidePlaceholders() {
    var inputs = document.querySelectorAll("input[type=text]");
    inputs.forEach(function (input) {
        input.removeAttribute("placeholder");
    });
}

function addOtherRow() {
// Get the table where new rows will be added
var otherTable = document.getElementById("other-table");

// Create a new table row
var newRow = document.createElement("tr");

// Create table data for description input
var descriptionCell = document.createElement("td");
var descriptionInput = document.createElement("input");
descriptionInput.type = "text";
descriptionInput.name = "description"; // Assign a unique name if needed
descriptionInput.placeholder = "Enter Description";
descriptionCell.appendChild(descriptionInput);

// Create table data for remark input
var remarkCell = document.createElement("td");
var remarkInput = document.createElement("input");
remarkInput.type = "text";
remarkInput.name = "remark"; // Assign a unique name if needed
remarkInput.placeholder = "Enter Remark";
remarkCell.appendChild(remarkInput);

// Append cells to the new row
newRow.appendChild(descriptionCell);
newRow.appendChild(remarkCell);

// Append the new row to the table
otherTable.appendChild(newRow);
}

      // Function to handle form submission
      document.getElementById('myForm').addEventListener('submit', function(event) {
        // Prevent the default form submission
        event.preventDefault();
        
        // Perform any form processing if needed
  
        // Redirect to the dashboard
        window.location.href = './select.html';
      });
  
      function goToDashboard() {
    // Display a confirmation dialog
    if (confirm("Are you sure you want to go to the dashboard?")) {
      // If the user confirms, redirect to the dashboard
      window.location.href = './select.html';
    }
  }
  