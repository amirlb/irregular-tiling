function triangle_tile(x, y, flipped) {
    const tp = randomOf(['triangle1', 'triangle2']);
    const angle = randomOf([0, 120, 240]) + (flipped ? 60 : 0);

    const tile = document.createElementNS(SVG_NS, 'use');
    tile.setAttribute('x', 0);
    tile.setAttribute('y', 0);
    tile.setAttributeNS(XLINK_NS, 'xlink:href', '#' + tp);
    tile.setAttribute('transform', `translate(${x * 75 - 75}, ${y * 129.9}) translate(0, ${flipped ? 43.3 : 0}) rotate(${angle}, 75, 43.3)`);
    return tile;
}

function fill_with_triangles() {
    const width = Math.ceil(window.innerWidth / 75) + 1;
    const height = Math.ceil(window.innerHeight / 129.9);

    const tiles = document.getElementById('tiles');
    tiles.innerHTML = '';
    for (let x = 0; x < width; x++) {
        for (let y = 0; y < height; y++) {
            tiles.appendChild(triangle_tile(x, y, ((x + y) % 2) == 0));
        }
    }
}
