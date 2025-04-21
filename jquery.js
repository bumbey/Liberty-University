/*
jquery.js
Cayden Park
Professor Kristi Smith
CSCN315-001: Front-End Programming in JavaScript

Simple jquery implementation.
Implements autocomplete on an input.
Fades in page elements for effect.
*/

$(document).ready(function() {
    // Fade in page elements
    $("#introTitle").fadeIn(1000, () => {
        $("#introSubtitle").fadeIn(1000, () => {
            $("#purposeInput").fadeIn(500);
        });
    });

    // Prepare list of items for autocomplete
    const purposes = [
        "I want to plan my college degree!",
        "I want to check my prerequisites!",
        "I'm just checking it out."
    ];

    // Set autocomplete on input
    $("#purposeInput").autocomplete({
        source: purposes
    });
});