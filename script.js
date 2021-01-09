
window.onload = () => {
  getOriginals();
  getTrendingNow();
  getTopRated(); 
};

// fetching movie function

const fetchMovies = (url, element_select, path_type) => {
  fetch(url)
  .then((response) => {
    if (response.ok) {
      return response.json();
    } else { 
      throw new Error("Error!")
    }
  })
  .then((data) => {
    showMovies(data, element_select, path_type);
  })
  .catch((error) => {
    console.log(error);
  })
};

// showing movie function with 3 params
const showMovies = (movies, element_select, path_type) => {
  let moviesEle = document.querySelector(element_select);
  for (movie of movies.results) {
    let image = `<img src="https://image.tmdb.org/t/p/original${movie[path_type]}" alt="">`;
    moviesEle.innerHTML += image;
  }
};

// Add movies to the front end

// netflix original section
const getOriginals = () => {
  let url = "https://api.themoviedb.org/3/discover/movie?api_key=ea50658dff38598f9ee0db5955b8e2b4&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1";
  fetchMovies(url, ".original__movies", "poster_path");
  
};

const addMovies = (movies) => {
  // add image to movies original
  let moviesEle = document.querySelector('.original__movies');
  for (movie of movies.results) {
    let image = `<img src="https://image.tmdb.org/t/p/original${movie.poster_path}" alt="">`;
    moviesEle.innerHTML += image;
  }
};

// trending section
const getTrendingNow = () => {
  let url = "https://api.themoviedb.org/3/trending/all/day?api_key=ea50658dff38598f9ee0db5955b8e2b4";
  fetchMovies(url, "#trending", "backdrop_path");
};


const showTrending = (movies) => {
  let moviesEle = document.querySelector('#trending');
  for (movie of movies.results) {
    let image = `<img src="https://image.tmdb.org/t/p/original${movie[backdrop_path]}" alt="">`;
    moviesEle.innerHTML += image;
  }
};

// top rated section
const getTopRated = () => {
  let url = "https://api.themoviedb.org/3/movie/top_rated?api_key=ea50658dff38598f9ee0db5955b8e2b4&language=en-US&page=1";
  fetchMovies(url, "#topRated", "backdrop_path");
  
};

const showTopRated = (movies) => {
  let moviesEle = document.querySelector('#topRated');
  for (movie of movies.results) {
    let image = `<img src="https://image.tmdb.org/t/p/original${movie[backdrop_path]}" alt="">`;
    moviesEle.innerHTML += image;
  }
};



// ea50658dff38598f9ee0db5955b8e2b4

