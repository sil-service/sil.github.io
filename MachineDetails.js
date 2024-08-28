// document.getElementById('machineForm').addEventListener('submit', function(event) {
//     event.preventDefault();
  
//     // Collect form data
//     var formData = {
//       companyName: document.getElementById('companyName').value,
//       companyAddress: document.getElementById('companyAddress').value,
//       machineSerial: document.getElementById('machineSerial').value,
//       laserPower: document.getElementById('laserPower').value
//     };
  
//     // Convert form data to query string format
//     var queryString = Object.keys(formData)
//       .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(formData[key]))
//       .join('&');
  
//     // Send data to Google Apps Script
//     fetch('https://script.google.com/macros/s/AKfycbwj-z_AjlKh1mZJNq62QEB1Pg84lhoKcc7pNKnKwx_9nMOgXCno_6bxj8N-VFsT61Kwaw/exec                                                                                                     ', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/x-www-form-urlencoded'
//       },
//       body: queryString
//     })
//     .then(response => response.json())
//     .then(data => {
//       document.getElementById('statusMessage').textContent = data.status;

//       // Reset the form after success message
//       document.getElementById('machineForm').reset();
//     })
//     .catch(error => {
//       document.getElementById('statusMessage').textContent = 'Error saving data.';
//       console.error('Error:', error);
//     });
// });
// //white space remove or not allowed white space
// document.getElementById('machineSerial').addEventListener('input', function() {
//   this.value = this.value.replace(/\s/g, '');
// });
// function goBack() {
//   window.history.back();
// }
document.getElementById('machineForm').addEventListener('submit', function (event) {
  event.preventDefault();

  // Show a confirmation dialog
  if (!confirm('Are you sure you want to save this information?')) {
    return; // If the user cancels, do nothing
  }

  // Collect form data
  var formData = {
    companyName: document.getElementById('companyName').value,
    companyAddress: document.getElementById('companyAddress').value,
    machineSerial: document.getElementById('machineSerial').value,
    laserPower: document.getElementById('laserPower').value,
  };

  // Convert form data to query string format
  var queryString = Object.keys(formData)
    .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(formData[key]))
    .join('&');

  // Send data to Google Apps Script
  fetch('https://script.google.com/macros/s/AKfycbwj-z_AjlKh1mZJNq62QEB1Pg84lhoKcc7pNKnKwx_9nMOgXCno_6bxj8N-VFsT61Kwaw/exec', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: queryString,
  })
    .then(response => response.json())
    .then(data => {
      document.getElementById('statusMessage').textContent = data.status;

      // Reset the form after success message
      document.getElementById('machineForm').reset();
    })
    .catch(error => {
      document.getElementById('statusMessage').textContent = 'Error saving data.';
      console.error('Error:', error);
    });
});

// Prevent white spaces in 'Machine Serial' field
document.getElementById('machineSerial').addEventListener('input', function () {
  this.value = this.value.replace(/\s/g, '');
});

// Function to go back to the previous page
function goBack() {
  window.history.back();
}
