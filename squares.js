function square_tile(x, y, sides) {
    let tp, angle;
    if (sides.left) {
        if (sides.right) {
            if (sides.top) {
                tp = randomOf(['square5', 'square6']);
                angle = randomOf([0, 90]);
            } else {
                tp = 'square4';
                angle = 0;
            }
        } else if (sides.top) {
            tp = randomOf(['square2', 'square3']);
            angle = 180;
        } else {
            tp = randomOf(['square2', 'square3']);
            angle = 90;
        }
    } else if (sides.top) {
        if (sides.bottom) {
            tp = 'square4';
            angle = 90;
        } else {
            tp = randomOf(['square2', 'square3']);
            angle = -90;
        }
    } else if (sides.right) {
        tp = randomOf(['square2', 'square3']);
        angle = 0;
    } else {
        tp = 'square1';
        angle = randomOf([0, 90]);
    }

    const tile = document.createElementNS(SVG_NS, 'use');
    tile.setAttribute('x', x * 100);
    tile.setAttribute('y', y * 100);
    tile.setAttributeNS(XLINK_NS, 'xlink:href', '#' + tp);
    tile.setAttribute('clip-path', 'url(#tile-rect)');
    tile.setAttribute('transform', `rotate(${angle}, ${x*100 + 50}, ${y*100 + 50})`);
    return tile;
}

function fill_with_squares() {
    const width = Math.ceil(window.innerWidth / 100);
    const height = Math.ceil(window.innerHeight / 100);

    const side_toggles = [];
    for (let x = 0; x < width; x++) {
        side_toggles.push([]);
        for (let y = 0; y < height; y++) {
            side_toggles[x].push({
                left: false,
                right: false,
                top: false,
                bottom: false,
            });
        }
    }

    let moves = 0;
    while (moves < width * height * 4 * 0.15) {
        let x, y;
        switch (Math.floor(Math.random() * 4)) {
            case 0:
                x = 0;
                y = Math.floor(Math.random() * height);
                side_toggles[x][y].left = !side_toggles[x][y].left;
                break;
            case 1:
                x = width - 1;
                y = Math.floor(Math.random() * height);
                side_toggles[x][y].right = !side_toggles[x][y].right;
                break;
            case 2:
                x = Math.floor(Math.random() * width);
                y = 0;
                side_toggles[x][y].top = !side_toggles[x][y].top;
                break;
            case 3:
                x = Math.floor(Math.random() * width);
                y = height - 1;
                side_toggles[x][y].bottom = !side_toggles[x][y].bottom;
                break;
        }
        while (0 <= x && x < width && 0 <= y && y < height) {
            moves++;
            switch (Math.floor(Math.random() * 4)) {
                case 0:
                    side_toggles[x][y].left = !side_toggles[x][y].left;
                    x--;
                    if (x >= 0)
                        side_toggles[x][y].right = !side_toggles[x][y].right;
                    break;
                case 1:
                    side_toggles[x][y].right = !side_toggles[x][y].right;
                    x++;
                    if (x < width)
                        side_toggles[x][y].left = !side_toggles[x][y].left;
                    break;
                case 2:
                    side_toggles[x][y].top = !side_toggles[x][y].top;
                    y--;
                    if (y >= 0)
                        side_toggles[x][y].bottom = !side_toggles[x][y].bottom;
                    break;
                case 3:
                    side_toggles[x][y].bottom = !side_toggles[x][y].bottom;
                    y++;
                    if (y < height)
                        side_toggles[x][y].top = !side_toggles[x][y].top;
                    break;
            }
        }
    }

    const tiles = document.getElementById('tiles');
    tiles.innerHTML = '';
    for (let x = 0; x < width; x++)
        for (let y = 0; y < height; y++)
            tiles.appendChild(square_tile(x, y, side_toggles[x][y]));
}
