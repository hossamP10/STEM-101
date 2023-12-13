function captureImage() {
  // Update the status message
  document.getElementById('status').textContent = 'Capturing...';
  document.getElementById('status').classList.remove('error');

  // Make the request to the Flask server to trigger ESP32-CAM capture
  fetch('/trigger_capture')
      .then(response => {
          if (!response.ok) {
              throw new Error('Network response was not ok ' + response.statusText);
          }
          return response.json();
      })
      .then(data => {
          // If there's an error, show it in the status div
          if (data.error) {
              document.getElementById('status').textContent = 'Error: ' + data.error;
              document.getElementById('status').classList.add('error');
          } else {
              // If successful, store the results and redirect to the results page
              sessionStorage.setItem('personName', data.name);
              sessionStorage.setItem('personImage', data.imageSrc);
              window.location.href = '/results';
          }
      })
      .catch(error => {
          // If there's an error in the request, show it in the status div
          document.getElementById('status').textContent = error.message;
          document.getElementById('status').classList.add('error');
      });
}
window.addEventListener('DOMContentLoaded', (event) => {
  const name = sessionStorage.getItem('personName');
  const imageSrc = sessionStorage.getItem('personImage');
  
  if (name && imageSrc) {
      document.getElementById('resultsName').textContent = name;
      document.getElementById('resultsImage').src = 'data:image/jpeg;base64,' + imageSrc;
  }
});
