// const { currentPage } = global;
const global = {
  currentPage: window.location.pathname,
};

// Display 20 must Popular Movie;
async function DisplayPopularMovie() {
  const { results } = await fecthAPIData('/movie/popular');

  results.forEach(movie => {
    const { id, poster_path } = movie;
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
        <a href="movie-details.html?id=${id}">
        ${
  poster_path
    ? ` <img
              src="https://image.tmdb.org/t/p/w500${poster_path}"
              class="card-img-top"
              alt="Movie Title"
            />`
    : `<img
              src="images/no-image.jpg"
              class="card-img-top"
              alt="Movie Title"
            />`
} 
        </a>
        <div class="card-body">
         <h5 class="card-title">${movie.title}</h5>
         <p class="card-text">
           <small class="text-muted">Release: ${movie.release_date}</small>
           </p>
         </div>
          `;
    document.getElementById('popular-movies').appendChild(div);
  });
}

// Display 20 must Popular tv showa;
async function DisplayPopularShows() {
  document.getElementById('popular-shows').innerHTML = '';
  const { results } = await fecthAPIData('/tv/popular');

  results.forEach(show => {
    const { id, poster_path } = show;
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
        <a href="tv-details.html?id=${id}">
        ${
  poster_path
    ? ` <img
              src="https://image.tmdb.org/t/p/w500${poster_path}"
              class="card-img-top"
              alt="${show.name}"
            />`
    : `<img
              src="images/no-image.jpg"
              class="card-img-top"
              alt="${show.name}"
            />`
} 
        </a>
        <div class="card-body">
         <h5 class="card-title">${show.name}</h5>
         <p class="card-text">
           <small class="text-muted">Release: ${show.first_air_data}</small>
           </p>
         </div>
          `;
    document.getElementById('popular-shows').appendChild(div);
  });
}

// DisplayMovieDetails

async function displayMovieDetails() {
  const movieId = window.location.search.split('=')[1];
  // const movie = await fecthAPIData(`movie/${movieId}`);
  const movie = await fecthAPIData(`/movie/${movieId}`);
  console.log('details-movie');
  if (!movie) return;

  console.log(movie);
  // if (!movieId) return;

  const div = document.createElement('div');

  // div.classList.add('details-top');
  div.innerHTML = `
  <div class="details-top">
        <div>
         ${
  movie.poster_path
    ? ` <img
              src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
              class="card-img-top"
              alt="${movie.title}"
            />`
    : `<img
              src="images/no-image.jpg"
              class="card-img-top"
              alt="${movie.title}"
            />`
} 
        </div>
        <div>
          <h2>${movie.title}</h2>
          <p>
            <i class="fas fa-star text-primary"></i>
            ${movie.vote_average.toFixed(1)} / 10
          </p>
          <p class="text-muted">Release Date: ${movie.release_date}</p>
          <p>
           ${movie.overview}
          </p>
          <h5>Genres</h5>
          <ul class="list-group">
          ${movie.genres.map(({ name }) => `<li>${name}</li>`).join('')}
          </ul>
          ${movie.homepage ? `<a href="${movie.homepage}" target="_blank" class="btn">Visit Movie Homepage</a>` : `<a disabled="true" href="#" class="btn">Visit Movie Homepage</a>`}
         
        </div>
      </div>
      <div class="details-bottom">
        <h2>Movie Info</h2>
        <ul>
          <li><span class="text-secondary">Budget:</span>$${addCommasToNumber(movie.budget)}</li>
          <li><span class="text-secondary">Revenue:</span>$${addCommasToNumber(movie.revenue)}</li>
          <li><span class="text-secondary">Runtime:</span> ${movie.runtime} min</li>
          <li><span class="text-secondary">Status:</span> ${movie.status}</li>
        </ul>
        <h4>Production Companies</h4>
        <div class="list-group">${movie.production_companies.map(({ name }) => `<span>${name}</span>`).join(",  ")}</div>
      </div>
      `;

  const movi = document.getElementById('movie-details');
  movi.appendChild(div);
}

// Fetch Date From TMBD  API
async function fecthAPIData(endpoint) {
  showSpinner();
  const API_KEY = 'bf723475dd9a86edff7d43c561712377';
  const API_URL = 'https://api.themoviedb.org/3';
  // prettier-ignore
  const response = await fetch(
    `${API_URL}${endpoint}?api_key=${API_KEY}&language=pt-PT`
  );
  hideSpinner();
  const data = await response.json();
  return data;
}

// Show Spinner

function showSpinner() {
  document.querySelector('.spinner').classList.add('show');
}
function hideSpinner() {
  document.querySelector('.spinner').classList.remove('show');
}

// Higthlight active link

function higthlightActiveLink() {
  const links = document.querySelectorAll('.nav-link');
  links.forEach(link => {
    if (link.getAttribute('href') === global.currentPage) {
      link.classList.add('active');
    }
  });
}
// Add pontos
function addCommasToNumber(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

// Init App
function init() {
  switch (global.currentPage) {
  case '/':
  case '/index.html':
    DisplayPopularMovie();
    break;

  case '/shows.html':
    DisplayPopularShows();
    break;
  case '/movie-details.html':
    const x = displayMovieDetails();
    console.log(x);
    break;
  case '/tv-details.html':
    console.log('TV Details');
    break;
  case '/search.html':
    console.log('Search');
    break;
  }
  higthlightActiveLink();
}

document.addEventListener('DOMContentLoaded', init);
