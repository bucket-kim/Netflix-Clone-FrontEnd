const checkIfSignedIn = () => {
  const currentToken = localStorage.getItem('token');
  if (currentToken) {
    if (location.href == "http://127.0.0.1:5500/login.html") {
      location.href = "/";
    }
  } else {
    if (location.href != "http://127.0.0.1:5500/login.html") {
      location.href = "/login";
    }
  }
}

checkIfSignedIn(); 