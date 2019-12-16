const moveName = document.querySelector('.movename');
const poster = document.querySelector('.moveinfo');
let value;
let div = document.querySelector(".moves");
const getValue = function () {
  value = moveName.value;
  if (div) {
    div.innerHTML = '';
  }


  let xhttp = new XMLHttpRequest();
  let obj;
  xhttp.onload = function() {
    obj = JSON.parse(this.responseText)["Search"];
    console.log(obj);
    for(let i = 0; i < obj.length; i++) {
      div.innerHTML += `<div class = "moveinfo" id = ${obj[i].imdbID}><img src="${obj[i].Poster}"><h3>---${obj[i].Type}---${obj[i].Title}</h3></div>`;
    }   
  };

  xhttp.open("GET", `http://www.omdbapi.com/?s=${value}&apikey=6a0a2e62`);
  xhttp.send();
}

div.addEventListener("click", (e) => {
  const de = document.querySelector(".detials");
  if (de) {
    de.outerHTML='';
  }
  if (e.target.parentElement.classList.contains("moveinfo")) {
    let details = new XMLHttpRequest();
    let obj1;
    details.onload = function() {
      obj1 = JSON.parse(this.responseText);
      console.log(e.target.parentElement.id);
      let ratingArray = obj1["Ratings"];
      let str = "";
      ratingArray.forEach(ele => { 
        str += `<p>Source :${ele["Source"]} Value: ${ele["Value"]}</p>`
      });
      e.target.parentElement.insertAdjacentHTML('beforeend', `<div class = detials><p>${obj1["Actors"]}</p><p>${obj1["Plot"]}</p><p>${obj1["Metascore"]}</p>${str}<p>${obj1["Released"]}</p></div>`);
    };
    details.open("GET", `http://www.omdbapi.com/?i=${e.target.parentElement.id}&apikey=6a0a2e62`);
    details.send();
  }
})