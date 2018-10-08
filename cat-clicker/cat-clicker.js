window.onload = function () {
    // Model
    let model = {
        data: [
            { name: 'Tom', src: 'images/cat1.jpg', counter: 0 },
            { name: 'Snow', src: 'images/cat2.jpg', counter: 0 },
            { name: 'Puffy', src: 'images/cat3.jpg', counter: 0 },
            { name: 'Smash', src: 'images/cat4.jpg', counter: 0 },
            { name: 'Bug', src: 'images/cat5.jpg', counter: 0 },
            { name: 'Ginger', src: 'images/cat6.jpg', counter: 0 }
        ],
        getAllCats: function() {
            return this.data;
        },
        getCat: function(index) {
            return this.data[index];
        },
        updateCounter: function(index) {
            this.data[index].counter += 1;
        }
    };

    // Controller
    let octopus = {
        init: function() {
            view.renderContent(0);
        },
        getCats: function() {
            return model.getAllCats();
        },
        getCat: function(index){
            return model.getCat(index) ;
        },
        updateCounter: function(index) {
            model.updateCounter(index);
            view.renderContent(index);
        },
        setCat: function (index) {
            view.renderContent(index);
        }
    };

    // View
    let view = {
        renderSidebar: function() {
            let catList = document.querySelector('.cat-list');
            catList.innerHTML = '';

            let cats = octopus.getCats();
            let template = document.querySelector('[id="sidebarItem"]').innerHTML;
            let fragment = document.createDocumentFragment();

            for (let i = 0; i < cats.length; i++) {
                let li = document.createElement('li');
                li.innerHTML = template.replace(/{{name}}/g, cats[i].name);
                li.addEventListener('click', function () {
                    octopus.setCat(i);
                });
                fragment.appendChild(li);
            }

            catList.appendChild(fragment);
        },
        renderContent: function(index) {
            let catContainer = document.querySelector('.catContainer');
            catContainer.innerHTML = '';
            let cat = octopus.getCat(index);
            if (!cat) {
                return;
            }

            let template = document.querySelector('[id="catContainer"]').innerHTML;
            template = template.replace(/{{name}}/g, cat.name);
            template = template.replace(/{{src}}/g, cat.src);
            template = template.replace(/{{counter}}/g, cat.counter);

            catContainer.innerHTML = template;
            catContainer.childNodes.item(3).addEventListener('click', function() {
                octopus.updateCounter(index);
            });
        },
        init: function() {
            this.renderSidebar();
        }
    };

    view.init();
    octopus.init();
};
