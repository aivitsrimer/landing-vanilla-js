let prevButton = document.querySelector('.slider-control.prev');
let nextButton = document.querySelector('.slider-control.next');

let indicators = document.querySelector('.slider-indicators');
let slider = document.querySelector('.slider');
let sliderItemsCount = document.querySelectorAll('.slider .slider-item').length;


prevButton.addEventListener('click', prevControlHandler);
nextButton.addEventListener('click', nextControlHandler);

function prevControlHandler(event) {
    let currentId = parseInt(slider.dataset.slideId);
    controlHandler(event, currentId, currentId - 1);
}

function nextControlHandler(event) {
    let currentId = parseInt(slider.dataset.slideId);
    controlHandler(event, currentId, currentId + 1);
}

function controlHandler(event, currentId, newId) {
    event.preventDefault();
    if (newId > sliderItemsCount) newId = 1;
    if (newId < 1) newId = sliderItemsCount;
    slider.classList.replace('slide' + currentId, 'slide' + newId);
    slider.dataset.slideId = String(newId);

    document.querySelector('.slider-indicators .active').classList.remove('active');
    document.querySelector(`.slider-indicators li[data-slide-to="${newId}"]`).classList.add('active')
}

