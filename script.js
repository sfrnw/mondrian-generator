const COLORS = ['white', '#0038A8', '#FFD100', 'black', '#FF0000']; // Added red
const MIN_SIZE_PERCENTAGE = 5;

function generateMondrian() {
    const container = document.getElementById('mondrian-container');
    container.innerHTML = '';
    const containerWidth = container.clientWidth;
    const containerHeight = container.clientHeight;
    createRectangle(container, 0, 0, 100, 100);
}

function createRectangle(parent, x, y, width, height) {
    const rectangle = document.createElement('div');
    rectangle.className = 'rectangle';
    
    rectangle.style.backgroundColor = COLORS[Math.floor(Math.random() * COLORS.length)];
    
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

    rectangle.style.width = `${width}%`;
    rectangle.style.height = `${height}%`;
    rectangle.style.left = `${x}%`;
    rectangle.style.top = `${y}%`;
    parent.appendChild(rectangle);
}

window.addEventListener('load', generateMondrian);
window.addEventListener('resize', generateMondrian);
document.getElementById('mondrian-container').addEventListener('click', generateMondrian);
