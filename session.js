const checkIfSignedIn = () => {
  const currentToken = localStorage.getItem('token');
  if (currentToken) {
    if (location.href == "http://127.0.0.1:5500/login.html") {
      location.href = "/";
    }
  } else {
    // If i'm not currently logged in
    // And trying to access to unauthorized page
    if (location.href != "http://127.0.0.1:5500/login.html") {
      location.href = "/login.html";
    }
  }
};

const logOut = () => {
  localStorage.removeItem('token');
  location.href = "/login.html";
}

checkIfSignedIn(); 