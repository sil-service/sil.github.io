
      function submitForm(event) {
        event.preventDefault(); // Prevent the default form submission behavior
    
        // Collect form data (you can use FormData or any method you prefer)
        let formData = new FormData(document.getElementById('report-form'));
    
        // Example: Sending form data via fetch to a Google Apps Script
        fetch('https://script.google.com/macros/s/AKfycbw6aBm-uz5u_13z86-zsig-9pVbKzsGyGORFJdaYfNsU6fikzmQzeE8DRxskwm5hjt0PQ/exec', {
          method: 'POST',
          body: formData
        })
        .then(response => {
          // Handle the response from the server if needed
          console.log('Form submitted successfully!', response);
    
          // After the form submission logic, initiate the print
          window.print();
        })
        .catch(error => {
          console.error('Error submitting form:', error);
        });
      }

  
  function addRow() {
  // Get the table body where new rows will be added
  var tableBody = document.getElementById("thickness-table-body");

  // Create a new table row
  var newRow = document.createElement("tr");

  // Create table data for material select
  var materialCell = document.createElement("td");
  var materialSelect = document.createElement("select");
  materialSelect.name = "material"; // Update this to assign a unique name if needed

  // Add options to the material select
  var materials = ["MS", "Steel", "Aluminum"]; // Add more materials as needed
  materials.forEach(function(material) {
    var option = document.createElement("option");
    option.value = material;
    option.text = material;
    materialSelect.appendChild(option);
  });

  // Append material select to table cell
  materialCell.appendChild(materialSelect);

  // Create table data for thickness input
  var thicknessCell = document.createElement("td");
  var thicknessInput = document.createElement("input");
  thicknessInput.type = "text";
  thicknessInput.name = "thickness"; // Update this to assign a unique name if needed
  thicknessInput.placeholder = "Enter Thickness";
  var unit = document.createTextNode(" mm");
  thicknessCell.appendChild(thicknessInput);
  thicknessCell.appendChild(unit);

  // Create table data for result select
  var resultCell = document.createElement("td");
  var resultSelect = document.createElement("select");
  resultSelect.name = "result"; // Update this to assign a unique name if needed

  // Add options to the result select
  var results = ["OK", "Not OK"]; // Add more results as needed
  results.forEach(function(result) {
    var option = document.createElement("option");
    option.value = result;
    option.text = result;
    resultSelect.appendChild(option);
  });

  // Append result select to table cell
  resultCell.appendChild(resultSelect);

  // Create table data for remark input
  var remarkCell = document.createElement("td");
  var remarkInput = document.createElement("input");
  remarkInput.type = "text";
  remarkInput.name = "remark"; // Update this to assign a unique name if needed
  remarkInput.placeholder = "Enter Remark";
  remarkCell.appendChild(remarkInput);

  // Append all cells to the new row
  newRow.appendChild(materialCell);
  newRow.appendChild(thicknessCell);
  newRow.appendChild(resultCell);
  newRow.appendChild(remarkCell);

  // Append the new row to the table body
  tableBody.appendChild(newRow);
}
// Function to handle form submission and print
function handleFormSubmission(event) {
  event.preventDefault();

  // Your code for form submission goes here
  // For example, you can use AJAX to send form data to the specified endpoint

  // After successful submission, trigger printing
  window.print();
}

// Listen for the form submission
document.getElementById('report-form').addEventListener('submit', handleFormSubmission);


<style>
  /* Your existing CSS */

  /* Hide elements with class 'print-hide' when printing */
  @media print {
    .print-hide {
      display: none !important;
    }
  }
</style>

  document.getElementById('AddCity').addEventListener('input', function(event) {
    let cityInput = event.target;
    let city = cityInput.value;// city name condition
    if (city.charAt(0) !== city.charAt(0).toUpperCase()) {
      cityInput.value = city.charAt(0).toUpperCase() + city.slice(1);
    }
  });

  function validateCity() {
      let cityInput = document.getElementById('Add City').value;
      if (cityInput.charAt(0) !== cityInput.charAt(0).toUpperCase()) {
          alert('City name should start with a capital letter');
          return false; // Prevent form submission
      }
      return true; // Continue with form submission
  }
