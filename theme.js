const allowedThemes = ["theme-light","theme-high-contrast","theme-dark","theme-baroque"]

// Sets color theme to string name
function setTheme(theme) {
    document.documentElement.className = theme;
    localStorage.setItem("theme", theme);
}

// Load theme from localStorage on page load
function loadTheme() {
    const savedTheme = localStorage.getItem("theme");
    if (allowedThemes.includes(savedTheme)) {
        document.documentElement.className = savedTheme;
    }
    else {
        document.documentElement.className = "theme-light";
        localStorage.setItem("theme", "theme-light");
    }
};

document.addEventListener("DOMContentLoaded", () => {
    // Load theme selector if it exists
    const themeSelect = document.getElementById("themeSelect");
    themeSelect.value = localStorage.getItem("theme") || "theme-light";
    themeSelect.addEventListener("change", function() {
        setTheme(this.value);
    });
});