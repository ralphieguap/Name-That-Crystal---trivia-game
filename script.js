// Array of crystal clues
const crystalClues = [
    { clue: "Also called the 'Sobriety Stone'", answer: "Amethyst" },
    { clue: "'The Stone of Heaven' is believed to promote strength and emotional balance,it's also an indicator of copper deposits", answer: "Azurite" },
    { clue: "This sun-colored stone brings joy, abundance, and good luck and helps manifest desires, attracts wealth and prosperity", answer: "Citrine" },
    { clue: "Sleep with a piece of this under your pillow if you want more vivid dreams (the same rock held in 'Dragon Tails'", answer: "Labradorite" },
    { clue: "Associated with feminine energy, intuition, and lunar cycles, it is popular for manifesting, dreaming, and chakra work.", answer: "Moonstone" },
    { clue: "This crystal plays a vital role in modern technology, it has remarkable electrical and thermal properties and is used in watches, cameras, cell-phones & tvs", answer: "Quartz" },
    { clue: "This rare & powerful 'Holy Grail Stone' originated from a metorite impact", answer: "Moldavite" },
    { clue: "A potent psychic communication tool, it establishes a profound connection between you, your spirit guides, and departed loved ones.", answer: "Shattukite" }
];
let score = 0; // Initialize score
let currentClueIndex = -1; // Initialize current clue index

// Shuffle function to randomize the clues
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // Swap elements
    }
}

// Get all draggable elements and drop zones
const draggables = document.querySelectorAll('[draggable="true"]');
const dropzones = document.querySelectorAll('.answer');

// Allow drop function
function allowDrop(event) {
    event.preventDefault();
}

// Drag start function
draggables.forEach(draggable => {
    draggable.addEventListener('dragstart', () => {
        draggable.classList.add('dragging');
    });

    draggable.addEventListener('dragend', () => {
        draggable.classList.remove('dragging');
    });
});

// Function to get the next clue
function getNextClue() {
    currentClueIndex++;
    if (currentClueIndex < crystalClues.length) {
        const clue = crystalClues[currentClueIndex].clue;
        document.querySelector('.prompt').textContent = clue;
    } else {
        alert("Congratulations! You've got all the clues correct!");
        // Optionally reset or finish the game here
    }
}

// Drop function
dropzones.forEach(dropzone => {
    dropzone.addEventListener('drop', (event) => {
        event.preventDefault();
        const draggingElement = document.querySelector('.dragging');
        const clueText = dropzone.previousElementSibling.textContent; // Get clue text
        const clue = crystalClues[currentClueIndex]; // Get the current clue object

        if (clue && draggingElement.textContent === clue.answer) {
            dropzone.textContent = draggingElement.textContent; // Replace text with crystal name
            dropzone.appendChild(draggingElement); // Append the crystal element
            score++; // Increase score
            document.getElementById('score').textContent = score; // Update score display

            // Clear the drop zone
            dropzone.textContent = ""; // Clear the answer space
            draggingElement.style.display = "none"; // Hide the crystal

            // Get the next clue
            getNextClue();
        } else {
            alert("Incorrect crystal for this clue!");
        }
    });
});

// Start button functionality
document.getElementById('startButton').addEventListener('click', () => {
    shuffleArray(crystalClues); // Shuffle clues before starting
    getNextClue(); // Get the first clue
    alert("Game started! Drag and drop crystals to the clues.");
});

// Reset button functionality
document.getElementById('resetButton').addEventListener('click', () => {
    location.reload(); // Refresh the page to reset the game
});