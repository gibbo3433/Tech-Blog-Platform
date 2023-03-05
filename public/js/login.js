const loginFormHandler = async (event) => {
    event.preventDefault();
  
    // this will allow the user to login
    const email = document.querySelector('#email-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();
    // this will check if the users details are in the system
    if (email && password) {
      

      const response = await fetch('/api/users/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/profile');
      } else {
        alert(response.statusText);
      }
    }
  };

  document
  .querySelector('.login-form')
  .addEventListener('submit', loginFormHandler);