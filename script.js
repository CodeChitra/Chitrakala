const API_KEY = 'api_key=a17c5a8cc9908b880efecf89037b7283';
const BASE_URL = 'https://api.themoviedb.org/3'
const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&' + API_KEY;
// const API_URL = BASE_URL + '/discover/movie?primary_release_date.gte=2014-09-15&primary_release_date.lte=2014-10-22&' + API_KEY;
const IMAGE_URl = 'https://image.tmdb.org/t/p/w500';

// This is how we search any thing from this api and at the end of it we add query parameteres
const SEARCH_URL = BASE_URL + '/search/movie?' + API_KEY

const main = document.getElementById('main');

const form = document.getElementById('form')
const search = document.getElementById('search');
getMovies(API_URL)
function getMovies(url) {
    fetch(url).then(res => res.json()).then(data => {
        // console.log(data.results)
        showMovies(data.results);
    })
}


function showMovies(data) {
    main.innerHTML = ""
    data.forEach(movie => {
        const { title, poster_path, vote_average, overview } = movie
        const movieEl = document.createElement('div');
        movieEl.classList.add('movie');
        movieEl.innerHTML = `
        <img
                src="${IMAGE_URl + poster_path}" alt = "${title}">

            <div class="movie_info">
                <h3>${title}</h3>
                <span class="${getColor(vote_average)}">${vote_average}</span>
            </div>

            <div class="overview">
                <h3>Overview</h3>
                ${overview}
            </div>
    
        `
        main.appendChild(movieEl)
    });
}

function getColor(vote) {
    if (vote >= 8)
        return 'green';
    else if (vote >= 5)
        return 'yellow';
    else
        return 'red';
}

form.addEventListener('submit', (e) => {
    e.preventDefault()
    const searchTerm = search.value;
    if (searchTerm) {
        getMovies(SEARCH_URL + '&query=' + searchTerm)
    }
    else {
        getMovies(API_URL);
    }
})