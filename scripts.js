// Store previous nav button
let navButton = null;

// Prepares previous nav button to be faded
function fadePreviousNavButton() {
    const buttonID = localStorage.getItem("prev-page");
    if (!buttonID) return; // Ensures prev-page has a value

    navButton = document.getElementById(buttonID);
    if (!navButton) return; // Ensures button exists

    // Add "selected" to start fade
    navButton.classList.add("selected");
}

// Fades out previous navigation button once content is loaded
document.addEventListener("DOMContentLoaded", () => {
    // Slight delay to ensure removal experiences transition
    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            navButton.classList.remove("selected");
        });
    });
});

// Loads the page with the given url
function loadPage(pageUrl) {
    // Get current url to set previous page
    const path = window.location.pathname;
    const page = path.split("/").pop();
    localStorage.setItem("prev-page", page);

    // Load page
    window.location.href=pageUrl;
}