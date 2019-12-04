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
var voteRounds = 5;

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
    makeViewsChart();
    hide(pictureContainer);
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

var ctx = document.getElementById('myChart').getContext('2d');
var makeViewsChart = new Chart(ctx, {
  type: 'bar',
  data: {
    datasets: [{
      data: [0, 5, 10, 15, 20, 25],
      label: 'Views',
      backgroundColor: 'rgb(24, 226, 105)',
      borderColor: 'rgb(24, 226, 105)',

      // This binds the dataset to the left y axis
      yAxisID: 'left-y-axis'
    }, {
      data: [0, 5, 10, 15, 20, 25],
      label: 'Clicks',
      backgroundColor: 'rgb(255, 99, 132)',
      borderColor: 'rgb(255, 99, 132)',
      // This binds the dataset to the right y axis
      yAxisID: 'right-y-axis'
    }],
    labels: ['1', '2', '3', '4', '5', '6']
  },
  options: {
    scales: {
      yAxes: [{
        id: 'left-y-axis',
        type: 'linear',
        position: 'left'
      }, {
        id: 'right-y-axis',
        type: 'linear',
        position: 'right'
      }]
    }
  }
});

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
