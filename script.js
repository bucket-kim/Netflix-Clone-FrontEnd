
window.onload = () => {
  fetchMovie();
};

const fetchMovie = () => {
  fetch("https://api.themoviedb.org/3/discover/movie?api_key=ea50658dff38598f9ee0db5955b8e2b4&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1")
  .then((response) => {
    if (response.ok) {
      return response.json();
    } else { 
      throw new Error("Error!")
    }
  })
  .then((data) => {
    addMovies(data);
  })
  .catch((error) => {
    console.log(error);
  })
}

// Add movies to the front end
const addMovies = (movies) => {
  // add image to movies original
  let moviesEle = document.querySelector('.original__movies');
  for (movie of movies.results) {
    let image = `<img src="https://image.tmdb.org/t/p/original${movie.poster_path}" alt="">`;
    moviesEle.innerHTML += image;
  }
}


// ea50658dff38598f9ee0db5955b8e2b4