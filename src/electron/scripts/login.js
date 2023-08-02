const { ipcRenderer } = require('electron');

// Function to send data to the main process
function sendData() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  ipcRenderer.send('login-api', { email, password });

}

ipcRenderer.on('login-success', (event, data) => {
  // Handle login success here
  console.log('Login successful! Data:', data);
  // Redirect to create.html
  window.location.href = '../pages/create.html';
});

ipcRenderer.on('login-error', (event, message) => {
  // Handle login error here
  console.error('Login error:', message);
  // Display error message to the user (if needed)
});

// Call the sendData function when the "Login" button is clicked
document.getElementById('login').addEventListener('click', sendData);
