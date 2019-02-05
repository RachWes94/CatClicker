// let numOfClicksCat1 = 0;
// let numOfClicksCat2 = 0;
// const label1 = 'Cat 1';
// const label2 = 'Cat 2';
// const labelBox1 = $('.labelBox1');
// const labelBox2 = $('.labelBox2');
//
// labelBox1.html(`${label1}`);
// labelBox2.html(`${label2}`);
// $('.cat1label').html(`Clicks: 0`);
// $('.cat2label').html(`Clicks: 0`);
//
//
// $('.cat1').click(function(e) {
//   numOfClicksCat1++;
//   $('.cat1label').html(`Clicks: ${numOfClicksCat1}`);
// });
//
// $('.cat2').click(function(e) {
//   numOfClicksCat2++;
//   $('.cat2label').html(`Clicks: ${numOfClicksCat2}`);
// });
// clear the screen for testing

class Cat {
  constructor(name, src) {
    this.name = name;
    this.src = src;
    this.clicks = 0;
  }

  display() {
    const previousImage = document.querySelector('img');
    if (previousImage) { previousImage.remove() };

    const newImage = document.createElement('img');
    document.querySelector('.imageContainer').appendChild(newImage);

    $('h1').html(this.name);
    $('p').html(`Clicks: ${this.clicks}`);

    newImage.src = this.src;
    newImage.addEventListener('click', () => {
      this.clicks++;
      $('p').html(`Clicks: ${this.clicks}`);
    });
  }
}

const kitties = [
  new Cat('Cat 1', './img/cat1.jpg'),
  new Cat('Cat 2', './img/cat2.jpg'),
  new Cat('Cat 3', './img/cat3.jpg'),
  new Cat('Cat 4', './img/cat4.jpg'),
  new Cat('Cat 5', './img/cat5.png')
];



function init() {
  document.body.innerHTML = '';
  const header = document.createElement('header');
  document.body.appendChild(header);
  // Let's loop over the numbers in our array
  for (var i = 0; i < kitties.length; i++) {

      var cat = kitties[i];

      var elem = document.createElement('div');
      elem.textContent = cat.name;

      elem.addEventListener('click', (function(catCopy) {
          return function() {
            catCopy.display();
          };
      })(cat));

      header.appendChild(elem);
  };

  const displayContainer = document.createElement('main');
  const nameContainer = document.createElement('h1');
  const imageContainer = document.createElement('div')
  imageContainer.classList.add('imageContainer');
  const image = document.createElement('img');
  const clickContainer = document.createElement('p');
  document.body.appendChild(displayContainer);
  displayContainer.appendChild(nameContainer);
  displayContainer.appendChild(imageContainer);
  imageContainer.appendChild(image);
  displayContainer.appendChild(clickContainer);
};

init();

// var nums = ['Cat 1', 'Cat 2', 'Cat 3', 'Cat 4', 'Cat 5'];
//
// // Let's loop over the numbers in our array
// for (var i = 0; i < nums.length; i++) {
//
//     // This is the number we're on...
//     var num = nums[i];
//
//     // We're creating a DOM element for the number
//     var elem = document.createElement('div');
//     elem.textContent = num;
//
//     // ... and when we click, alert the value of `num`
//     elem.addEventListener('click', (function(numCopy) {
//         return function() {
//
//         };
//     })(num));
//
//     const header = document.createElement('header');
//     document.body.appendChild(header);
//
//     header.appendChild(elem);
// };
