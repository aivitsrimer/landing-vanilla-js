let prevButton = document.querySelector('.slider-control.prev');
let nextButton = document.querySelector('.slider-control.next');

let indicators = document.querySelectorAll('.slider-indicators li');
let slider = document.querySelector('.slider');
let sliderItemsCount = document.querySelectorAll('.slider .slider-item').length;


prevButton.addEventListener('click', prevControlHandler);
nextButton.addEventListener('click', nextControlHandler);

indicators.forEach(indicator => indicator.addEventListener('click', indicatorHandler));

function prevControlHandler(event) {
    event.preventDefault();
    let currentId = parseInt(slider.dataset.slideId);
    controlHandler(currentId, currentId - 1);
}

function nextControlHandler(event) {
    event.preventDefault();
    let currentId = parseInt(slider.dataset.slideId);
    controlHandler(currentId, currentId + 1);
}

function controlHandler(currentId, newId) {
    if (newId > sliderItemsCount) newId = 1;
    if (newId < 1) newId = sliderItemsCount;
    slider.classList.replace('slide' + currentId, 'slide' + newId);
    slider.dataset.slideId = String(newId);

    document.querySelector('.slider-indicators .active').classList.remove('active');
    document.querySelector(`.slider-indicators li[data-slide-to="${newId}"]`).classList.add('active')
}

function indicatorHandler(event) {
    let currentId = parseInt(slider.dataset.slideId);
    let newId = parseInt(event.target.dataset.slideTo);
    if (currentId !== newId) {
        controlHandler(currentId, newId);
    }
}
