/*
proj10.js
Cayden Park
Professor Kristi Smith
CSCN315-001: Front-End Programming in JavaScript

Implements a 4x4 puzzle. Pieces can be dragged and dropped onto the puzzle grid.
If the piece is in the correct spot, it is locked in place.
Pieces can be removed from the grid by right-clicking them.
Once the puzzle is complete, the timer pauses.
*/

// Timer variables
let startTime = 0;
let elapsedTime = 0;
let timerInterval = null;

document.addEventListener("DOMContentLoaded", () => {
    // Set puzzle size and dimensions
    let size = 4;
    let dimensions = 512;
    const pieceSize = Math.floor(dimensions / size);

    // Reset button
    const reset = document.getElementById("reset");
    reset.onclick = resetPuzzle;

    // Puzzle grid
    const grid = document.querySelector(".puzzle-grid");
    // Configure grid size
    grid.style.gridTemplateColumns = `repeat(${size}, ${pieceSize}px)`;
    grid.style.gridTemplateRows = `repeat(${size}, ${pieceSize}px)`;
    // Add grid cells
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            let cell = document.createElement("div");
            cell.className = "puzzle-cell";
            cell.id = `C${i * size + j}`;
            cell.oncontextmenu = function(e) { e.preventDefault(); }
            cell.ondragover = function(e) { e.preventDefault(); }
            // Add puzzle piece on drop
            cell.ondrop = function(e) {
                e.preventDefault();
                if (!cell.hasChildNodes()){
                    const pieceID = e.dataTransfer.getData("id");
                    cell.appendChild(document.getElementById(pieceID));
                }
                checkPuzzle();
            }
            grid.appendChild(cell);
        }
    }

    // Puzzle piece storage
    const storage = document.querySelector(".puzzle-storage")
    storage.style.gridTemplateColumns = `repeat(auto-fit, ${pieceSize}px)`
    storage.ondragover = function(e) { e.preventDefault(); }
    storage.ondrop = function(e) {
        e.preventDefault();
        const pieceID = e.dataTransfer.getData("id");
        storage.appendChild(document.getElementById(pieceID));
    }

    // Puzzle pieces
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            let piece = document.createElement("div");
            piece.className = "puzzle-piece";
            piece.draggable = true;
            piece.id = `P${i * size + j}`;
            // Set piece image
            piece.style.width = `${pieceSize}px`;
            piece.style.height = `${pieceSize}px`;
            piece.style.backgroundImage = 'url("images/harold.jpg")';
            piece.style.backgroundSize = `${dimensions}px`;
            piece.style.backgroundPosition = `${-j * dimensions / size}px ${-i * dimensions / size}px`;
            piece.ondragstart = function(e) { e.dataTransfer.setData("id", piece.id); }
            piece.oncontextmenu = function(e) {
                e.preventDefault();
                storage.appendChild(document.getElementById(piece.id));
            }
            storage.appendChild(piece)
        }
    }

    resetPuzzle();
});

// Reset puzzle, shuffle pieces, reset timer
function resetPuzzle() {
    const pieces = Array.from(document.querySelectorAll(".puzzle-piece"));
    const storage = document.querySelector(".puzzle-storage");

    // Shuffle array
    for (let i = pieces.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [pieces[i], pieces[j]] = [pieces[j], pieces[i]];
    }

    // Reset pieces
    pieces.forEach(piece =>{
        piece.classList.remove("correct");
        piece.draggable = true;
        piece.ondragstart = function(e) {
            e.dataTransfer.setData("id", piece.id);
        }
        piece.oncontextmenu = function(e) {
            e.preventDefault();
            storage.appendChild(document.getElementById(piece.id));
        }
        storage.appendChild(piece)
    });

    // Reset message
    const message = document.getElementById("message");
    message.innerHTML = "Finish the Puzzle!";
    console.log("Resetting puzzle.");

    // Reset timer
    const timer = document.getElementById("timer");
    startTime = Date.now();
    timerInterval = setInterval(() => {
        elapsedTime = Date.now() - startTime;
        timer.textContent = timeToString(elapsedTime);
    }, 10);
}

// Convert time into string
function timeToString(time) {
    let date = new Date(time);
    let minutes = date.getUTCMinutes();
    let seconds = date.getUTCSeconds();
    let milliseconds = date.getUTCMilliseconds();
  
    return (
      (minutes < 10 ? "0" + minutes : minutes) + ":" +
      (seconds < 10 ? "0" + seconds : seconds) + "." +
      milliseconds.toString().padStart(3, '0')
    );
}

// Check puzzle solve state
function checkPuzzle() {
    const cells = document.querySelectorAll(".puzzle-cell");
    const regex = /\d+/;
    let solved = true;
    
    // Iterate through each cell
    for (let i = 0; i < cells.length; i++) {
        let cell = cells[i];
        if (cell.hasChildNodes()) {
            let piece = cell.childNodes[0];
            let cellNum = cell.id.match(regex)[0];
            let pieceNum = piece.id.match(regex)[0];
            if (cellNum !== pieceNum) {
                // Not solved if piece is in wrong place
                solved = false;
            }
            else {
                // Secure correct pieces
                piece.classList.add("correct");
                piece.draggable = false;
                piece.ondragstart = function(e) { e.preventDefault(); }
                piece.oncontextmenu = function(e) { e.preventDefault(); }
            }
        }
        else {
            // Not solved if cell is empty
            solved = false;
        }
    }
    if (solved) {
        // Display solved message
        console.log("Puzzle solved!");
        const message = document.getElementById("message");
        message.innerHTML = "Puzzle solved!";

        // Pause timer
        clearInterval(timerInterval);
    }
}