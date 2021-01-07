
window.onload = () => {
  addMovies();
};

// Add movies to the front end
const addMovies = () => {
  
  // add image to movies original
  let moviesEle = document.querySelector('.original__movies');
  for (let i = 0; i < 10; i ++ ) {
    moviesEle.innerHTML += '<img src="https://www.themoviedb.org/t/p/w1280/zU0htwkhNvBQdVSIKB9s6hgVeFK.jpg" alt="">'
  }
}
