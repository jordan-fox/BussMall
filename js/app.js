'use strict';

// global variables

var picOne = document.getElementById('picture1');
var picTwo = document.getElementById('picture2');
var picThree = document.getElementById('picture3');
var pictureContainer = document.getElementById('image-container');
var picArray = [];
var uniqueIndexes = [];
var pics = [picOne, picTwo, picThree];
var picNames = [picOne, picTwo, picThree];
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

//Constructor function

function Picture(src, name) {
  this.src = `img/${src}.jpg`;
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

// Generate Unique image each time functions

function getUnique() {
  while (uniqueIndexes.length < 6) {
    var random = randomIndex(picArray.length);
    if (!uniqueIndexes.includes(random)) {
      uniqueIndexes.push(random);
    }
  }
}

function removeThree() {
  for (var i = 0; i < 3; i++) {
    uniqueIndexes.shift();
  }
}

function generateImages() {
  getUnique();

  for (var i = 0; i < pics.length; i++) {
    pics[i].src = picArray[uniqueIndexes[i]].src;
    pics[i].title = picArray[uniqueIndexes[i]].title;
    pics[i].alt = picArray[uniqueIndexes[i]].alt;
    picNames[i].textContent = picArray[uniqueIndexes[i]].title;

    picArray[uniqueIndexes[i]].viewed++;
  }
}

// Function that triggers on image click

function handleClick(event) {
  voteRounds--;

  if(voteRounds !== 0) {
    var vote = event.target.title;
    for (var i = 0; i < picArray.length; i++) {
      if (vote === picArray[i].title) {
        picArray[i].clicked++;
      }
    }
    removeThree();
    generateImages();
  } else {

    var stringPicArray = JSON.stringify(picArray);
    localStorage.setItem('BusMallData', stringPicArray);
    pictureContainer.removeEventListener('click', handleClick);
    populateData();
    graphData();
    hide(pictureContainer);
  }
}

//hide function

function hide(elem) {
  elem.style.display = 'none';
}

//Canvas information found at https://www.chartjs.org/ and CDN
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
        borderColor:'rgba(0, 0, 0, 1)',
        borderWidth: 1
      },
      {label: '# of Clicks',
        data: clickArray,
        backgroundColor: 'rgba(44, 200, 44, 0.2)',
        borderColor:'rgba(0, 0, 0, 1)',
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
  new Picture ('bag', 'R2-D2 Luggage');
  new Picture ('banana', 'Banana Cutter');
  new Picture ('bathroom', 'Bathroom Tablet Stand');
  new Picture ('boots', 'Toeless Boots');
  new Picture ('breakfast', 'All-in-One Breakfast Maker');
  new Picture ('bubblegum', 'Meatball BubbleGum');
  new Picture ('chair', 'Bubble Chair');
  new Picture ('cthulhu', 'Toy Cthulhu');
  new Picture ('dog-duck', 'Dog Duck Beak');
  new Picture ('dragon', 'Canned Dragon Meat');
  new Picture ('pen', 'Pen Utensil');
  new Picture ('pet-sweep', 'Dust Boots for Pets');
  new Picture ('scissors', 'Pizza Scissors');
  new Picture ('shark', 'Shark Sleeping Bag');
  new Picture ('sweep', 'Baby Dust Onesie');
  new Picture ('tauntaun', 'Tauntaun Sleeping Bag');
  new Picture ('unicorn', 'Canned Unicorn Meat');
  new Picture ('usb', 'Tentacle USB');
  new Picture ('water-can', 'Self-watering Can');
  new Picture ('wine-glass', 'Wine Glass');
}

//Local Storage function

function checkLocalStorage(){
  if(localStorage.BusMallData){
    var getStoredData = localStorage.getItem('BusMallData');
    picArray = JSON.parse(getStoredData);
    generateImages();
  } else {
    createOnPageLoad();
    generateImages();
  }
}

checkLocalStorage();
pictureContainer.addEventListener('click', handleClick);
