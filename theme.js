// Sets color theme to string name
function setTheme(theme) {
    document.documentElement.className = theme;
    localStorage.setItem("theme", theme);
}

// Toggles theme between light and dark
function toggleTheme() {
    const currentTheme = document.documentElement.className;
    const theme = currentTheme === "light-theme" ? "dark-theme" : "light-theme";
    setTheme(theme);
}

// Load theme from localStorage on page load
function loadTheme() {
    const savedTheme = localStorage.getItem("theme") || "light-theme";
    document.documentElement.className = savedTheme;
};