const signupButton = document.getElementById('sign-up');

signupButton.addEventListener('click', async (e) => {
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

  const { message } = await fetch('/api/v1/users/auth', options)
    .then(res => res.json());
  console.log(message)
  if (message == 'Created') {
    document.location = `./home`;
  } else if (message == 'User already exists') {
    alert('User already exists');
  }
});