// const { currentPage } = global;
const global = {
  currentPage: window.location.pathname,
  search: {
    term: '',
    type: '',
    pages: 1,
    totalPages: 1,
  },
  api: {
    apiKey: 'bf723475dd9a86edff7d43c561712377',
    apiUrl: 'https://api.themoviedb.org/3',
  },
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
               alt="${movie.title}"
            />`
            : `<img
              src="images/no-image.jpg"
              class="card-img-top"
              alt="${movie.title}"
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
           <small class="text-muted">Release: ${show.first_air_date}</small>
           </p>
         </div>
          `;
    document.getElementById('popular-shows').appendChild(div);
  });
}

// DisplayMovieDetails
async function displayMovieDetails() {
  const movieId = window.location.search.split('=').at(1);
  const movie = await fecthAPIData(`/movie/${movieId}`);

  // overlay for backdrop Images
  displayBackdropImage('movie', movie.backdrop_path);
  // const movie = await fecthAPIData(`movie/${movieId}`);
  if (!movie) return;

  //  crreate a div
  const div = document.createElement('div');
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
          ${movie.homepage ? `<a href="${movie.homepage}" target="_blank" class="btn">Visit Movie Homepage</a>` : `<a disabled="true" href="#" class="btn">Visit Movie Homepage</a>`}z
         
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
        <div class="list-group">${movie.production_companies.map(({ name }) => `<span>${name}</span>`).join(',  ')}</div>
      </div>
      `;

  document.getElementById('movie-details').appendChild(div);
}

// Display show deatils
async function displayShowDetails() {
  const showId = window.location.search.split('=')[1];
  const show = await fecthAPIData(`/tv/${showId}`);
  // overlay for backdrop Images
  displayBackdropImage('show', show.backdrop_path);
  // const show = await fecthAPIData(`show/${showId}`);
  if (!show) return;

  const div = document.createElement('div');

  // div.classList.add('details-top');
  div.innerHTML = `
  <div class="details-top">
        <div>
         ${
           show.poster_path
             ? ` <img
              src="https://image.tmdb.org/t/p/w500${show.poster_path}"
              class="card-img-top"
              alt="${show.title}"
            />`
             : `<img
              src="images/no-image.jpg"
              class="card-img-top"
              alt="${show.name}"
            />`
         } 
        </div>
        <div>
          <h2>${show.name}</h2>
          <p>
            <i class="fas fa-star text-primary"></i>
            ${show.vote_average.toFixed(1)} / 10
          </p>
          <p class="text-muted">Last Air Date: ${show.last_air_date}</p>
          <p>
           ${show.overview}
          </p>
          <h5>Genres</h5>
          <ul class="list-group">
          ${show.genres.map(({ name }) => `<li>${name}</li>`).join('')}
          </ul>
          ${show.homepage ? `<a href="${show.homepage}" target="_blank" class="btn">Visit Movie Homepage</a>` : `<a disabled="true" href="#" class="btn">Visit Movie Homepage</a>`}
         
        </div>
      </div>
      <div class="details-bottom">
        <h2>Show Info</h2>
        <ul>
          <li><span class="text-secondary">Number of Episodes:</span> ${show.number_of_episodes}</li>
          <li><span class="text-secondary">Last Episode To Air: </span>${show.last_episode_to_air.name}</li>
          <li><span class="text-secondary">Status:</span> ${show.status}</li>
        </ul>
        <h4>Production Companies</h4>
        <div class="list-group">${show.production_companies.map(({ name }) => `<span>${name}</span>`).join(',  ')}</div>
      </div>
      `;

  document.getElementById('show-details').appendChild(div);
}

function displayBackdropImage(type, backgroundPath) {
  const overlayDiv = document.createElement('div');
  overlayDiv.style.backgroundImage = `url(https://image.tmdb.org/t/p/original/${backgroundPath})`;
  overlayDiv.classList.add('overlay-back');

  if (type === 'movie') {
    document.getElementById('movie-details').appendChild(overlayDiv);
  } else {
    document.getElementById('show-details').appendChild(overlayDiv);
  }
}

