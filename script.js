const gridContainer = document.querySelector(".etch-container")

let isDrawing = false;
gridContainer.addEventListener('mousedown', () => isDrawing = true);
gridContainer.addEventListener('mouseup',   () => isDrawing = false);
gridContainer.addEventListener('mouseleave',() => isDrawing = false);

function createGrid(size) {
    

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
    cell.style.backgroundColor = "black";  // or dynamic color
}




createGrid(64)