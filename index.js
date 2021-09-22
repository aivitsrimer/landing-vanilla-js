let form = document.querySelector('form');
let nameInput = document.querySelector('#name');
let genderSelect = document.querySelector('#gender');
let countryInput = document.querySelector('#country');
let cityInput = document.querySelector('#city');
let dobInput = document.querySelector('#dob');
let filesInput = document.querySelector('#files');

let addFileButton = document.querySelector('.uploader .add');
let submitButton = document.querySelector('.send [type="submit"]');

let fileList = [];

form.addEventListener('submit', submitFormHandler);
nameInput.addEventListener('change', fieldsHandler);
genderSelect.addEventListener('change', fieldsHandler);
countryInput.addEventListener('change', fieldsHandler);
cityInput.addEventListener('change', fieldsHandler);
dobInput.addEventListener('change', fieldsHandler);

addFileButton.addEventListener('click', () => filesInput.click());
filesInput.addEventListener('change', fileChangeHandler);

function showNextStep(nextStepId) {
    if (nextStepId <= 3) {
        let nextStep = document.querySelector(`.step[data-id="${nextStepId}"]`);
        nextStep.classList.add('active');
    }
}

function fieldsHandler(event) {
    if (event.target.value && !event.target.classList.contains('active')) {
        event.target.classList.add('active');
    }

    let steps = document.querySelectorAll('.step.active');
    let currentStepId = parseInt(steps[steps.length - 1].dataset.id);
    const isFilledStep1 = nameInput.value && genderSelect.value;
    const isFilledStep2 = countryInput.value && cityInput.value && dobInput.value;
    if ((currentStepId === 1 && isFilledStep1)
        || (currentStepId === 2 && isFilledStep1 && isFilledStep2)
    ) {
        showNextStep(currentStepId + 1);
    }
}

function fileChangeHandler() {
    let files = filesInput.files;
    for (let i = 0; i < files.length; i++) {
        fileList.push(files[i]);
        renderFile(files[i], fileList.length - 1);
        let fileDeleteButtons = document.querySelectorAll('.files .file-delete');
        fileDeleteButtons[fileDeleteButtons.length - 1].addEventListener('click', deleteFileHandler);
        toggleSubmitButton();
    }
}

function renderFile(file, id) {
    let nameSplitted = file.name.split('.');
    let name = nameSplitted[0];
    let size = calculateHumanFileSize(file.size);
    let extension = nameSplitted[nameSplitted.length - 1].toUpperCase();

    let template = document.createElement('div');
    template.classList.add('file');
    template.dataset.id = id;
    template.innerHTML = `<div class="file-info">
              <div class="file-data">
                <p class="file-name">${name}</p>
                <p class="file-size">${extension} ${size}</p>
              </div>
            </div>
            <div class="file-delete" data-id="${id}"><img src="./assets/trashbin.svg" alt="delete"></div>`;
    document.querySelector('.files').appendChild(template);
}

function calculateHumanFileSize(fileSizeInBytes) {
    let i = -1;
    let byteUnits = [' kb', ' mb'];
    do {
        fileSizeInBytes = fileSizeInBytes / 1024;
        i++;
    } while (fileSizeInBytes > 1024 && i < byteUnits.length - 1);

    return Math.max(fileSizeInBytes, 0.1).toFixed(1) + byteUnits[i];
}

function deleteFileHandler(event) {
    event.preventDefault();
    let currentFile = event.target.closest('.file');
    delete fileList[parseInt(currentFile.dataset.id)];
    currentFile.remove();
    toggleSubmitButton();
}

function toggleSubmitButton() {
    submitButton.disabled = !(document.querySelector('.files').innerHTML);
}

function collectFormData() {
    let data = new FormData();

    data.append('name', nameInput.value);
    data.append('gender', genderSelect.value);
    data.append('country', countryInput.value);
    data.append('city', cityInput.value);
    data.append('dob', dobInput.value);
    fileList.forEach((file) => {
        data.append('files[]', file, file.name);
    })

    return data;
}

function submitFormHandler(event) {
    event.preventDefault();
    let success = document.querySelector('form .success')
    success.classList.add('active');

    let xhr = new XMLHttpRequest();
    let data = collectFormData();
    xhr.open( 'POST', event.target.action, true );
    xhr.onreadystatechange = () => {submitButton.disabled = true};
    xhr.send( data );
}