'use strict';

console.log('proof of life');

// global variables

var picOne = document.getElementById('picture1');
var picTwo = document.getElementById('picture2');
var picThree = document.getElementById('picture3');
var pictureContainer = document.getElementById('image-container');
var picArray = [];

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
    var index = randomIndex(picArray.length);
    
    picOne.src = picArray[index].src;
    picOne.title = picArray[index].title;
    picOne.alt = picArray[index].alt;

    picArray[index].viewed++;
    
    var indexTwo = randomIndex(picArray.length);

    while(indexTwo === index) {
        indexTwo = randomIndex(picArray.length);
    }

    picTwo.src = picArray[indexTwo].src;
    picTwo.title = picArray[indexTwo].title;
    picTwo.alt = picArray[indexTwo].alt;

    picArray[indexTwo].viewed++;

    var indexThree = randomIndex(picArray.length);

    while(indexThree === index || indexThree === indexTwo) {
        indexThree = randomIndex(picArray.length);
    }
    
    picThree.src = picArray[indexThree].src;
    picThree.title = picArray[indexThree].title;
    picThree.alt = picArray[indexThree].alt;

    picArray[indexThree].viewed++;

}


function handleClick(event) {
    var vote = event.target.title;
    for (var i = 0; i < picArray.length; i++) {
        if (vote === picArray[i].title) {
            picArray[i].clicked++;
        }
    }
    generateImages();
    console.table(picArray);
}

// CANVAS FUNCTION

function makeChart() {
    var ctx = document.getElementById('myChart').getContext('2d');
    var chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'line',

    // The data for our dataset
    data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [{
            
            label: 'My First dataset',
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: [0, 10, 5, 2, 20, 30, 45]

        }]
    },

    // Configuration options go here
    options: {}
    });
}

makeChart();

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
};

createOnPageLoad();

pictureContainer.addEventListener('click', handleClick);

generateImages();
