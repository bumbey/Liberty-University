/*
proj5.js
Cayden Park
Professor Kristi Smith
CSCN315-001: Front-End Programming in JavaScript

JavaScript file for the lightbox gallery project. Has functions
to populate the gallery, move the gallery left or right, set and
clear captions, create and remove overlays, and change images in
the overlay.

Can swap overlay photo with left and right buttons.
Uses createElement and appendChild for gallery and overlay.
Photo is included on every page.
*/


// Image file references
const imgFiles = [
    "animal.jpg",
    "chef.jpg",
    "hat.jpg",
    "rocket.jpg",
    "sister.jpg",
    "snowman.jpg",
    "ukulele.jpg"
]

// Image captions
const imgCaptions = [
    "Animal",
    "Chef",
    "Hat",
    "Rocket",
    "Sister",
    "Snowman",
    "Ukulele"
]

const imgCount = imgFiles.length;
// How many images to show in the gallery
const numImagesToShow = 4;
let galleryIndex = 0;
let overlayIndex = 0;

document.addEventListener("DOMContentLoaded", () => {
    // Populate image gallery
    const gallery = document.querySelector(".gallery");
    for (let i = 0; i < numImagesToShow; i++) {
        const img = document.createElement("img");
        img.src = `images/${imgFiles[i]}`;
        img.alt = imgCaptions[i];
        img.classList.add("gallery-item");
        img.addEventListener("click", createOverlay);
        img.addEventListener("mouseover", setCaption);
        img.addEventListener("mouseout", clearCaption);
        gallery.appendChild(img);
    }
});

// Shifts gallery left (direction = -1) or right (direction = 1)
function moveGallery(direction) {
    // Gets gallery
    const gallery = document.querySelector(".gallery");

    // Determines index of next image
    galleryIndex += direction;
    if (galleryIndex > imgCount) {
        galleryIndex -= imgCount;
    } else if (galleryIndex < 0) {
        galleryIndex += imgCount;
    }
    const oldImg = direction === 1 ? gallery.firstElementChild : gallery.lastElementChild;
    const index = direction === 1 ? (galleryIndex + numImagesToShow - 1) % imgCount : galleryIndex;
    
    // Creates new image element
    const newImg = document.createElement("img");
    newImg.src = `images/${imgFiles[index]}`;
    newImg.alt = imgCaptions[index];
    newImg.classList.add("gallery-item");
    newImg.addEventListener("click", createOverlay);
    newImg.addEventListener("mouseover", setCaption);
    newImg.addEventListener("mouseout", clearCaption);

    // Animates image transition
    newImg.style.transform = `translateX(${direction * 64}px)`;
    if (direction === 1) {
        gallery.appendChild(newImg);
    } else if (direction === -1) {
        gallery.insertBefore(newImg, gallery.firstElementChild);
    }
    gallery.removeChild(oldImg);

    requestAnimationFrame(() => {
        newImg.style.transform = "";
    });
}

// Sets caption to the image's alt text
function setCaption() {
    const caption = document.getElementById("image-caption");
    caption.textContent = this.alt;
}

// Clears caption
function clearCaption() {
    const caption = document.getElementById("image-caption");
    caption.textContent = "";
}

// Creates overlay of image when clicked
function createOverlay() {
    console.log(`Showing ${this.alt} in overlay.`);

    const overlay = document.createElement("div");
    overlay.classList.add("gallery-overlay");
    overlay.style.opacity = 0;
    document.body.appendChild(overlay);

    const img = document.createElement("img");
    img.src = this.src;
    img.alt = this.alt;
    img.style.height = "512px";
    img.classList.add("gallery-overlay-image");
    overlay.appendChild(img);

    const caption = document.createElement("h3");
    caption.textContent = this.alt;
    overlay.appendChild(caption);

    const prevButton = document.createElement("button");
    prevButton.textContent = "<";
    prevButton.classList.add("overlay-button");
    prevButton.classList.add("left");
    prevButton.addEventListener("click", () => {
        changeImage(-1);
    });
    overlay.appendChild(prevButton);

    const nextButton = document.createElement("button");
    nextButton.textContent = ">";
    nextButton.classList.add("overlay-button");
    nextButton.classList.add("right");
    nextButton.addEventListener("click", () => {
        changeImage(1);
    });
    overlay.appendChild(nextButton);

    const closeButton = document.createElement("button");
    closeButton.textContent = "Close";
    closeButton.classList.add("overlay-close");
    closeButton.addEventListener("click", removeOverlay);
    overlay.appendChild(closeButton);

    requestAnimationFrame(() => {
        overlay.style.opacity = 1;
    });

    overlayIndex = imgFiles.indexOf(this.src.split("/").pop());
}

// Removes overlay when clicked
function removeOverlay() {
    console.log("Removing overlay.");

    const overlay = document.querySelector(".gallery-overlay");
    overlay.style.opacity = 0;
    overlay.addEventListener("transitionend", () => {
        overlay.remove();
    });
}

// Goes to the next or previous image in the overlay
function changeImage(direction) {
    overlayIndex += direction;
    if (overlayIndex < 0) {
        overlayIndex = imgCount - 1;
    }
    else {
        overlayIndex = overlayIndex % imgCount;
    }
    const overlay = document.querySelector(".gallery-overlay");
    const img = overlay.children[0];
    img.src = `images/${imgFiles[overlayIndex]}`;
    img.alt = imgCaptions[overlayIndex];

    const caption = overlay.children[1];
    caption.textContent = img.alt;
}