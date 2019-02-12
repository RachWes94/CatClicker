
// MODEL
const model = {
  // creating the initial cats
  cats: {
    'Cat 1': { name: 'Cat 1', src: './img/cat1.jpg', clicks: 0 },
    'Cat 2': { name: 'Cat 2', src: './img/cat2.jpg', clicks: 0 },
    'Cat 3': { name: 'Cat 3', src: './img/cat3.jpg', clicks: 0 },
    'Cat 4': { name: 'Cat 4', src: './img/cat4.jpg', clicks: 0 },
    'Cat 5': { name: 'Cat 5', src: './img/cat5.jpg', clicks: 0 }
  },
  // returns the 5 cat objects in cats
  getAllCats: function() {
    return Object.values(this.cats);
  },
  // returns specific cat
  getCat: function(catTitle) {
    return this.cats[catTitle];
  },
  // add 1 to the clicks of specific cat
  incrementClicks: function(catTitle) {
    this.cats[catTitle].clicks++;
  }
};


// CONTROLLER
const controller = {
  // displays the header
  init: function() {
    headerView.render();
  },
  // returns all cats using the model
  getAllCats: function() {
    return model.getAllCats();
  },
  // returns specific cat using the model
  getCat: function(catTitle) {
    return model.getCat(catTitle);
  },
  // increments the clicks for the specific cat in the model
  incrementClicks: function(catTitle) {
    model.incrementClicks(catTitle);
  },
  // returns clicks specific to the cat
  getCatClicks: function(catTitle) {
    return model.getCat(catTitle).clicks;
  }
}

// VIEWS
const headerView = {
  // displays the cat names on page as clickable items
  render: function() {
    const cats = controller.getAllCats();
    const nameList = document.querySelector('.nameList');
    // loops through each cat of cats
    // creates buttons with the cat.name and appends them to the header
    // adds event listeners on all buttons to render the displayView
    for (let cat of cats) {
        const nameListItem = document.createElement('button');
        nameListItem.textContent = cat.name;
        nameList.appendChild(nameListItem);
        nameListItem.addEventListener('click', function() {
          // gets the specific cat in the controler and render the displayView
          // based on that cat
          displayView.render(controller.getCat(cat.name));
        });
    }

  }
}

const displayView = {
  render: function(cat) {
    // grabbing the display element and clearing it before rendering incase there
    // was a previous cat rendered
    const displayBox = document.querySelector('.display');
    displayBox.innerHTML = '';
    // creating html elements to hold display info
    const title = document.createElement('h1');
    const image = document.createElement('img');
    const clicker = document.createElement('p');
    // loading the image asynchronously
    // We want to ensure that the title and click counter are only set after
    // the image has loaded.
    new Promise(function(res, rej) {
      image.onload = res;
      image.onerror = rej;
      image.src = cat.src;
    }).then(function() {
      // once the image is loaded, we will then set the title and clicker text
      title.textContent = cat.name;
      clicker.textContent = `Clicks: ${cat.clicks}`;
      // appending title, image, and clicker to the display
      displayBox.appendChild(title);
      displayBox.appendChild(image);
      displayBox.appendChild(clicker);
      // adding click event to each cat picture to increment clicks
      image.addEventListener('click', function() {
        // increment clicks in controler
        controller.incrementClicks(cat.name);
        // updating clicks texts with each click
        const updatedClicks = controller.getCatClicks(cat.name);
        clicker.textContent = `Clicks: ${updatedClicks}`;
      });
    });
  }
}

controller.init();
