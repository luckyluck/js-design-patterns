window.onload = function () {
    let cats = [
        {
            name: 'Tom',
            src: 'images/cat1.jpg'
        },
        {
            name: 'Snow',
            src: 'images/cat2.jpg'
        }
    ];

    for (let i = 0; i < cats.length; i++) {
        catContainer(i, cats[i].name, cats[i].src);
    }
};

function catContainer(index, catName, catImg) {
    let clickCounter = 0;
    // main container
    let container = document.createElement('div');
    container.setAttribute('class', 'catContainer');
    // header with a cat name
    let header = document.createElement('h6');
    header.innerHTML = catName;
    header.setAttribute('class', 'catName');
    // cat image
    let img = document.createElement('img');
    img.id = `catImg_${index}`;
    img.setAttribute('class', 'catImg');
    img.src = catImg;
    img.addEventListener('click', function () {
        clickCounter++;

        setContent(`#counter_${index}`, clickCounter);
    });
    // counter container
    let counter = document.createElement('div');
    counter.id = `counter_${index}`;
    counter.setAttribute('class', 'counter');
    counter.innerHTML = clickCounter + '';

    container.appendChild(header);
    container.appendChild(img);
    container.appendChild(counter);

    document.getElementById('main').appendChild(container);
}

function setContent(selector, content) {
    document.querySelector(selector).innerHTML = content;
}
