let nameInput = document.querySelector('#name');
let genderSelect = document.querySelector('#gender');
let countryInput = document.querySelector('#country');
let cityInput = document.querySelector('#city');
let dobInput = document.querySelector('#dob');

let addFileButton = document.querySelector('.uploader .add');
let sendInfoButton = document.querySelector('.send [type="submit"]');

nameInput.addEventListener('change', fieldsHandler);
genderSelect.addEventListener('change', fieldsHandler);
countryInput.addEventListener('change', fieldsHandler);
cityInput.addEventListener('change', fieldsHandler);
dobInput.addEventListener('change', fieldsHandler);

function showNextStep(nextStepId) {
    if (nextStepId <= 3) {
        let nextStep = document.querySelector(`.step[data-id="${nextStepId}"]`);
        nextStep.classList.add('active');
    }
}

function fieldsHandler(event) {
    let steps = document.querySelectorAll('.step.active');
    let currentStepId = parseInt(steps[steps.length - 1].dataset.id);
    const isFilledStep1 = nameInput.value && genderSelect.value !== "0";
    const isFilledStep2 = countryInput.value && cityInput.value && dobInput.value;
    if ((currentStepId === 1 && isFilledStep1)
        || (currentStepId === 2 && isFilledStep1 && isFilledStep2)
    ) {
        showNextStep(currentStepId + 1);
    }
}

fieldsHandler();
