window.onload = function () {
    let element = document.getElementById('catImg');
    let clickCounter = 0;

    setContent('#counter', clickCounter);

    element.addEventListener('click', function () {
        clickCounter++;

        setContent('#counter', clickCounter);
    });
};

function setContent(selector, content) {
    document.querySelector(selector).innerHTML = content;
}
