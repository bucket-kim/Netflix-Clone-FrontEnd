window.onload = () => {
  getOriginals();
  getTrendingNow();
  getTopRated();
  getGenres();
  getWishList();
};

const getWishList = () => {
  fetch("http://localhost:3000/wishlist", {
    headers: {
      authorization: `${localStorage.getItem('token')}`
    }
  })
  .then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error("Error!")
    }
  })
  .then((data) => {
    console.log(data)
  })
  .catch((error) => {
    logOut();
    console.log(error)
  })
}

async function getMovieTrailer(id) {
  let url = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=ea50658dff38598f9ee0db5955b8e2b4&language=en-US`;
  return await fetch(url)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Error!")
      }
    })
};

async function getTitle(id) {
  let url = `https://api.themoviedb.org/3/movie/${id}?api_key=ea50658dff38598f9ee0db5955b8e2b4&language=en-US
  `;
  return await fetch(url)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Error!")
      }
    })
};


const setTrailer = (trailers) => {
  const iframe = document.getElementById('movieTrailer');
  const movieNotFound = document.querySelector('.movieNotFound');
  if (trailers.length > 0) {
    movieNotFound.classList.add('d-none');
    iframe.classList.remove('d-none');
    iframe.src = `https://www.youtube.com/embed/${trailers[0].key}`
  } else {
    iframe.classList.add('d-none');
    movieNotFound.classList.remove('d-none');
  };
}

const handleMovieSelect = (e) => {
  const id = e.target.getAttribute('data-id');
  getMovieTrailer(id)
    .then((data) => {
      const results = data.results;
      const youtubeTrailer = results.filter((result) => {
        if (result.site == "YouTube" && result.type == "Trailer") {
          return true
        } else {
          return false
        }
      });
      setTrailer(youtubeTrailer);
    });
  getTitle(id)
    .then((data) => {
      const title = data.original_title;
      const explain = data.overview;
      const movieTitle = document.querySelector('.modal-title');
      const explainSection = document.querySelector('.modal-footer');
      movieTitle.innerHTML = title;
      explainSection.innerHTML = explain;
    })
  // open modal
  $('#trailerModal').modal('show')

  // close modal and iframe
  $('#trailerModal').on('hidden.bs.modal', (e) => {
    var $iframes = $(e.target).find('iframe');
    $iframes.each((index, iframe) => {
    $(iframe).attr('src', $(iframe).attr('src'));
    });
  })
  // call the api with the id

}

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

const fetchMoviesGenreBased = (genreId) => {
  let url = "https://api.themoviedb.org/3/discover/movie?";
  url += "api_key=ea50658dff38598f9ee0db5955b8e2b4&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1";
  url += `&with_genres=${genreId}`
  return fetch(url)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Error!")
      }
    })
  // returns a promise already
};

// showing movie function with 3 params
const showMovies = (movies, element_select, path_type) => {
  let moviesEle = document.querySelector(element_select);
  for (movie of movies.results) {
    let imageEle = document.createElement('img');
    imageEle.src = `https://image.tmdb.org/t/p/original${movie[path_type]}`;
    imageEle.setAttribute('data-id', movie.id);
    imageEle.addEventListener('click', (e) => {
      handleMovieSelect(e);
    });
    moviesEle.appendChild(imageEle);
  }
};

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

// fetching genres

const showMovieGenres = (genres) => {
  genres.genres.forEach((genre) => {
    // get list of movies first
    const movies = fetchMoviesGenreBased(genre.id);
    movies
      .then((movie) => {
        showMovieBasedOnGenre(genre.name, movie);
      })
      .catch((error) => {
        console.log(error)
      })
    // show movies based on genre

  });
};

const showMovieBasedOnGenre = (genre, movies) => {
  let allMovies = document.querySelector('.movies');
  let genreEle = document.createElement('div');
  genreEle.classList.add('movies__header');
  genreEle.innerHTML = `<h2>${genre}</h2>`;
  
  let moviesEle = document.createElement('div');
  moviesEle.classList.add('movies__container');
  moviesEle.setAttribute('id', genre);

  for (movie of movies.results) {
    let imageEle = document.createElement('img');
    imageEle.src = `https://image.tmdb.org/t/p/original${movie["backdrop_path"]}`;
    imageEle.setAttribute('data-id', movie.id);
    imageEle.addEventListener('click', (e) => {
      handleMovieSelect(e);
    });
    moviesEle.appendChild(imageEle);
  }

  allMovies.appendChild(genreEle);
  allMovies.appendChild(moviesEle);

}

const getGenres = () => {
  const url = 'https://api.themoviedb.org/3/genre/movie/list?api_key=ea50658dff38598f9ee0db5955b8e2b4&language=en-US';
  fetch(url)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Error!")
      }
    })
    .then((data) => {
      showMovieGenres(data);
    })
    .catch((error) => {
      console.log(error);
    })
};



// ea50658dff38598f9ee0db5955b8e2b4