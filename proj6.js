/*
proj6.js
Cayden Park
Professor Kristi Smith
CSCN315-001: Front-End Programming in JavaScript

User registration form with robust validation.
*/

function validateSignUpForm() {
    let isValid = true;

    // Validate first name input
    const firstNameInput = document.signUpForm.firstNameInput;
    if (!checkRegex(firstNameInput, /^[a-zA-Z]+$/, "First name must only contain letters.")) isValid = false;

    // Validate last name input
    const lastNameInput = document.signUpForm.lastNameInput;
    if (!checkRegex(lastNameInput, /^[a-zA-Z]+$/, "Last name must only contain letters.")) isValid = false;

    // Validate username input
    const usernameInput = document.signUpForm.usernameInput;
    if (!checkRegex(usernameInput, /^[a-zA-Z][a-zA-Z0-9]{5,14}$/,
        "Username must be between 6 and 15 characters long, containing only alphanumeric characters, and it cannot start with a number.")) isValid = false;

    // Validate email input
    const emailInput = document.signUpForm.emailInput;
    if (!checkRegex(emailInput, /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Email must be in valid format.")) isValid = false;

    // Validate password input
    const passwordInput = document.signUpForm.passwordInput;
    if (!checkRegex(passwordInput, /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,20}$/,
        "Password must be between 8 and 20 characters and contain at least one uppercase letter, one lowercase letter, one digit, and one special character.")) isValid = false;
    
    // Validate confirm password input matches password inputs
    const confirmPasswordInput = document.signUpForm.confirmPasswordInput;
    try {
        if (confirmPasswordInput.value !== passwordInput.value) {
            errorMessage = "Passwords must match.";
            confirmPasswordInput.setCustomValidity(errorMessage);
            throw new Error(errorMessage)
        }
        else {
            confirmPasswordInput.setCustomValidity("");
        }
    }
    catch(error) {
        console.error(error);
        isValid = false;
    }

    // Validate phone input
    const phoneInput = document.signUpForm.phoneInput;
    if (!checkRegex(phoneInput, /^\d{3}-\d{3}-\d{4}$|^\d{10}$/, "Phone number must be in the format XXX-XXX-XXXX or XXXXXXXXXX.")) isValid = false;

    // Validate date of birth (user must be over 18)
    const dobInput = document.signUpForm.dobInput;
    try {
        const dob = new Date(dobInput.value);
        const today = new Date();
        const age = today - dob;
        const ageInYears = age / (1000 * 60 * 60 * 24 * 365.25);
        if (ageInYears < 18) {
            errorMessage = "You must be at least 18 years old.";
            dobInput.setCustomValidity(errorMessage);
            throw new Error(errorMessage);
        }
        else {
            dobInput.setCustomValidity("");
        }
    }
    catch (error) {
        console.error(error);
        isValid = false;
    }

    // Validate terms and conditions
    try {
        const agreeInput = document.signUpForm.agreeInput;
        if (!agreeInput.checked) {
            errorMessage = "You must agree to the terms and coniditons.";
            agreeInput.setCustomValidity(errorMessage);
            throw new Error(errorMessage);
        }
        else {
            agreeInput.setCustomValidity("");
        }
    }
    catch(error) {
        console.error(error);
        isValid = false;
    }

    if (isValid) {
        submitSignUpForm();
    }
}

function submitSignUpForm() {
    event.preventDefault();
    
    const firstName = document.signUpForm.firstNameInput.value;
    const lastName = document.signUpForm.lastNameInput.value;

    const accountCreatedLabel = document.getElementById("accountCreatedLabel");
    const message = `Account successfully created. Welcome, ${firstName} ${lastName}!`
    accountCreatedLabel.textContent = message;
    console.log(message);

    document.signUpForm.reset();
}

function checkRegex(inputField, regex, errorMessage) {
    try {
        if (!regex.test(inputField.value)) {
            inputField.setCustomValidity(errorMessage);
            throw new Error(errorMessage);
        }
        else {
            inputField.setCustomValidity("");
            return true
        }
    }
    catch(error) {
        console.error(error);
        return false
    }
}