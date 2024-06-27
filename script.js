document.addEventListener('DOMContentLoaded', (event) => {
    const initialPositions = ['G', 'G', 'G', '-', 'B', 'B', 'B'];
    let positions = [...initialPositions];
    let selectedPosition = null;

    const positionsContainer = document.getElementById('positions');
    const messageContainer = document.getElementById('message');
    const restartButton = document.getElementById('restart');

    function displayGame() {
        positionsContainer.innerHTML = '';
        positions.forEach((pos, index) => {
            const div = document.createElement('div');
            div.classList.add('position');

            const stoneImg = document.createElement('img');
            stoneImg.src = 'stone.png';
            stoneImg.classList.add('stone');
            div.appendChild(stoneImg);
            
            if (pos === 'G') {
                const img = document.createElement('img');
                img.src = 'g.png';
                div.appendChild(img);
            } else if (pos === 'B') {
                const img = document.createElement('img');
                img.src = 'b.png';
                div.appendChild(img);
            }
            div.dataset.index = index;
            div.addEventListener('click', () => selectPosition(index));
            positionsContainer.appendChild(div);
        });
    }

    function selectPosition(index) {
        if (positions[index] !== '-') {
            const pos2 = checkValidMove(positions, index);
            if (pos2 !== -1) {
                swapPositions(positions, index, pos2);
                displayGame();
                if (checkWin(positions)) {
                    messageContainer.textContent = 'You Win!';
                    endGame();
                } else if (isDeadlock(positions)) {
                    messageContainer.textContent = 'You Lose';
                    endGame();
                }
        }
    }

    function checkValidMove(positions, selectedPosition) {
        let pos2 = -1;
        if (positions[selectedPosition] === 'G') {
            // Condition 1
            if (selectedPosition + 1 <= 6 && positions[selectedPosition + 1] === '-') {
                pos2 = selectedPosition + 1;
            }
            // Condition 2
            else if (selectedPosition + 2 <= 6 && positions[selectedPosition + 2] === '-' && positions[selectedPosition + 1] === 'B') {
                pos2 = selectedPosition + 2;
            }
        } else if (positions[selectedPosition] === 'B') {
            // Condition 1
            if (selectedPosition - 1 >= 0 && positions[selectedPosition - 1] === '-') {
                pos2 = selectedPosition - 1;
            }
            // Condition 2
            else if (selectedPosition - 2 >= 0 && positions[selectedPosition - 2] === '-' && positions[selectedPosition - 1] === 'G') {
                pos2 = selectedPosition - 2;
            }
        }
        return pos2;
    }

    function swapPositions(positions, pos1, pos2) {
        [positions[pos1], positions[pos2]] = [positions[pos2], positions[pos1]];
    }

    function checkWin(positions) {
        return positions.join('') === 'BBB-GGG';
    }

    function canMoveRight(positions, i) {
        if (positions[i] === 'G') {
            if (i + 1 < positions.length && positions[i + 1] === '-') {
                return true;
            } else if (i + 2 < positions.length && positions[i + 2] === '-' && positions[i + 1] === 'B') {
                return true;
            }
        }
        return false;
    }

    function canMoveLeft(positions, i) {
        if (positions[i] === 'B') {
            if (i - 1 >= 0 && positions[i - 1] === '-') {
                return true;
            } else if (i - 2 >= 0 && positions[i - 2] === '-' && positions[i - 1] === 'G') {
                return true;
            }
        }
        return false;
    }

    function isDeadlock(positions) {
        if (positions.some((pos, i) => pos === 'G' && canMoveRight(positions, i))) {
            return false;
        }
        if (positions.some((pos, i) => pos === 'B' && canMoveLeft(positions, i))) {
            return false;
        }
        return true;
    }

    function endGame() {
        document.querySelectorAll('.position').forEach((div) => {
            div.removeEventListener('click', selectPosition);
        });
    }

    restartButton.addEventListener('click', () => {
        positions = [...initialPositions];
        selectedPosition = null;
        messageContainer.textContent = '';
        displayGame();
    });

    displayGame();
}});
