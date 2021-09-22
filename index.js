let nameInput = document.querySelector('#name');
let genderSelect = document.querySelector('#gender');
let countryInput = document.querySelector('#country');
let cityInput = document.querySelector('#city');
let dobInput = document.querySelector('#dob');
let filesInput = document.querySelector('#files');

let addFileButton = document.querySelector('.uploader .add');
let sendInfoButton = document.querySelector('.send [type="submit"]');

let fileList = [];

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

function fileChangeHandler() {
    for (let i = 0; i < filesInput.files.length; i++) {
        fileList.push(filesInput.files[i]);
    }
    fileList.forEach((file) => {
        let nameSplitted = file.name.split('.');
        let name = nameSplitted[0];
        let size = calculateHumanFileSize(file.size);
        let extension = nameSplitted[nameSplitted.length - 1].toUpperCase();
        console.log(file);
        console.log(name, size, extension);

        let template = `<div class="file">
            <div class="file-info">
              <div class="file-data">
                <p class="file-name">${name}</p>
                <p class="file-size">${extension} ${size}</p>
              </div>
            </div>
            <a href="#" class="file-delete"><img src="./assets/trashbin.svg" alt="delete"></a>
          </div>`;
        document.querySelector('.files').innerHTML = template;
    })
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