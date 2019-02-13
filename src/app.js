// adding event listener to the admin Button to toggle the admin form
const adminButton = document.querySelector('#adminButton');
const adminForm = document.querySelector('#adminForm');

// MODEL
const model = {
  // creating the initial cats
  cats: {
    1: { id: 1, name: 'Cat 1', src: './img/cat1.jpg', clicks: 0 },
    2: { id: 2, name: 'Cat 2', src: './img/cat2.jpg', clicks: 0 },
    3: { id: 3, name: 'Cat 3', src: './img/cat3.jpg', clicks: 0 },
    4: { id: 4, name: 'Cat 4', src: './img/cat4.jpg', clicks: 0 },
    5: { id: 5, name: 'Cat 5', src: './img/cat5.jpg', clicks: 0 }
  },
  // returns the 5 cat objects in cats
  getAllCats: function() {
    return Object.values(this.cats);
  },
  // returns specific cat object
  getCat: function(catId) {
    return this.cats[catId];
  },
  // updates the cat object with new admin input information if there was an input
  updateCat: function(catId, updatedCatObj) {
    const prevCatObj = this.cats[catId];
    this.cats[catId].name = updatedCatObj.name || prevCatObj.name;
    this.cats[catId].src = updatedCatObj.src || prevCatObj.src;
    this.cats[catId].clicks = updatedCatObj.clicks || prevCatObj.clicks;
  },
  // add 1 to the clicks of specific cat
  incrementClicks: function(catId) {
    this.cats[catId].clicks++;
  }
};


// CONTROLLER
const controller = {
  // displays the header
  init: function() {
    headerView.render();

    // grabbing input DOM element and storing them in an object
    const nameInput = document.querySelector("input[name='name']");
    const urlInput = document.querySelector("input[name='url']");
    const clickInput = document.querySelector("input[name='numClicks']");

    adminButton.addEventListener('click', function() {
      // grabbing current cat id and the object
      const currentCatId = document.querySelector('.display')['data-id'];
      const currentCat = model.getCat(currentCatId);
      // Setting the default inputs to the current cat object
      nameInput.value = currentCat.name;
      urlInput.value = currentCat.src;
      clickInput.value = currentCat.clicks;
      // form will toggle on click
      adminForm.classList.toggle('hidden');

    });
    adminForm.addEventListener('submit', function(e) {
      e.preventDefault();

      const inputObject = {name: nameInput.value, src: urlInput.value, clicks: clickInput.value};
      // grabbing object with id of currently displayed cat
      const currentCatId = document.querySelector('.display')['data-id'];
      // updating cat information through the model and redrawing the cat display
      model.updateCat(currentCatId, inputObject);
      displayView.render(model.getCat(currentCatId));
      headerView.render();

    });
  },
  // returns all cats using the model
  getAllCats: function() {
    return model.getAllCats();
  },
  // returns specific cat using the model
  getCat: function(catId) {
    return model.getCat(catId);
  },
  // increments the clicks for the specific cat in the model
  incrementClicks: function(catId) {
    model.incrementClicks(catId);
  },
  // returns clicks specific to the cat
  getCatClicks: function(catId) {
    return model.getCat(catId).clicks;
  }
}

// VIEWS
const headerView = {
  // displays the cat names on page as clickable items
  render: function() {
    const header = document.querySelector('header');
    header.innerHTML = '';
    const cats = controller.getAllCats();
    const nameList = document.querySelector('.nameList');
    const adminButton = document.querySelector('#adminButton');
    const adminForm = document.querySelector('#adminForm');
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
          displayView.render(controller.getCat(cat.id));
          // admin button is visible after display is drawn
          adminButton.classList.remove('hidden');
          // if the admin form is open is will be hidden
          if (!adminForm.classList.contains('hidden')) {
            adminForm.classList.add('hidden');
          }
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
    displayBox['data-id'] = cat.id;
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
      image.alt = 'cat image';
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
        // if the form is open is will close
        if (!adminForm.classList.contains('hidden')) {
          adminForm.classList.add('hidden');
        }
        // increment clicks in controler for specfic cat
        controller.incrementClicks(cat.id);
        // updating clicks texts with each click
        const updatedClicks = controller.getCatClicks(cat.id);
        clicker.textContent = `Clicks: ${updatedClicks}`;
      });
    });
  }
}

controller.init();
