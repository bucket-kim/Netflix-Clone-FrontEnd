window.onload = () => {
  getOriginals();
  getTrendingNow();
  getTopRated();
  getGenres();
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

const fetchMoviesBasedOnGenre = (genreId) => {
  let url = "https://api.themoviedb.org/3/discover/movie?";
	url += "api_key=ea50658dff38598f9ee0db5955b8e2b4&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1";
	url += `&with_genres=${genreId}`;
  return fetch(url)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Error!")
      }
    })
}

// showing movie function with 3 params
const showMovies = (movies, element_select, path_type) => {
  let moviesEle = document.querySelector(element_select);
  for (movie of movies.results) {
    let image = `<img src="https://image.tmdb.org/t/p/original${movie[path_type]}" alt="">`;
    moviesEle.innerHTML += image;
  }
};

// fetching different genres
const getGenres = () => {
  const url = "https://api.themoviedb.org/3/genre/movie/list?api_key=ea50658dff38598f9ee0db5955b8e2b4&language=en-US";
  fetch(url)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Error!");
      }
    })
    .then((data) => {
      showMoviesGenres(data);
    })
    .catch((error) => {
      console.log(error)
    })
};

const showMoviesGenres = (genres) => {
  genres.genres.forEach((genre) => {
    const movies = fetchMoviesBasedOnGenre(genre.id);
    movies.then((movies) => {
      showMovieBasedOnGenre(genre.name, movies);
    }).catch((error) => {
      console.log("no!!", error);
    })
  })
};

const showMovieBasedOnGenre = (genreName, movies) => {
  let allMovies = document.querySelector(".movies");
  let genreEl = document.createElement('div');
  genreEl.classList.add('movies__header');
  genreEl.innerHTML = `<h2>${genreName}</h2>`;
  
  let moviesEl = document.createElement('div');
  moviesEl.classList.add('movies__container');
  moviesEl.setAttribute('id', genreName);

  for (let movie of movies.results) {
    const imageElement = document.createElement('img');
    imageElement.setAttribute('data-id', movie.id);
    imageElement.src = `https://image.tmdb.org/t/p/original${movie["backdrop_path"]}`;
    moviesEl.appendChild(imageElement);
  }

  allMovies.appendChild(genreEl);
  allMovies.appendChild(moviesEl);
}

// Add movies to the front end
// netflix original section
const getOriginals = () => {
  const url = "https://api.themoviedb.org/3/discover/movie?api_key=ea50658dff38598f9ee0db5955b8e2b4&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1";
  fetchMovies(url, ".original__movies", "poster_path");

};

// trending section
const getTrendingNow = () => {
  const url = "https://api.themoviedb.org/3/trending/all/day?api_key=ea50658dff38598f9ee0db5955b8e2b4";
  fetchMovies(url, "#trending", "backdrop_path");
};

// top rated section
const getTopRated = () => {
  const url = "https://api.themoviedb.org/3/movie/top_rated?api_key=ea50658dff38598f9ee0db5955b8e2b4&language=en-US&page=1";
  fetchMovies(url, "#topRated", "backdrop_path");
};

// ea50658dff38598f9ee0db5955b8e2b4