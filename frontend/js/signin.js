const signinForm = document.getElementById('signin-form');

signinForm.addEventListener('submit', async (e) => {
  e.preventDefault(); 

  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username,
      password
    })
  };

  const { message } = await fetch('/api/v1/users/login', options)
    .then(res => res.json());
  
  if (message == 'Correct Password') {
    document.location = `./home`;
  } else if (message == 'Incorrect password' || 'User does not exist') {
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