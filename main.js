const moveName = document.querySelector('.movename');
const poster = document.querySelector('.moveinfo');
let value;
const getValue = function () {
  value = moveName.value;

  let xhttp = new XMLHttpRequest();
  let div = document.querySelector(".moves");
  let obj;
  xhttp.onload = function() {
    obj = JSON.parse(this.responseText)["Search"];
    console.log(obj);
    for(let i = 0; i < obj.length; i++) {
      div.innerHTML += `<div class = "moveinfo" id = ${obj[i].imdbID}><img src="${obj[i].Poster}"><h2>${obj[i].Title}</h2></div>`;
    }   
  };

  xhttp.open("GET", `http://www.omdbapi.com/?s=${value}&apikey=6a0a2e62`);
  xhttp.send();
}



