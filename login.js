let loginForm = document.getElementById('loginForm');
let apiUrl = 'http://localhost:3000';

loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  let payload = {
    email: loginForm.email.value,
    password: loginForm.password.value
  }
  fetch(apiUrl + "/login", {
    method: "POST",
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  })
  .then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error ("Something went wrong");
    }
  })
  .then((response) => {
    localStorage.setItem('token', response.token);
    location.href = '/';
  })
});


