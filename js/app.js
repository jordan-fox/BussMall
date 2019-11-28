'use strict';

console.log('proof of life');

// global variables

var picOne = document.getElementById('picture1');
var picTwo = document.getElementById('picture2');
var picThree = document.getElementById('picture3');
var picArray = [];

// display 3 images side by side
// image tag has 3 properties 'src', 'title', and 'alt'

picOne.src = '../img/bag.jpg';
picOne.title = 'bag';
picOne.alt = 'bag';

picTwo.src = '../img/banana.jpg';
picTwo.title = 'banana';
picTwo.alt = 'banana';

picThree.src = '../img/bathroom.jpg';
picThree.title = 'bathroom';
picThree.alt = 'bathroom';

//make a constructor

function Picture (src, name) {
    this.src = `../img/${src}.jpg`;
    this.title = name;
    this.alt = name;

    picArray.push(this);
}

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



console.log(picArray);