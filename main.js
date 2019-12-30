const button = document.querySelector('.button');
const poster = document.querySelector('.moveinfo');

let div = document.querySelector(".moves");
let value;
let total = 0;
let url = "";
let page = 1;
const getValue = function () {
  value = document.querySelector('.movename').value;
  url = `http://www.omdbapi.com/?s=${value}&apikey=6a0a2e62&page=1`
  if (div) {
    div.innerHTML = '';
  }
  fetch(url)
  .then(res => res.json())
  .then(json => {
    total = json.totalResults;
    div.innerHTML += `<div><h1>TotalResult:${json.totalResults}</h1></div>`;
    json.Search.forEach((ele) => {
      div.innerHTML += `<div class = "moveinfo" id = ${ele.imdbID}><img src="${ele.Poster}"><h3>---${ele.Type}---${ele.Title}</h3></div>`;
    })
    let tempdiv = document.createElement("div");
    tempdiv.className = "nav";
    tempdiv.innerHTML = `<div ><h2 class ="previous">Previous</h2></div><div><h2  class ="next">Next</h2></div>`;
    div.insertAdjacentElement('beforeend', tempdiv);
  });
}

button.addEventListener('click', getValue);

const getInfo = function(url) {
  div.innerHTML = '';
  fetch(url)
  .then(res => res.json())
  .then(json => {
    total = json.totalResults;
    div.innerHTML += `<div><h1>TotalResult:${json.totalResults}</h1></div>`;
    json.Search.forEach((ele) => {
      div.innerHTML += `<div class = "moveinfo" id = ${ele.imdbID}><img src="${ele.Poster}"><h3>---${ele.Type}---${ele.Title}</h3></div>`;
    })
    let tempdiv = document.createElement("div");
    tempdiv.className = "nav";
    tempdiv.innerHTML = `<div ><h2 class ="previous">Previous</h2></div><div><h2  class ="next">Next</h2></div>`;
    div.insertAdjacentElement('beforeend', tempdiv);
  });
}

div.addEventListener('click', (e) => {
  const de = document.querySelector(".details");
  if (de) {
    de.outerHTML='';
  }

  if (e.target.parentElement.classList.contains("moveinfo")) {
    console.log(e.target.parentElement.id);
    fetch(`http://www.omdbapi.com/?i=${e.target.parentElement.id}&apikey=6a0a2e62&page=${page}`)
    .then(res => res.json())
    .then(json => {
      console.log(json);
      let ratingArray = json.Ratings;
      let str = "";
      ratingArray.forEach(ele => { 
        str += `<p>Source :${ele.Source} Value: ${ele.Value}</p>`
      });
      e.target.parentElement.insertAdjacentHTML('beforeend', `<div class = "details"><p>${json.Actors}</p><p>${json.Plot}</p><p>${json.Metascore}</p>${str}<p>${json.Released}</p></div>`);
    });
  }


  if (url === `http://www.omdbapi.com/?s=${value}&apikey=6a0a2e62&page=1`) {

    if(e.target.classList.contains('next')) {
      url = `http://www.omdbapi.com/?s=${value}&apikey=6a0a2e62&page=${++page}`;
      getInfo(url);
    } 
    
  } else if (url === `http://www.omdbapi.com/?s=${value}&apikey=6a0a2e62&page=${parseInt(total/10) + 1}`) {

    if(e.target.classList.contains('previous')) {
      url = `http://www.omdbapi.com/?s=${value}&apikey=6a0a2e62&page=${--page}`;
      getInfo(url);
    } 

  } else {

    if(e.target.classList.contains('next')) {
      url = `http://www.omdbapi.com/?s=${value}&apikey=6a0a2e62&page=${++page}`;
      getInfo(url);
    } else if(e.target.classList.contains('previous')) {
      url = `http://www.omdbapi.com/?s=${value}&apikey=6a0a2e62&page=${--page}`;
      getInfo(url);
    }

  }
});


