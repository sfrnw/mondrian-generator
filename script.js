const COLORS = ['white', '#0038A8', '#FFD100', 'black'];
const MIN_SIZE = 50;

function generateMondrian() {
    const container = document.getElementById('mondrian-container');
    container.innerHTML = '';
    createRectangle(container, 0, 0, 600, 600);
}

function createRectangle(parent, x, y, width, height) {
    const rectangle = document.createElement('div');
    rectangle.className = 'rectangle';
    
    // Random color selection
    rectangle.style.backgroundColor = COLORS[Math.floor(Math.random() * COLORS.length)];
    
    // Random split decision
    if (width > MIN_SIZE * 2 || height > MIN_SIZE * 2) {
        if (Math.random() > 0.5 && width > MIN_SIZE * 2) { // Vertical split
            const splitAt = MIN_SIZE + Math.random() * (width - MIN_SIZE * 2);
            createRectangle(parent, x, y, splitAt, height);
            createRectangle(parent, x + splitAt, y, width - splitAt, height);
            return;
        } else if (height > MIN_SIZE * 2) { // Horizontal split
            const splitAt = MIN_SIZE + Math.random() * (height - MIN_SIZE * 2);
            createRectangle(parent, x, y, width, splitAt);
            createRectangle(parent, x, y + splitAt, width, height - splitAt);
            return;
        }
    }

    // Set final dimensions
    rectangle.style.width = `${width}px`;
    rectangle.style.height = `${height}px`;
    rectangle.style.left = `${x}px`;
    rectangle.style.top = `${y}px`;
    parent.appendChild(rectangle);
}

// Initial generation
generateMondrian();
