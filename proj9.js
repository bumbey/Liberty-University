/*
proj9.js
Cayden Park
Professor Kristi Smith
CSCN315-001: Front-End Programming in JavaScript

Custom theme, text colors, and font sizes, adjustable through dropdown menus.
Uses query strings and cookies to store custom values.
*/

const allowedThemes = ["theme-light", "theme-high-contrast", "theme-dark", "theme-baroque"];
const allowedTextColors = ["none", "text-red", "text-blue", "text-green"]
const allowedFontSizes = ["none", "pt10", "pt12", "pt14", "pt16"]

// Applies cookie by name
function applyCookie(name, allowedArray) {
    const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`));
    const savedValue = match ? decodeURIComponent(match[2]) : null;
    allowedArray.forEach(cls => {
        if (document.documentElement.classList.contains(cls)) {
            document.documentElement.classList.remove(cls);
        }
    });
    if (allowedArray.includes(savedValue) && savedValue != "none") {
        document.documentElement.classList.add(savedValue);
        appendQueryString(name, savedValue);
    }
    else {
        if (allowedArray[0] !== "none") {
            document.documentElement.classList.add(allowedArray[0]);
            setCookie(name, allowedArray[0], 30);
            appendQueryString(name, allowedArray[0]);
        }
        else {
            clearCookie(name);
        }
    }
}

// Sets cookie value, set to expire after a certain number of days
function setCookie(name, value, days) {
    const expires = new Date();
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires.toUTCString()}; path=/`;
}

// Clears cookie
function clearCookie(name) {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"`
}

// Appends parameter to query string
function appendQueryString(name, value) {
    const url = new URL(window.location);
    url.searchParams.set(name, value);
    window.history.replaceState({}, "", url);
}

// Check if value exists in allowed array and sets as appropriate
function setClass(name, value, allowedArray) {
    // Check if cls value in allowed list
    if (allowedArray.includes(value)) {
        allowedArray.forEach(cls => {
            if (document.documentElement.classList.contains(cls)) {
                document.documentElement.classList.remove(cls);
            }
        });
        document.documentElement.classList.add(value);
        // Set cookie and query string
        setCookie(name, value, 30);
        appendQueryString(name, value);
        return true;
    }
    return false;
}

// Load parameters from query string or cookies
function loadTheme() {
    // Check query string for parameters
    const urlParams = new URLSearchParams(window.location.search);
    const queryTheme = urlParams.get("theme");
    const queryTextColor = urlParams.get("textColor");
    const queryFontSize = urlParams.get("fontSize");
    if (setClass("theme", queryTheme, allowedThemes) ||
    setClass("textColor", queryTextColor, allowedTextColors) ||
    setClass("fontSize", queryFontSize, allowedFontSizes)) {
        return;
    }
    
    applyCookie("theme", allowedThemes);
    applyCookie("textColor", allowedTextColors);
    applyCookie("fontSize", allowedFontSizes);
}

document.addEventListener("DOMContentLoaded", () => {
    loadTheme();
    
    // Load theme selector if it exists
    const themeSelect = document.getElementById("themeSelect");
    if (themeSelect) {
        allowedThemes.forEach(cls => {
            if (document.documentElement.classList.contains(cls)) {
                themeSelect.value = cls;
            }
        });
        themeSelect.addEventListener("change", function() {
            setClass("theme", this.value, allowedThemes);
        });
    }
    // Load text color selector if it exists
    const textColorSelect = document.getElementById("textColorSelect");
    if (textColorSelect) {
        allowedTextColors.forEach(cls => {
            if (document.documentElement.classList.contains(cls)) {
                textColorSelect.value = cls;
            }
        });
        textColorSelect.addEventListener("change", function() {
            setClass("textColor", this.value, allowedTextColors);
        });
    }
    // Load font size selector if it exists
    const fontSizeSelect = document.getElementById("fontSizeSelect");
    if (fontSizeSelect) {
        allowedFontSizes.forEach(cls => {
            if (document.documentElement.classList.contains(cls)) {
                fontSizeSelect.value = cls;
            }
        });
        fontSizeSelect.addEventListener("change", function() {
            setClass("fontSize", this.value, allowedFontSizes);
        });
    }
});