// Fetch
async function displaySlider() {
  const { results } = await fecthAPIData('/movie/now_playing');
  results.forEach(movie => {
    const div = document.createElement('div');
    div.classList.add('swiper-slide');
    div.innerHTML = `
          <a href="movie-details.html?id=${movie.id}">
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
              alt="${movie.name}"
            />`
            } 
          </a>
          <h4 class="swiper-rating">
            <i class="fas fa-star text-secondary"></i> ${movie.vote_average.toFixed(2)}/ 10
          </h4>
         `;
    document.querySelector('.swiper-wrapper').appendChild(div);
    initSwiper();
  });
}

// DEPEND
async function searchResult() {
  // const { results } = await fecthAPIData('/search/movie');
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  // const { results } = await fecthAPIData(`/search/${URLParams}`);
  global.search.type = urlParams.get('type');
  global.search.term = urlParams.get('search-term');
  if (global.search.term !== '' && global.search.term !== null) {
    const { results, total_pages, page } = await searchAPIData();

    if (results.length === 0) {
      return showAlert('No Results found');
    }

    displaySearchResults(results);
    // Limpando o campo de input
    document.getElementById('search-term').value = '';
  } else {
    showAlert('Please enter your search term', 'alert');
  }
}

// Display Results and append to the DOM

function displaySearchResults(results) {
  results.forEach(result => {
    console.log(result, 'estou aqui !!!');
    const card = document.createElement('div');
    const title = global.search.type === 'movie' ? result.title : result.name;
    const release =
      global.search.type === 'movie'
        ? result.release_date
        : result.first_air_date;
    console.log(title);
    card.classList.add('card');
    card.innerHTML = `
        <a href="${global.search.type}-details.html?id=${result.id}">
             ${
               result.poster_path
                 ? ` <img
              src="https://image.tmdb.org/t/p/w500/${result.poster_path}"
              class="card-img-top"
              alt="${title}"
            />`
                 : `<img
              src="images/no-image.jpg"
              class="card-img-top"
              alt="${title}"
            />`
             } 
        </a>
        <div class="card-body">
          <h5 class="card-title">${title}</h5>
          <p class="card-text">
            <small class="text-muted">Release: ${release}</small>
          </p>
        </div>
      `;
    document.getElementById('search-results').appendChild(card);
  });
}

// InitSlider Swiper
function initSwiper() {
  const swiper = new Swiper('.swiper', {
    slidesPerView: 1,
    spaceBetween: 30,
    freeMode: true,
    loop: true,
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
    },
    breakpoints: {
      500: {
        slidesPerView: 2,
      },
      700: {
        slidesPerView: 3,
      },
      1200: {
        slidesPerView: 4,
      },
    },
  });
}

// Fetch Date From TMBD  API
async function fecthAPIData(endpoint) {
  showSpinner();
  const { apiKey, apiUrl } = global.api;
  // prettier-ignore
  const response = await fetch(
    `${apiUrl}${endpoint}?api_key=${apiKey}&language=en-GB`
  );
  hideSpinner();
  const data = await response.json();
  return data;
}

// Make Search term
async function searchAPIData() {
  showSpinner();
  const { apiKey, apiUrl } = global.api;
  const { type, term } = global.search;
  // prettier-ignore
  const response = await fetch(`${apiUrl}/search/${type}?api_key=${apiKey}&language=en-GB&query=${term}`);

  hideSpinner();
  const data = await response.json();
  // console.log(data);
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

// INIC     COMP FIM
// show Error

function showAlert(message, className = 'alert') {
  const elementError = document.createElement('div');
  elementError.classList.add(className);
  elementError.appendChild(document.createTextNode(message));
  // console.log(elementError);
  document.getElementById('alert').appendChild(elementError);
  setTimeout(() => elementError.remove(), 3000);
}
const desativado = () => {
  // Mostrando o resutado
  const showError = async erro => await displayErro(erro);

  function displayErro(textErr) {
    const spanElement = document.createElement('span');
    spanElement.innerHTML = `
      <span>${textErr}</span>
      `;
    const html = textErr ? textErr : '';
  }

  // Show the Search Results
  //  DEBUG

  async function showTheResults(endpoint) {
    const { results } = await (await fetch(endpoint)).json();

    if (results.length === 0) return;

    Array.from(results).forEach(data => {
      const container = document.createElement('div');
      container.classList.add('container--card');
      container.innerHTML = `
        
        `;
    });
  }
};

// Add pontos
function addCommasToNumber(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

// Init App
function init() {
  switch (global.currentPage) {
    case '/':
    case '/index.html':
      displaySlider();
      DisplayPopularMovie();
      break;

    case '/shows.html':
      DisplayPopularShows();
      console.log('show popular movie');
      break;
    case '/movie-details.html':
      displayMovieDetails();
      console.log('show de movie');
      break;
    case '/tv-details.html':
      displayShowDetails();
      console.log('Tv show');
      break;
    case '/search.html':
      searchResult();
      break;
  }
  higthlightActiveLink();
}

document.addEventListener('DOMContentLoaded', init);
