const loginFormHandler = async (event) => {
  event.preventDefault();

  // Collect values from the login form
  const email = document.querySelector('#email-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  if (email && password) {
    // Send a POST request to the API endpoint
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      // If successful, redirect the browser to the dashboard page. timeout allows client and server to sync

      setTimeout(() => {
        document.location.replace('/dashboard');
      }, 500);

    } else {
      alert(response.statusText);
    }
  }
};

const signupFormHandler = async (event) => {
  event.preventDefault();

  const username = document.querySelector('#name-signup').value.trim();
  const email = document.querySelector('#email-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();

  if (username && email && password) {
    const response = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify({ username, email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      setTimeout(() => {
        document.location.replace('/dashboard');
      }, 500);
      
    } else {
      alert(response.statusText);
    }
  }
};

document
  .querySelector('.login-form')
  .addEventListener('submit', loginFormHandler);

document
  .querySelector('.signup-form')
  .addEventListener('submit', signupFormHandler);

  // const updateDashboardContent = async () => {
  //   try {
  //     const response = await fetch('/dashboard'); // Replace this with your actual API endpoint
  //     if (response.ok) {
  //       const data = await response.json();
  //       // Update the DOM elements with the fetched data
  //       const dashboardElement = document.getElementById('dashboard-content');
  //       dashboardElement.textContent = JSON.stringify(data);
  //     } else {
  //       console.error('Failed to fetch data:', response.statusText);
  //     }
  //   } catch (error) {
  //     console.error('Error fetching data:', error);
  //   }
  // };