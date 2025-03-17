document.addEventListener("DOMContentLoaded", () => {
    const phoneInput = document.getElementById("phoneInput");
    phoneInput.onchange = function() {
        validatePhoneNumber(phoneInput);
    };
    const fileInput = document.getElementById("fileInput");
    fileInput.onchange = function() {
        displayFileContents(fileInput);
    }
});

// Check and display selected options.
function submitSelection(event) {
    event.preventDefault();
    let options = document.querySelectorAll('input[type="checkbox"');
    let checkedOptions = [];
    for (let i = 0; i < options.length; i++) {
        if (options[i].checked === true) {
            checkedOptions.push(options[i].value);
        }
    }
    let selectionText = "";
    for (let i = 0; i < checkedOptions.length; i++) {
        selectionText += checkedOptions[i] + "<br>";
    }
    let selectionOutput = document.getElementById("selectionOutput");
    selectionOutput.innerHTML = selectionText;
}

// Checks format of phone number
function validatePhoneNumber(input) {
    const validPhoneOutput = document.getElementById("validPhone");
    regex = /^[0-9]{10}$|^[0-9]{3}-[0-9]{3}-[0-9]{4}$|^\([0-9]{3}\) [0-9]{3}-[0-9]{4}$/;
    validPhoneOutput.innerHTML = regex.test(input.value) ? "Phone number is valid!" : "Phone number is invalid.";
}

// Displays the contents from a file input.
function displayFileContents(input) {
    const fileOutput = document.getElementById("fileOutput");
    try {
        if (input.files.length > 0) {
            let userFile = input.files[0];

            let isText = userFile.type.startsWith("text");
            if (!isText) {
                throw userFile.name + " is not a text file.";
            }
            let reader = new FileReader();
            reader.readAsText(userFile);

            reader.onload = function() {
                fileOutput.innerHTML = reader.result;  
                console.log(reader.result)
            }
        }
        else {
            fileOutput.innerHTML = "";
        }
    }
    catch(error) {
        fileOutput.innerHTML = error;
    }
}