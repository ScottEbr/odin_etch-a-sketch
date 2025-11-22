const gridContainer = document.querySelector(".etch-container")

let isDrawing = false;
gridContainer.addEventListener('mousedown', () => isDrawing = true);
gridContainer.addEventListener('mouseup',   () => isDrawing = false);
gridContainer.addEventListener('mouseleave',() => isDrawing = false);

gridContainer.addEventListener('mousedown', e => e.preventDefault()); // Fixes no-access cursor when selecting buttons and drawing quickly

createGrid(32) // initialise sheet with the same value as input range. Refer to html, class="slider"

// Displays slider value on page, and uses slider value when creating grid.
var slider = document.getElementById("myRange");
var output = document.getElementById("demo");
output.innerHTML = slider.value; // DISPLAYS DEFAULT SLIDER VALUE

slider.oninput = function() {
    output.innerHTML = this.value;
    createGrid(this.value)
}

// Create grid, didn't use CSS grid as per project instruction. Maintained flex-box fromatting.
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
        cell.style.backgroundColor = 'white'; // default background colour
    }
}

// Handle to colour cell on mousedown (clicking annd dragging), and on initial click
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

// Handles all drawing, pending on what button is active.
function draw(cell) {
    const element = document.querySelector('.randRGBBtn'); 
    const dark = document.querySelector('.darkBtn')
    const light = document.querySelector('.lightBtn')

    const color = document.querySelector('.colorChoice').value;
    const colorMode = document.querySelector('.colorMode')

    if (element.classList.contains('active')) {
        const r = Math.floor(Math.random() * 256);
        const g = Math.floor(Math.random() * 256);
        const b = Math.floor(Math.random() * 256);
        cell.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;

    } else if (dark.classList.contains('active')) {
        cell.style.backgroundColor = darkenCell(cell); 

    } else if (light.classList.contains('active')) {
        cell.style.backgroundColor = lightenCell(cell); 
        
    } else if (colorMode.classList.contains('active')) {
        cell.style.backgroundColor = color;  

    } else {
        cell.style.backgroundColor = 'black'
        
    }
    
}

function darkenCell(cell) {
    // Get its current color (computed style)
    const currentColor = window.getComputedStyle(cell).backgroundColor;

    // Convert current color to HSL
    const hsl = rgbToHsl(currentColor);

    // Darken by 10%
    hsl.l = Math.max(hsl.l - 10, 0);

    // Apply the new color
    cell.style.backgroundColor = `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;
}

function lightenCell(cell) {
    // Get its current color (computed style)
    const currentColor = window.getComputedStyle(cell).backgroundColor;

    // Convert current color to HSL
    const hsl = rgbToHsl(currentColor);

    // Lighten by 10%
    hsl.l = Math.min(hsl.l + 10, 100);

    // Apply the new color
    cell.style.backgroundColor = `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;
}

// RGB to HSL converter
function rgbToHsl(rgbString) {
    // Extract numbers: rgb(a, b, c) → [a, b, c]
    const rgb = rgbString.match(/\d+/g).map(Number);
    let [r, g, b] = rgb;

    r /= 255; g /= 255; b /= 255;

    const max = Math.max(r, g, b),
          min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if (max === min) {
        h = s = 0; // grey (no hue / saturation)
    } else {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h *= 60;
    }

    return {
        h: Math.round(h),
        s: Math.round(s * 100),
        l: Math.round(l * 100)
    };
}

// Handles buttons getting toggled.
document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('Button');
    const clear = document.querySelector('.clearBtn');
    const color = document.querySelector('.colorMode');

    buttons.forEach(button => {
        button.addEventListener('mousedown', function() {
            // Allows for toggling of "Grid Toggle" button, and won't toggle off if other buttons are pressed.
            if (this.classList.contains('gridBtn')) {
                this.classList.toggle('active');
                document.querySelector('.etch-container').classList.toggle('no-borders');
                return;
            }

            buttons.forEach(btn => {
                if (!btn.classList.contains('gridBtn')) {
                    btn.classList.remove('active');
                }
            });

            // Add 'active' class to the clicked button
            this.classList.add('active');

        });

    });

    // Clear button EventListern on mouseup (rather than click), so we still get to see the style on mouse down. Delete grid, then re-initialises based off slider value.
    clear.addEventListener('mouseup', function() {
        document.querySelector(".etch-container").innerHTML = '';
        createGrid(slider.value)

        this.classList.remove('active');
        color.classList.add('active')

    });

});