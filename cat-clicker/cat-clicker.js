window.onload = function () {
    let cats = [
        { name: 'Tom', src: 'images/cat1.jpg', counter: 0 },
        { name: 'Snow', src: 'images/cat2.jpg', counter: 0 },
        { name: 'Puffy', src: 'images/cat3.jpg', counter: 0 },
        { name: 'Smash', src: 'images/cat4.jpg', counter: 0 },
        { name: 'Bug', src: 'images/cat5.jpg', counter: 0 }
    ];

    createSidebar(cats);

    document.querySelector('.catImg').addEventListener('click', function () {
        let index = parseInt(this.getAttribute('data-index'), 10);
        cats[index].counter++;
        setContent('.counter', cats[index].counter);
    });

    // Setting first cat as a default
    setMainImage(0, cats[0]);
};

/**
 * Generate sidebar
 * @param cats
 */
function createSidebar(cats) {
    let fragment = document.createDocumentFragment();
    for (let i = 0; i < cats.length; i++) {
        fragment.appendChild(getSidebarItem(cats[i], i));
    }
    document.getElementById('sidebar').appendChild(fragment);
}

/**
 * Generate item Node
 * @param cat
 * @param index
 * @returns {HTMLElement}
 */
function getSidebarItem(cat, index) {
    let item = document.createElement('div');
    item.setAttribute('class', 'sidebarItem');
    let img = document.createElement('img');
    img.src = cat.src;

    let nameContainer = document.createElement('h6');
    nameContainer.setAttribute('class', 'itemName');
    nameContainer.innerHTML = cat.name;
    nameContainer.addEventListener('click', function() {
        setMainImage(index, cat);
    });

    item.appendChild(img);
    item.appendChild(nameContainer);

    return item;
}

/**
 * Set innerHTML of the element with given selector
 * @param selector
 * @param content
 */
function setContent(selector, content) {
    document.querySelector(selector).innerHTML = content;
}

/**
 * Setting active item by adding a class
 * @param index - index of the selected item
 */
function setActiveItem(index) {
    let items = document.querySelectorAll('.sidebarItem');
    let activeItem = document.querySelector('.sidebarItem.active');

    if (activeItem && activeItem === items[index]) {
        return;
    } else if (activeItem) {
        activeItem.classList.remove('active');
    }
    items[index].classList.add('active');
}

/**
 * Setting main image
 * @param index
 * @param cat
 */
function setMainImage(index, cat) {
    setActiveItem(index);
    document.querySelector('.catName').innerHTML = cat.name;
    document.querySelector('.catImg').src = cat.src;
    document.querySelector('.catImg').setAttribute('data-index', index);
    document.querySelector('.counter').innerHTML = cat.counter;
}
