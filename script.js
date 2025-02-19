const COLORS = ['white', '#0038A8', '#FFD100', 'black', '#FF0000'];
const MIN_SIZE_PERCENTAGE = 5;
let colorGrid = [];
const GRID_SIZE = 20; // Adjust this for finer or coarser color tracking

function initColorGrid() {
    colorGrid = Array(GRID_SIZE).fill().map(() => Array(GRID_SIZE).fill(null));
}

function generateMondrian() {
    const container = document.getElementById('mondrian-container');
    container.innerHTML = '';
    initColorGrid();
    createRectangle(container, 0, 0, 100, 100);
}

function createRectangle(parent, x, y, width, height) {
    const rectangle = document.createElement('div');
    rectangle.className = 'rectangle';
    
    const gridX = Math.floor(x / (100 / GRID_SIZE));
    const gridY = Math.floor(y / (100 / GRID_SIZE));
    const gridWidth = Math.ceil(width / (100 / GRID_SIZE));
    const gridHeight = Math.ceil(height / (100 / GRID_SIZE));
    
    const availableColors = getAvailableColors(gridX, gridY, gridWidth, gridHeight);
    rectangle.style.backgroundColor = availableColors[Math.floor(Math.random() * availableColors.length)];
    
    if (width > MIN_SIZE_PERCENTAGE * 2 || height > MIN_SIZE_PERCENTAGE * 2) {
        if (Math.random() > 0.5 && width > MIN_SIZE_PERCENTAGE * 2) {
            const splitAt = MIN_SIZE_PERCENTAGE + Math.random() * (width - MIN_SIZE_PERCENTAGE * 2);
            createRectangle(parent, x, y, splitAt, height);
            createRectangle(parent, x + splitAt, y, width - splitAt, height);
            return;
        } else if (height > MIN_SIZE_PERCENTAGE * 2) {
            const splitAt = MIN_SIZE_PERCENTAGE + Math.random() * (height - MIN_SIZE_PERCENTAGE * 2);
            createRectangle(parent, x, y, width, splitAt);
            createRectangle(parent, x, y + splitAt, width, height - splitAt);
            return;
        }
    }

    rectangle.style.width = `${width + 0.1}%`;
    rectangle.style.height = `${height + 0.1}%`;
    rectangle.style.left = `${x - 0.05}%`;
    rectangle.style.top = `${y - 0.05}%`;
    parent.appendChild(rectangle);

    // Update color grid
    for (let i = gridX; i < gridX + gridWidth && i < GRID_SIZE; i++) {
        for (let j = gridY; j < gridY + gridHeight && j < GRID_SIZE; j++) {
            colorGrid[i][j] = rectangle.style.backgroundColor;
        }
    }
}

function getAvailableColors(gridX, gridY, gridWidth, gridHeight) {
    const neighborColors = new Set();
    for (let i = Math.max(0, gridX - 1); i <= Math.min(GRID_SIZE - 1, gridX + gridWidth); i++) {
        for (let j = Math.max(0, gridY - 1); j <= Math.min(GRID_SIZE - 1, gridY + gridHeight); j++) {
            if (colorGrid[i][j]) neighborColors.add(colorGrid[i][j]);
        }
    }
    
    return COLORS.filter(color => color !== 'black' || !neighborColors.has('black'));
}

window.addEventListener('load', generateMondrian);
window.addEventListener('resize', generateMondrian);
document.getElementById('mondrian-container').addEventListener('click', generateMondrian);
