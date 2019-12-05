'use strict';

console.log('proof of life');

// global variables

var picOne = document.getElementById('picture1');
var picTwo = document.getElementById('picture2');
var picThree = document.getElementById('picture3');
var resultsSection = document.getElementById('list');
var pictureContainer = document.getElementById('image-container');
var picArray = [];
var picArrayContainers = [picOne, picTwo, picThree];
var voteRounds = 25;

var nameArray = [];
var clickArray = [];
var viewsArray = [];

function populateData() {
  for (var i = 0 ; i < picArray.length; i++) {
    nameArray.push(picArray[i].title);
    clickArray.push(picArray[i].clicked);
    viewsArray.push(picArray[i].viewed);
  }
}

//make a constructor

function Picture(src, name) {
  this.src = `../img/${src}.jpg`;
  this.title = name;
  this.alt = name;
  this.clicked = 0;
  this.viewed = 0;

  picArray.push(this);
}

// Random number function from MDN

function randomIndex(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function generateImages() {
  var currentImages = [];
  for(var i = 0 ; i < picArrayContainers.length; i++) {
    var currentRandomIndex = randomIndex(picArray.length);
    while (currentImages.includes(currentRandomIndex)) {
      currentRandomIndex = randomIndex(picArray.length);
    }
    currentImages.push(currentRandomIndex);
    picArrayContainers[i].src = picArray[currentRandomIndex].src;
    picArrayContainers[i].title = picArray[currentRandomIndex].title;
    picArrayContainers[i].alt = picArray[currentRandomIndex].alt;
    picArray[currentRandomIndex].viewed++;
  }
}

function handleClick(event) {
  voteRounds--;

  if(voteRounds !== 0) {
    var vote = event.target.title;
    for (var i = 0; i < picArray.length; i++) {
      if (vote === picArray[i].title) {
        picArray[i].clicked++;
      }
    }
    generateImages();
    console.table(picArray);
  } else {
    pictureContainer.removeEventListener('click', handleClick);
    analysis();
    populateData();
    graphData();
    // hide(pictureContainer);
  }
}

//show hide functions

function show(elem) {
  elem.style.display = 'block';
}

function hide(elem) {
  elem.style.display = 'none';
}

//create list

function analysis() {
  var ulEl = document.createElement('ul');
  for (var i = 0; i < picArray.length; i++) {
    var liEl = document.createElement('li');
    liEl.textContent = `${picArray[i].title}: ${picArray[i].clicked} clicks & ${picArray[i].viewed} views`;
    ulEl.appendChild(liEl);
  }
  resultsSection.appendChild(ulEl);
}

//Canvas information found at https://www.chartjs.org/
// CANVAS FUNCTION

function graphData() {
  var ctx = document.getElementById('myChart').getContext('2d');
  var makeViewsChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: nameArray,
      datasets: [{
        label: '# of Views',
        data: viewsArray,
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor:'rgba(255, 99, 132, 1)',
        borderWidth: 1
      },
      {label: '# of Clicks',
        data: clickArray,
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor:'rgba(255, 99, 132, 1)',
        borderWidth: 1}]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });
}



function createOnPageLoad() {
  new Picture ('bag', 'bag');
  new Picture ('banana', 'banana');
  new Picture ('bathroom', 'bathroom');
  new Picture ('boots', 'boots');
  new Picture ('breakfast', 'breakfast');
  new Picture ('bubblegum', 'bubblegum');
  new Picture ('chair', 'chair');
  new Picture ('cthulhu', 'cthulhu');
  new Picture ('dog-duck', 'dog duck');
  new Picture ('dragon', 'dragon');
  new Picture ('pen', 'pen');
  new Picture ('pet-sweep', 'pet sweep');
  new Picture ('scissors', 'scissors');
  new Picture ('shark', 'shark');
  new Picture ('sweep', 'sweep');
  new Picture ('tauntaun', 'tauntaun');
  new Picture ('unicorn', 'unicorn');
  new Picture ('usb', 'usb');
  new Picture ('water-can', 'water can');
  new Picture ('wine-glass', 'wine glass');
}

createOnPageLoad();

pictureContainer.addEventListener('click', handleClick);

generateImages();
