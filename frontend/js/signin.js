const signinForm = document.getElementById('signin-form');

signinForm.addEventListener('submit', (e) => {
  e.preventDefault(); 

  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  if (username === 'admin' && password === 'admin123') {
    showMessage('success', 'Signed in successfully!');
  } else {
    showMessage('error', 'Wrong password or name!');
  }
});

const showMessage = (type, message) => {
  const messageDiv = document.getElementById('message');
  messageDiv.innerHTML = '';

  const messageText = document.createElement('p');
  messageText.textContent = message;

  if (type === 'success') {
    messageText.style.color = 'green';
  } else if (type === 'error') {
    messageText.style.color = 'red';
  }

  messageDiv.appendChild(messageText);
}