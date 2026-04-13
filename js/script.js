const global = {
  currentPage: window.location.pathname,
};

// Display Popular Movie;

async function DisplayMovie() {
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
// Fetch Date From TMBD  API
async function fecthAPIData(endpoint) {
  const API_KEY = 'bf723475dd9a86edff7d43c561712377';
  const API_URL = 'https://api.themoviedb.org/3';
  // prettier-ignore
  const response = await fetch(`${API_URL}${endpoint}?api_key=${API_KEY}&language=en-GB`);
  const data = await response.json();
  return data;
}

const { currentPage } = global;

// Higthlight active link

function higthlightActiveLink() {
  const links = document.querySelectorAll('.nav-link');
  links.forEach(link => {
    if (link.getAttribute('href') === global.currentPage) {
      link.classList.add('active');
    }
  });
}

// Init App
function init() {
  switch (global.currentPage) {
    case '/':
    case '/index.html':
      DisplayMovie();
      break;

    case '/shows.html':
      console.log('shows');
      break;
    case '/movie-details.html':
      console.log('Movie Details');
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
