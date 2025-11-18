const gridContainer = document.querySelector(".etch-container")

let isDrawing = false;
gridContainer.addEventListener('mousedown', () => isDrawing = true);
gridContainer.addEventListener('mouseup',   () => isDrawing = false);
gridContainer.addEventListener('mouseleave',() => isDrawing = false);

function createGrid(size) {
    

    gridContainer.innerHTML = ""
    const cellSize = 100 / size;

    for (let i = 0; i < size * size; i++) {
        const cell = document.createElement('div');
        cell.classList.add('grid-item');

        cell.style.flexBasis = `${cellSize}%`;
        cell.style.height = `${cellSize}%`;

        drawCell(cell)

        gridContainer.appendChild(cell);
    }
}

createGrid(32) // initialise sheet with the same value as input range. Refer to html, class="slider"

function drawCell(cell) {
    
    // paint on hover while mouse is held
        cell.addEventListener("mouseover", () => {
            if (isDrawing) draw(cell);
        });

        // also paint on direct click
        cell.addEventListener("mousedown", () => {
            draw(cell);
        });

}



function draw(cell) {
    const element = document.querySelector('.randRGBBtn'); 

    // Check if the element has the 'active' class
    if (element.classList.contains('active')) {
        const r = Math.floor(Math.random() * 256);
        const g = Math.floor(Math.random() * 256);
        const b = Math.floor(Math.random() * 256);
        cell.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
        // Perform actions if the class is present
    } else {
        cell.style.backgroundColor = "black"; 
        // Perform actions if the class is not present
    }

    // cell.style.backgroundColor = "black"; 


    
}

// SLIDER OUTPUT
var slider = document.getElementById("myRange");
var output = document.getElementById("demo");
output.innerHTML = slider.value; // DISPLAYS DEFAULT SLIDER VALUE

// UPDATE SLIDER VALUE WHEN SLIDING
slider.oninput = function() {
    output.innerHTML = this.value;
    createGrid(this.value)
}


// TOGGLES BUTTONS TO BE ACTIVE
document.addEventListener('DOMContentLoaded', function() {
  const buttons = document.querySelectorAll('Button');

  buttons.forEach(button => {
    button.addEventListener('click', function() {
      // Remove 'active' class from all other buttons if only one should be active at a time
      buttons.forEach(btn => btn.classList.remove('active'));

      // Add 'active' class to the clicked button
      this.classList.add('active');
    });
  });
});