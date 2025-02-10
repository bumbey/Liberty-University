// Sets color theme to string name
function setTheme(theme) {
    document.documentElement.className = theme;
    localStorage.setItem("theme", theme);
}

// Load theme from localStorage on page load
function loadTheme() {
    const savedTheme = localStorage.getItem("theme") || "theme-light";
    document.documentElement.className = savedTheme;
};

document.addEventListener("DOMContentLoaded", () => {
    const themeSelect = document.getElementById("themeSelect");
    themeSelect.value = localStorage.getItem("theme") || "theme-light";
    themeSelect.addEventListener("change", function() {
        setTheme(this.value);
    });
});