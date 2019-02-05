// Start up function
// Places cat names in a list
function init() {
  document.body.innerHTML = '';
  const header = document.createElement('header');
  document.body.appendChild(header);
  // Let's loop over the numbers in our array
  for (var i = 0; i < kitties.length; i++) {

      var cat = kitties[i];

      var elem = document.createElement('div');
      elem.classList.add('nameList');
      elem.textContent = cat.name;
      // event listener on cat names to display the information
      elem.addEventListener('click', (function(catCopy) {
          return function() {
            catCopy.display();
          };
      })(cat));

      header.appendChild(elem);
  };
  // Create elements to hold cat info
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

// Creates the cats
class Cat {
  constructor(name, src) {
    this.name = name;
    this.src = src;
    this.clicks = 0;
  }
  // removes old image if there is one and adds new
  display() {
    const previousImage = document.querySelector('img');
    if (previousImage) { previousImage.remove() };

    const newImage = document.createElement('img');
    document.querySelector('.imageContainer').appendChild(newImage);

    $('h1').html(this.name);
    $('p').html(`Clicks: ${this.clicks}`);
    // Adding event listener to the new image to count clicks
    newImage.src = this.src;
    newImage.addEventListener('click', () => {
      this.clicks++;
      $('p').html(`Clicks: ${this.clicks}`);
    });
  }
};

// Creating the 5 cats
const kitties = [
  new Cat('Cat 1', './img/cat1.jpg'),
  new Cat('Cat 2', './img/cat2.jpg'),
  new Cat('Cat 3', './img/cat3.jpg'),
  new Cat('Cat 4', './img/cat4.jpg'),
  new Cat('Cat 5', './img/cat5.jpg')
];

// Calls the initial function to start the page
init();
