
const button = document.querySelector('.button');
const poster = document.querySelector('.moveinfo');

let div = document.querySelector(".moves");

const getValue = function () {
  let value = document.querySelector('.movename').value;
  if (div) {
    div.innerHTML = '';
  }
  fetch(`http://www.omdbapi.com/?s=${value}&apikey=6a0a2e62`)
  .then(res => res.json())
  .then(json => {
    console.log(json);
    json.Search.forEach((ele) => {
      div.innerHTML += `<div class = "moveinfo" id = ${ele.imdbID}><img src="${ele.Poster}"><h3>---${ele.Type}---${ele.Title}</h3></div>`;
    })
  });
}
button.addEventListener('click', getValue);
div.addEventListener("click", (e) => {
  const de = document.querySelector(".details");

  if (de) {
    de.outerHTML='';
  }

  if (e.target.parentElement.classList.contains("moveinfo")) {
    console.log(e.target.parentElement.id);
    fetch(`http://www.omdbapi.com/?i=${e.target.parentElement.id}&apikey=6a0a2e62`)
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
})

