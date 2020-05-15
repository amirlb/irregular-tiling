function triangle_tile(x, y, flipped) {
    const tp = randomOf(['triangle1', 'triangle2']);
    const angle = randomOf([0, 120, 240]) + (flipped ? 60 : 0);
    const flip_h = randomOf([1, -1]);

    const tile = document.createElementNS(SVG_NS, 'use');
    tile.setAttribute('x', 0);
    tile.setAttribute('y', 0);
    tile.setAttribute('mask', 'url(#triangle-mask)');
    tile.setAttributeNS(XLINK_NS, 'xlink:href', '#' + tp);
    tile.setAttribute('transform', `translate(${x * 75 - 75}, ${y * 129.9}) translate(75, ${flipped ? 43.3 : 0}) scale(${flip_h}, 1) rotate(${angle}, 0, 43.3) translate(-75, 0)`);
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
