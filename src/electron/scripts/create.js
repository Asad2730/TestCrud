const { ipcRenderer } = require('electron');

// Function to send data to the main process
function sendData() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const name = document.getElementById('name').value;
  const type = document.getElementById('type').value;
  
  ipcRenderer.send('create-api', { email, password ,name,type});

}

// Call the sendData function when the "Login" button is clicked
document.getElementById('create').addEventListener('click', sendData);
