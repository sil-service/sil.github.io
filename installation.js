// Function to add a new row to the thickness table
function addRow() {
    // Get the thickness table body
    var thicknessTableBody = document.getElementById("thickness-table-body");
  
    // Create a new table row
    var newRow = document.createElement("tr");
  
    // Create table data for cutting material dropdown
    var materialCell = document.createElement("td");
    var materialSelect = document.createElement("select");
    materialSelect.name = "material"+"_"+thicknessTableBody.children.length; // Assign a unique name if needed
       // Add options to the material dropdown
var materialOptions = ["Mild Steel", "Stainless Steel", "Aluminum", "Titanium", "Galvanized", "Copper", "Brass"];
for (var i = 0; i < materialOptions.length; i++) {
  var option = document.createElement("option");
  option.value = materialOptions[i];
  option.text = materialOptions[i];
  option.selected = true; // Select all options
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

  // function submitForm(event) {
function submitForm(event) {
  event.preventDefault();

  // Hide placeholders when the submit button is clicked
  hidePlaceholders();

  // Collect form data (you can use FormData or any method you prefer)
  let formData = new FormData(document.getElementById('report-form'));

  // Iterate over each row in the thickness table
  var table = document.getElementById("thickness-table-body");
  for (var i = 0, row; row = table.rows[i]; i++) {
      // Get the selected material option for the current row
      var materialSelect = row.cells[0].querySelector("select");
      var selectedMaterial = materialSelect.value;

      // Add the selected material option to the form data
      formData.append("material" + i, selectedMaterial);
  }

  // Display a confirmation dialog
  if (confirm("Are you sure you want to submit the form and download the PDF?")) {
      // Hide the buttons
      document.getElementById("add-thickness-button").style.display = "none";
      document.getElementById("addOtherButton").style.display = "none";
      document.getElementById("submit-btn").style.display = "none";
      document.getElementById("dashboard-btn").style.display = "none";

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
let tokenNumberText = `Token Number: ${firstWord}`;
console.log('Token Number:', tokenNumberText);
document.getElementById('token-number').innerText = tokenNumberText;
          // Clone the form and fill it with the submitted data
          let formClone = document.getElementById('report-form').cloneNode(true);
         // Add the token number to the cloned form
let tokenNumberElement = document.createElement('p');
tokenNumberElement.textContent = tokenNumberText;
formClone.insertBefore(tokenNumberElement, formClone.firstChild);


// Check if formClone exists before proceeding
if (formClone) {
    // Create and style the company name element
    let companyName = document.createElement('h1');
    companyName.textContent = 'Suresh Indu Lasers Private Limited';
    companyName.style.fontWeight = 'bold';
    companyName.style.fontFamily = 'Algerian, sans-serif';
    companyName.style.color = 'red';

    // Create and style the company address element
    let companyAddress = document.createElement('div');
    companyAddress.textContent = 'Address: Sub Plot No.19 Out of Final Plot No. 117 & 118, Ramtekdi Industrial Area, Hadapsar, Pune – 411013. INDIA.';
    companyAddress.style.fontFamily = 'Times New Roman, sans-serif';
    companyAddress.style.color = '';

    // Create and style the heading element
    let heading = document.createElement('h1');
    companyAddress.style.fontFamily = 'Times New Roman, sans-serif';
    heading.textContent = 'Machine Installation/Commissioning Report';

    // Append the company name and address elements before the heading in formClone
    formClone.insertBefore(heading, formClone.firstChild);
    formClone.insertBefore(companyAddress, formClone.firstChild);
    formClone.insertBefore(companyName, formClone.firstChild);
    
} else {
    // Handle the scenario where formClone is not found
    console.error('Element with ID "formClone" not found!');
}

  
          formData.forEach((value, key) => {
              let element = formClone.querySelector(`[name="${key}"]`);
              if (element) {
                  if (element.tagName === 'INPUT' && element.type === 'radio') {
                      formClone.querySelector(`[name="${key}"][value="${value}"]`).checked = true;
                  } else {
                      element.value = value;
                  }
              }
          });
                  // Generate PDF of the cloned form
          html2pdf(formClone, {
              margin: 1,
              filename: 'report.pdf',
              image: { type: 'jpeg', quality: 0.98 },
              html2canvas: { scale: 2 },
              jsPDF: { unit: 'in', format: 'A4', orientation: 'portrait' },
              // Add page breaks before or after specific elements
              pagebreak: { mode: 'avoid-all', before: '.pagebreak-before', after: '.pagebreak-after' },
          }).then(pdf => {
              // After the PDF is generated, reset the form
              document.getElementById('report-form').reset();

              // Convert the PDF to a blob
              pdf.output('blob').then(blob => {
                  // Create a blob URL for the PDF
                  let url = URL.createObjectURL(blob);
                  // Check if it's a mobile device
                  if (/Mobi|Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Redmi|Realme|Vivo|Oppo/i.test(navigator.userAgent)) {
                      // For mobile devices, open the PDF in a new window
                      window.open(url, '_blank');
                  } else {
                      // For desktop devices, trigger the download
                      let a = document.createElement('a');
                      a.href = url;
                      a.download = 'report.pdf';
                      a.click();
                  }
              });
          });
          alert("Form submitted successfully and PDF downloaded!");
      })
      .catch(error => {
          console.error('Error submitting form:', error);
      });
  }
}

//calculate days    
function calculateAndValidateDays() {
    const startDate = new Date(document.getElementById('Start-date').value);
    const endDate = new Date(document.getElementById('End-date').value);
  
    const totalDays = (endDate - startDate) / (1000 * 60 * 60 * 24) + 1; // Calculate and include both dates
  
    const enteredDays = parseInt(document.getElementById('no-of-days').value);
  
    if (enteredDays > totalDays) {
      alert(`Error: Entered number of days (${enteredDays}) cannot be greater than the actual number of days (${totalDays}) between the selected dates.`);
      document.getElementById('no-of-days').value = ''; // Clear the input field
    }
  }
  
  // Event listeners to trigger calculation and validation on date changes
  document.getElementById('Start-date').addEventListener('change', calculateAndValidateDays);
  document.getElementById('End-date').addEventListener('change', calculateAndValidateDays);
  
  // Event listener to trigger validation on user input change
  document.getElementById('no-of-days').addEventListener('change', calculateAndValidateDays);
  
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
  document.addEventListener('DOMContentLoaded', function() {
    // Access element and its style here
});

  