

const search = document.getElementById("search");
const regionSelect = document.getElementById("regionSelect");
const flags = document.getElementById("flags");
const loader = document.getElementById("loader"); 

function showLoader() {
  loader.style.display = "block"; 
}

function hideLoader() {
  loader.style.display = "none";
}

function getRegionCountries() {
  showLoader();
  const region = regionSelect.value;
  fetch("https://restcountries.com/v3.1/all")
    .then(response => response.json())
    .then(data => {
      const filteredData = region ? data.filter(item => item.region === region) : data;
      flags.innerHTML = filteredData.map(item => `
          <div id="newDiv">
              <img src="${item.flags.png}" alt="Flag" />
              <h2 id="newDiv">${item.name.common}</h2>
          </div>
      `).join('');
      hideLoader();
    });
}

async function go() {
  showLoader();
  let valueS = search.value.toLowerCase();
  let selectedRegion = regionSelect.value;
  fetch("https://restcountries.com/v3.1/all")
    .then(response => response.json())
    .then(data => {
      let filteredData = data;
      if (selectedRegion) {
        filteredData = filteredData.filter(item => item.region === selectedRegion);
      }
      if (valueS) {
        filteredData = filteredData.filter(item => item.name.common.toLowerCase().startsWith(valueS));
      }
      console.log(filteredData);
      flags.innerHTML = filteredData.map(item => `
          <div id="newDiv">
              <img src="${item.flags.png}" alt="Flag" />
              <h2 id="newDiv">${item.name.common}</h2>
          </div>
      `).join('');
      hideLoader();
    });
}

getRegionCountries();
document.addEventListener('DOMContentLoaded', function () {
  let spanElement = document.querySelector('.range span');
  let bodyElement = document.body;
  let headings = document.querySelectorAll('h1, h2, h3');

  spanElement.addEventListener('click', function () {
    this.classList.toggle('active');
    bodyElement.classList.toggle('black-bg');

    headings.forEach(function (heading) {
      heading.classList.toggle('white-text');
    });
  });
});

// Ganji Yusifov


