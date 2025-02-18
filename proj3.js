// Displays greeting from name and age input
function displayGreeting() {
    // Stops page from refreshing
    event.preventDefault();

    const name = document.getElementById("nameInput").value;
    const age = document.getElementById("ageInput").value;

    const greeting = document.getElementById("greeting");
    greeting.textContent = `${name} is a wonderful name! And ${age} is a lovely age to be! That's like, ${age * 365 * 24 * 60 * 60} seconds!`;
    greeting.classList.add("visible");
    console.log(`${name} is a wonderful name! And ${age} is a lovely age to be! That's like, ${age * 365 * 24 * 60 * 60} seconds!`);
}

// Creates a new course element
function addCourse() {
    console.log("Adding new course.");
    const courseList = document.getElementById("courseList");

    // Create course element
    const course = document.createElement("div");
    course.classList.add("course");

    // Create course abbreviation input
    const abbreviationInput = document.createElement("input");
    abbreviationInput.type = "text";
    abbreviationInput.placeholder = "Abbr"
    abbreviationInput.required = true;
    abbreviationInput.addEventListener("input", checkCourseAbbreviation);
    abbreviationInput.classList.add("course-abbreviation");

    // Create course name input
    const nameInput = document.createElement("input");
    nameInput.type = "text";
    nameInput.placeholder = "Course Name";
    nameInput.required = true;
    nameInput.classList.add("course-name");

    // Create credits input
    const creditsInput = document.createElement("input");
    creditsInput.type = "number";
    creditsInput.placeholder = "Credits";
    creditsInput.min = 0;
    creditsInput.required = true;
    creditsInput.addEventListener("input", updateTotalCredits);
    creditsInput.classList.add("course-credits");

    // Create color button
    const colorSelect = document.createElement("select");
    const colors = ["var(--darkest-color)", "red", "green", "blue"]
    // Populate options
    for (let i = 0; i < colors.length; i++) {
        const col = colors[i];
        const opt = document.createElement("option");
        opt.style = `background-color: ${col}`;
        opt.value = col;
        // Set label based on value
        switch (col) {
            case ("red"):
                opt.innerHTML = "R";
                break;
            case ("green"):
                opt.innerHTML = "G";
                break;
            case ("blue"):
                opt.innerHTML = "B";
                break;
        }
        colorSelect.appendChild(opt);
    }
    colorSelect.addEventListener("change", function() {
        changeCourseColor(course, this.value);
    });
    colorSelect.classList.add("course-color");

    // Create remove button
    const removeButton = document.createElement("button");
    removeButton.textContent = "-"
    removeButton.classList.add("course-remove");
    removeButton.onclick = function () {
        course.remove();
        checkCourseAbbreviation();
        updateTotalCredits();
    };

    // Append elements to course element
    course.appendChild(abbreviationInput);
    course.appendChild(nameInput);
    course.appendChild(creditsInput);
    course.appendChild(colorSelect);
    course.appendChild(removeButton);

    // Add course to list
    courseList.insertBefore(course, courseList.firstChild);
}

// Updates credit display
function updateTotalCredits() {
    const creditsInputs = document.querySelectorAll(".course-credits");
    let totalCredits = 0;

    creditsInputs.forEach(input => {
        totalCredits += parseFloat(input.value) || 0;
    });

    document.getElementById("totalCredits").textContent = totalCredits;
    console.log(`Total Credits: ${totalCredits}`);
}

// Checks that course abbreviation is unique
function checkCourseAbbreviation() {
    const abbrInputs = document.querySelectorAll(".course-abbreviation");
    // Array stores all abbreviations
    let abbrs = [];
    // Array stores duplicate abbreviations
    let dupes = [];

    // Store duplicate values
    for (let i = 0; i < abbrInputs.length; i++) {
        let val = abbrInputs[i].value.toUpperCase();

        // Condition checks for duplicates that are not blank
        if (val !== "") {
            if (!abbrs.includes(val)) {
                abbrs.push(val);
            }
            else if (abbrs.includes(val) && !dupes.includes(val)) {
                dupes.push(val);
            }
        }
    }

    // Checks all inputs to see if they include duplicate values
    for (let i = 0; i < abbrInputs.length; i++) {
        let val = abbrInputs[i].value.toUpperCase();

        // Condition checks if value of input is a duplicate
        if (dupes.includes(val)) {
            abbrInputs[i].classList.add("course-invalid");
            console.log(`Abbreviation "${val}" is already being used! Change it to a unique abbreviation!`);
        }
        else {
            abbrInputs[i].classList.remove("course-invalid");
        }
    }
}

function changeCourseColor(course, color) {
    course.style = `--course-color: ${color}`;
}