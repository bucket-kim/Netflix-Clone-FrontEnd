const checkIfSignedIn = () => {
  const currentToken = localStorage.getItem('token');
  if (currentToken) {
    if (location.href.includes("/login.html") 
      || location.href.includes("/register.html")) {
      location.href = "/";
    }
  } else {
    // If i'm not currently logged in
    // And trying to access to unauthorized page
    if (!location.href.includes("/login.html") 
        && !location.href.includes("/register.html")) {
      location.href = "/login.html";
    }
  }
};

const logOut = () => {
  localStorage.removeItem('token');
  location.href = "/login.html";
}

checkIfSignedIn(); 