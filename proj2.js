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
    abbreviationInput.placeholder = "Course"
    abbreviationInput.required = true;
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

    // Create remove button
    const removeButton = document.createElement("button");
    removeButton.textContent = "-"
    removeButton.classList.add("course-remove");
    removeButton.onclick = function () {
        course.remove();
    };

    // Append elements to course element
    course.appendChild(abbreviationInput);
    course.appendChild(nameInput);
    course.appendChild(creditsInput);
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