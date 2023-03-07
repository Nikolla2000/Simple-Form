// Create form which create person and will have those fields(on successful submit push to persons array and render the list below the form):
//  - firstName
//  - lastName
//  - age
//  - job
//  - gender (select, radio)
//  - email

//  VALIDATIONS:
//  - firstName
//    - min 3 characters
//    - max 15 characters
//  - lastName
//    - min 3 characters
//    - max 15 characters
//  - age
//    - min 1 characters
//    - max 120 characters
//  - job
//     - min 3 characters
//     - max 15 characters
//  - gender (select, radio)
//     - required
//  - email
//     - min 10 characters
//     - max 20 characters
//     - contains @
//     - ends with .com .bg
//     - and not ends with .
//     - does not contains only numbers

// Validate form on submit
// If error is present do not clear the form.
// If error is present: clear error on value change of the current input
// Disable submit button when form has errors

function createInput(tagInputName, type, name, placeholder) {
    const wrapper = document.createElement('div');
    wrapper.classList.add('input-wrapper')

    const label = document.createElement('label');

    label.setAttribute('for', name);
    label.innerText = name;

    const input = document.createElement(tagInputName)
    input.type = type;
    input.id = name;
    input.name = name;
    input.placeholder = placeholder;
    const pError = document.createElement('p');
    pError.id = `${name}Error`
    pError.classList.add('input-error')

    input.oninput = () => {
        pError.innerText = ''
    }

    wrapper.append(label, input, pError)
    return wrapper;
}

function createSelect(name, options) {
    const wrapper = document.createElement('div');
    wrapper.classList.add('input-wrapper')
    const label = document.createElement('label');

    label.setAttribute('for', name);
    label.innerText = name;

    const select = document.createElement('select');
    select.name = name;
    select.id = name;
    const optionElements = options.map((option) => {
        const optionElement = document.createElement('option');
        optionElement.value = option;
        optionElement.innerText = option;

        return optionElement;
    })
    select.append(...optionElements);

    const defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.innerText = 'Choose';
    defaultOption.selected = "selected";
    defaultOption.hidden = true;

    select.append(defaultOption)

    const pError = document.createElement('p');
    pError.id = `${name}Error`
    pError.classList.add('input-error')

    wrapper.append(label, select, pError)


    return wrapper;
}

const form = document.createElement('form');
const firstNameInput = createInput('input', 'text', 'firstName', 'John');
const lastNameInput = createInput('input', 'text', 'lastName', 'Doe');
const ageInput = createInput('input', 'number', 'age', '24');
const jobInput = createInput('input', 'text', 'job', 'CEO');
const emailInput = createInput('input', 'email', 'email', 'johnDoe@gmail.com');

const genderSelectInput = createSelect('gender', ['male', 'female'])

const submitBtn = document.createElement('button');
submitBtn.innerText = 'create person';

form.append(firstNameInput, lastNameInput, ageInput, genderSelectInput, jobInput, emailInput, submitBtn);

function getIsFieldNameValid(value) {
    if (value.length < 3 || value.length > 15) {
        return false;
    }
    return true;
}

form.onsubmit = (event) => {
    event.preventDefault();
    const stringInputs = document.querySelectorAll('input[type=text]')
    const ageInput = document.querySelector('input[type=number]')
    const emailInput = document.querySelector('input[type=email]')
    const genderSelect = document.querySelector('select[name=gender]')
    const newPerson = {};

    //  - firstName
    //    - min 3 characters
    //    - max 15 characters
    //  - lastName
    //    - min 3 characters
    //    - max 15 characters
    //  - age
    //    - min 1 characters
    //    - max 120 characters
    //  - job
    //     - min 3 characters
    //     - max 15 characters
    //  - gender (select, radio)
    //     - required
    //  - email
    //     - min 10 characters
    //     - max 20 characters
    //     - contains @
    //     - ends with .com .bg
    //     - and not ends with .
    //     - does not contains only numbers

    newPerson[ageInput.name] = parseInt(ageInput.value);
    newPerson[emailInput.name] = emailInput.value;
    newPerson[genderSelect.name] = genderSelect.value;

    stringInputs.forEach((input) => {
        newPerson[input.name] = input.value;
    })

    const isFirstNameValid = getIsFieldNameValid(newPerson.firstName)
    const isLastNameValid = getIsFieldNameValid(newPerson.lastName)
    const isJobValid = getIsFieldNameValid(newPerson.job)

    let isPeronValid = true;

    if (!isFirstNameValid) {
        const ageErrorElement = document.querySelector('#firstNameError');
        ageErrorElement.innerText = 'Provide first name between 3 and 15'
        isPeronValid = false;
    }

    if (!isLastNameValid) {
        const ageErrorElement = document.querySelector('#lastNameError');
        ageErrorElement.innerText = 'Provide last name between 3 and 15'
        isPeronValid = false;
    }

    if (!isJobValid) {
        const ageErrorElement = document.querySelector('#jobError');
        ageErrorElement.innerText = 'Provide job between 3 and 15'
        isPeronValid = false;
    }

    if (!newPerson.gender) {
        const ageErrorElement = document.querySelector('#genderError');
        ageErrorElement.innerText = 'Please choose gender'
        isPeronValid = false;
    }

    if (isNaN(newPerson.age) || newPerson.age < 1 || newPerson.age > 120) {
        const ageErrorElement = document.querySelector('#ageError');
        ageErrorElement.innerText = 'Please add age between 1 and 120'
        isPeronValid = false;
    }

    if (!newPerson.gender) {
        const ageErrorElement = document.querySelector('#genderError');
        ageErrorElement.innerText = 'Please choose gender'
        isPeronValid = false;
    }

    const mailRegex = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);

    if (!mailRegex.test(newPerson.email)) {
        const ageErrorElement = document.querySelector('#emailError');
        ageErrorElement.innerText = 'Please provide email'
        isPeronValid = false;
    }

    if (!isPeronValid) {
        return;
    }

    appendPerson(newPerson);
}

const list = document.createElement('ul');

function appendPerson(person) {
    const liElement = document.createElement('li');
    Object.keys(person).forEach((key) => {
        const span = document.createElement('span');

        span.innerText = `${key}: ${person[key]}`

        liElement.append(span);
    })

    list.append(liElement);
}



document.body.append(form);
document.body.append(list);
