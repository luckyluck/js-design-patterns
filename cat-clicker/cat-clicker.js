window.onload = function () {
    // Model
    let model = {
        currentCat: null,
        cats: [
            { name: 'Tom', src: 'images/cat1.jpg', counter: 0 },
            { name: 'Snow', src: 'images/cat2.jpg', counter: 0 },
            { name: 'Puffy', src: 'images/cat3.jpg', counter: 0 },
            { name: 'Smash', src: 'images/cat4.jpg', counter: 0 },
            { name: 'Bug', src: 'images/cat5.jpg', counter: 0 },
            { name: 'Ginger', src: 'images/cat6.jpg', counter: 0 }
        ]
    };

    // Controller
    let octopus = {
        init: function() {
            // Set our current cat to the first one in the list
            model.currentCat = model.cats[0];

            // Tell our views to initialize
            catListView.init();
            catView.init();
        },
        getCats: function() {
            return model.cats;
        },
        getCurrentCat: function() {
            return model.currentCat;
        },
        // Set the currently-selected cat to the object passed in
        setCurrentCat: function (cat) {
            model.currentCat = cat;
        },
        // Increments the counter for the currently-selected cat
        incrementCounter: function () {
            model.currentCat.counter++;
            catView.render();
        }
    };

    // View for the current cat
    let catView = {
        init: function () {
            // Store pointers to our DOM elements for easy access later
            // this.catElem = document.getElementById('catContainer');
            this.catNameElem = document.getElementById('catName');
            this.catImageElem = document.getElementById('catImg');
            this.countElem = document.getElementById('counter');

            // On click, increment the current cat's counter
            this.catImageElem.addEventListener('click', function() {
                octopus.incrementCounter();
            });

            // Render this view (update the DOM elements with the right values)
            this.render();
        },
        render: function () {
            // Update the DOM elements with values from the current cat
            let currentCat = octopus.getCurrentCat();
            this.countElem.textContent = currentCat.counter;
            this.catNameElem.textContent = currentCat.name;
            this.catImageElem.src = currentCat.src;
        }
    };

    // View for the list of cats
    let catListView = {
        init: function () {
            // Store the DOM element for easy access later
            this.catListElem = document.getElementById('catList');

            // render this view (update the DOM elements with the right values)
            this.render();
        },
        render: function () {
            // Get the cats we'll be rendering from the octopus
            let cats = octopus.getCats();

            // Empty the cat list
            this.catListElem.innerHTML = '';
            // Using fragment to avoid appending child into the DOM every time in the loop
            // for the sake of performance
            let fragment = document.createDocumentFragment();

            // Loop over the cats
            for (let i = 0; i < cats.length; i++) {
                // This is the cat we're currently looping over
                let cat = cats[i];

                // Make a new cat list item and set its text
                let elem = document.createElement('li');
                elem.textContent = cat.name;

                // On click, setCurrentCat and render the catView
                // (we are using let here, other way this solution would use closure-in-a-loop trick to connect the value
                //  of the cat variable to the click event function)
                elem.addEventListener('click', function() {
                    octopus.setCurrentCat(cat);
                    catView.render();
                });
                fragment.appendChild(elem);
            }

            // Finally, add the element to the list
            this.catListElem.appendChild(fragment);
        }
    };

    octopus.init();
};
