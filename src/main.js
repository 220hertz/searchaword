import './styles.scss';
import 'bootstrap/dist/css/bootstrap.min.css';


document.addEventListener('DOMContentLoaded', function () {

  let randomWord = ""

  let request1 = new XMLHttpRequest();
  request1.open('GET', 'https://random-word-api.herokuapp.com/word?length=5', false);
  request1.send();
  if (request1.status === 200){
    let data = JSON.parse(request1.responseText);
    console.log(data)
    randomWord = data[0]
  }

  let title = document.getElementById('game-title');
  title.textContent = 'WORDS RELATED TO: ' + randomWord.toUpperCase()


  let words = [];

    let xhr = new XMLHttpRequest();
  
  xhr.open('GET', `https://api.datamuse.com/words?rel_trg=${randomWord}`, false); // `false` makes the request synchronous
  
    xhr.send();
  
  if (xhr.status === 200) {
    let data = JSON.parse(xhr.responseText);
  
    words = data
      .filter(word => word.word.length >= 3 && word.word.length <= 8)
      .slice(0, 16)
      .map(word => word.word.toUpperCase());
  
    console.log('Generated word list:', words);
    if (words.length < 16) {
      window.location.reload()
    }
  
 
  } else {
    console.error('XHR request failed with status:', xhr.status);
  }
  
 

    const canvas = document.getElementById('gameCanvas');
    const context = canvas.getContext('2d');
    canvas.style.cursor = 'pointer';
    const gridSize = 12;
    const cellSize = canvas.width / gridSize;
    let firstClick = null;
    let secondClick = null;
    const highlightedCells = []; 
    const selectedCells = []; 
    let tempHighlightCells = []; 
    let foundWords = [];
  
    
    const board = Array.from({ length: gridSize }, () => Array.from({ length: gridSize }, () => ''));
 
    
    placeWords(board, words);
    fillEmptySquares(board);
    drawGrid();
  
    canvas.addEventListener('click', handleClick);
  
    function handleClick(event) {
      if(isRunning){
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const col = Math.floor(x / cellSize);
      const row = Math.floor(y / cellSize);
  
      if (!firstClick) {
        firstClick = { row, col };
        highlightCell(firstClick);
      } else {
        clearCell(firstClick);
        clearCell(secondClick)
        secondClick = { row, col };
        highlightCell(secondClick);
        attemptSelection();
      }
    }
    }
  
    function attemptSelection() {
      if (!firstClick || !secondClick) return;
    
      const word = getWordFromSelection(firstClick, secondClick);
    
      if (words.includes(word)) {
        if (!foundWords.includes(word)) { // Check if word has not been found before
          highlightWord(firstClick, secondClick); 
    
          const foundWordItem = document.querySelector(`#clue-${word}`);
          if (foundWordItem) {
            foundWordItem.classList.add('found-word');
            updatePoints(getPointsForAttempt());
          }
    
          foundWords.push(word); // Add the word to the found words list
        }
      } else {
        temporaryHighlight(firstClick, secondClick);
        updatePoints(-1);
      }
    
      clearCell(firstClick);
      clearCell(secondClick);
      firstClick = null;
      secondClick = null;
    
      if (checkWinCondition()) {
        stopTimer();
        document.getElementById('timer').innerText = "Hey, you did it!";
        updatePoints(getPointsForCompletion());
      }
    }
    

      function updatePoints(pointsToAdd) {
        points += pointsToAdd;
        document.getElementById('points').innerText = points;
    }
 
    function getWordFromSelection(start, end) {
      let word = '';
    
      if (start.row === end.row) {
        // Horizontal selection
        const row = start.row;
        if (start.col < end.col) {
          // Left to right
          for (let col = start.col; col <= end.col; col++) {
            word += board[row][col];
          }
        } else {
          // Right to left
          for (let col = start.col; col >= end.col; col--) {
            word += board[row][col];
          }
        }
      } else if (start.col === end.col) {
        // Vertical selection
        const col = start.col;
        if (start.row < end.row) {
          // Top to bottom
          for (let row = start.row; row <= end.row; row++) {
            word += board[row][col];
          }
        } else {
          // Bottom to top
          for (let row = start.row; row >= end.row; row--) {
            word += board[row][col];
          }
        }
      } else if (Math.abs(start.row - end.row) === Math.abs(start.col - end.col)) {
        // Diagonal selection
        const steps = Math.abs(start.row - end.row);
    
        if (start.row < end.row && start.col < end.col) {
          // Top-left to bottom-right
          for (let i = 0; i <= steps; i++) {
            word += board[start.row + i][start.col + i];
          }
        } else if (start.row > end.row && start.col > end.col) {
          // Bottom-right to top-left (reverse)
          for (let i = 0; i <= steps; i++) {
            word += board[start.row - i][start.col - i];
          }
        } else if (start.row < end.row && start.col > end.col) {
          // Top-right to bottom-left (reverse)
          for (let i = 0; i <= steps; i++) {
            word += board[start.row + i][start.col - i];
          }
        } else if (start.row > end.row && start.col < end.col) {
          // Bottom-left to top-right
          for (let i = 0; i <= steps; i++) {
            word += board[start.row - i][start.col + i];
          }
        }
      }
    
      return word;
    }
    
      function highlightWord(start, end) {
        if (start.row === end.row) {
          
          const row = start.row;
          const startCol = Math.min(start.col, end.col);
          const endCol = Math.max(start.col, end.col);
          for (let col = startCol; col <= endCol; col++) {
            highlightedCells.push({ row, col });
          }
        } else if (start.col === end.col) {
          
          const col = start.col;
          const startRow = Math.min(start.row, end.row);
          const endRow = Math.max(start.row, end.row);
          for (let row = startRow; row <= endRow; row++) {
            highlightedCells.push({ row, col });
          }
        } else if (start.row - end.row === start.col - end.col) {
          
          const startRow = Math.min(start.row, end.row);
          const endRow = Math.max(start.row, end.row);
          const startCol = Math.min(start.col, end.col);
          const endCol = Math.max(start.col, end.col);
      
          for (let row = startRow, col = startCol; row <= endRow && col <= endCol; row++, col++) {
            highlightedCells.push({ row, col });
          }
        } else if (start.row - end.row === end.col - start.col) {
          
          const startRow = Math.max(start.row, end.row);
          const endRow = Math.min(start.row, end.row);
          const startCol = Math.min(start.col, end.col);
          const endCol = Math.max(start.col, end.col);
      
          for (let row = startRow, col = startCol; row >= endRow && col <= endCol; row--, col++) {
            highlightedCells.push({ row, col });
          }
        }
      
        drawGrid(); 
      }
  
    function highlightCell(cell) {
      if (cell) {
        selectedCells.push(cell);
        drawGrid(); 
      }
    }
  
    function temporaryHighlight(start, end) {
      if (isRunning){
        if (start.row === end.row) {
          
          const row = start.row;
          const startCol = Math.min(start.col, end.col);
          const endCol = Math.max(start.col, end.col);
          for (let col = startCol; col <= endCol; col++) {
            tempHighlightCells.push({ row, col });
          }
        } else if (start.col === end.col) {
          
          const col = start.col;
          const startRow = Math.min(start.row, end.row);
          const endRow = Math.max(start.row, end.row);
          for (let row = startRow; row <= endRow; row++) {
            tempHighlightCells.push({ row, col });
          }
        } else if (start.row - end.row === start.col - end.col) {
          
          const startRow = Math.min(start.row, end.row);
          const endRow = Math.max(start.row, end.row);
          const startCol = Math.min(start.col, end.col);
          const endCol = Math.max(start.col, end.col);
      
          for (let row = startRow, col = startCol; row <= endRow && col <= endCol; row++, col++) {
            tempHighlightCells.push({ row, col });
          }
        } else if (start.row - end.row === end.col - start.col) {
          
          const startRow = Math.max(start.row, end.row);
          const endRow = Math.min(start.row, end.row);
          const startCol = Math.min(start.col, end.col);
          const endCol = Math.max(start.col, end.col);
      
          for (let row = startRow, col = startCol; row >= endRow && col <= endCol; row--, col++) {
            tempHighlightCells.push({ row, col });
          }
        }
      }
      
        drawGrid(); 
      
        
        setTimeout(() => {
          tempHighlightCells = [];
          drawGrid(); 
        }, 500);
      }
  
      function placeWords(board, words) {
        const gridSize = board.length;
        const wordList = [...words];
        wordList.sort((a, b) => b.length - a.length);
      
        function canPlaceWordHorizontally(word, row, col) {
          if (col + word.length > gridSize) return false;
          for (let i = 0; i < word.length; i++) {
            const cell = board[row][col + i];
            if (cell !== '' && cell !== word[i]) {
              return false;
            }
          }
          return true;
        }
      
        function placeWordHorizontally(word, row, col) {
          for (let i = 0; i < word.length; i++) {
            board[row][col + i] = word[i];
          }
        }
      
        function canPlaceWordHorizontallyReverse(word, row, col) {
          if (col - word.length < -1) return false;
          for (let i = 0; i < word.length; i++) {
            const cell = board[row][col - i];
            if (cell !== '' && cell !== word[i]) {
              return false;
            }
          }
          return true;
        }
      
        function placeWordHorizontallyReverse(word, row, col) {
          for (let i = 0; i < word.length; i++) {
            board[row][col - i] = word[i];
          }
        }
      
        function canPlaceWordVertically(word, row, col) {
          if (row + word.length > gridSize) return false;
          for (let i = 0; i < word.length; i++) {
            const cell = board[row + i][col];
            if (cell !== '' && cell !== word[i]) {
              return false;
            }
          }
          return true;
        }
      
        function placeWordVertically(word, row, col) {
          for (let i = 0; i < word.length; i++) {
            board[row + i][col] = word[i];
          }
        }
      
        function canPlaceWordVerticallyReverse(word, row, col) {
          if (row - word.length < -1) return false;
          for (let i = 0; i < word.length; i++) {
            const cell = board[row - i][col];
            if (cell !== '' && cell !== word[i]) {
              return false;
            }
          }
          return true;
        }
      
        function placeWordVerticallyReverse(word, row, col) {
          for (let i = 0; i < word.length; i++) {
            board[row - i][col] = word[i];
          }
        }
      
        function canPlaceWordDiagonally(word, row, col) {
          if (row - word.length < -1 || col + word.length > gridSize) return false;
          for (let i = 0; i < word.length; i++) {
            const cell = board[row - i][col + i];
            if (cell !== '' && cell !== word[i]) {
              return false;
            }
          }
          return true;
        }
      
        function placeWordDiagonally(word, row, col) {
          for (let i = 0; i < word.length; i++) {
            board[row - i][col + i] = word[i];
          }
        }
      
        function canPlaceWordDiagonallyReverse(word, row, col) {
          if (row + word.length > gridSize || col - word.length < -1) return false;
          for (let i = 0; i < word.length; i++) {
            const cell = board[row + i][col - i];
            if (cell !== '' && cell !== word[i]) {
              return false;
            }
          }
          return true;
        }
      
        function placeWordDiagonallyReverse(word, row, col) {
          for (let i = 0; i < word.length; i++) {
            board[row + i][col - i] = word[i];
          }
        }
      
        function canPlaceWordDiagonallyDown(word, row, col) {
          if (row + word.length > gridSize || col + word.length > gridSize) return false;
          for (let i = 0; i < word.length; i++) {
            const cell = board[row + i][col + i];
            if (cell !== '' && cell !== word[i]) {
              return false;
            }
          }
          return true;
        }
      
        function placeWordDiagonallyDown(word, row, col) {
          for (let i = 0; i < word.length; i++) {
            board[row + i][col + i] = word[i];
          }
        }
      
        function canPlaceWordDiagonallyDownReverse(word, row, col) {
          if (row - word.length < -1 || col - word.length < -1) return false;
          for (let i = 0; i < word.length; i++) {
            const cell = board[row - i][col - i];
            if (cell !== '' && cell !== word[i]) {
              return false;
            }
          }
          return true;
        }
      
        function placeWordDiagonallyDownReverse(word, row, col) {
          for (let i = 0; i < word.length; i++) {
            board[row - i][col - i] = word[i];
          }
        }
      
        function removeWord(word, positions) {
          for (const [row, col] of positions) {
            board[row][col] = '';
          }
        }
      
        function tryPlaceWord(word) {
          const directions = [
            { canPlace: canPlaceWordHorizontally, place: placeWordHorizontally },
            { canPlace: canPlaceWordHorizontallyReverse, place: placeWordHorizontallyReverse },
            { canPlace: canPlaceWordVertically, place: placeWordVertically },
            { canPlace: canPlaceWordVerticallyReverse, place: placeWordVerticallyReverse },
            { canPlace: canPlaceWordDiagonallyDown, place: placeWordDiagonallyDown },
            { canPlace: canPlaceWordDiagonallyDownReverse, place: placeWordDiagonallyDownReverse },
            { canPlace: canPlaceWordDiagonally, place: placeWordDiagonally },
            { canPlace: canPlaceWordDiagonallyReverse, place: placeWordDiagonallyReverse },
          ];
      
          directions.sort(() => Math.random() - 0.5); // Randomize directions
      
          for (const { canPlace, place } of directions) {
            for (let attempts = 0; attempts < 10; attempts++) {
              const row = Math.floor(Math.random() * gridSize);
              const col = Math.floor(Math.random() * gridSize);
              if (canPlace(word, row, col)) {
                const positions = [];
                for (let i = 0; i < word.length; i++) {
                  if (canPlace === canPlaceWordHorizontally || canPlace === canPlaceWordHorizontallyReverse) {
                    positions.push([row, col + (canPlace === canPlaceWordHorizontally ? i : -i)]);
                  } else if (canPlace === canPlaceWordVertically || canPlace === canPlaceWordVerticallyReverse) {
                    positions.push([row + (canPlace === canPlaceWordVertically ? i : -i), col]);
                  } else if (canPlace === canPlaceWordDiagonallyDown || canPlace === canPlaceWordDiagonallyDownReverse) {
                    positions.push([row + (canPlace === canPlaceWordDiagonallyDown ? i : -i), col + (canPlace === canPlaceWordDiagonallyDown ? i : -i)]);
                  } else {
                    positions.push([row + (canPlace === canPlaceWordDiagonally ? -i : i), col + (canPlace === canPlaceWordDiagonally ? i : -i)]);
                  }
                }
                place(word, row, col);
                return positions;
              }
            }
          }
          return null;
        }
      
        function backtracking(index) {
          if (index === wordList.length) {
            return true;
          }
          const word = wordList[index];
          const positions = tryPlaceWord(word);
          if (positions) {
            if (backtracking(index + 1)) {
              return true;
            }
            removeWord(word, positions);
          }
          return false;
        }
      
        backtracking(0);
      }
      
  
    function fillEmptySquares(board) {
      const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      for (let row = 0; row < gridSize; row++) {
        for (let col = 0; col < gridSize; col++) {
          if (board[row][col] === '') {
            const randomLetter = alphabet[Math.floor(Math.random() * alphabet.length)];
            board[row][col] = randomLetter;
          }
        }
      }
    }
  
    function drawGrid() {
      context.clearRect(0, 0, canvas.width, canvas.height); 
      context.strokeStyle = '#000';
      context.fillStyle = '#000'; 
      context.fillRect(0, 0, canvas.width, canvas.height); 
      context.font = 'bold 20px Arial';
      context.textAlign = 'center';
      context.textBaseline = 'middle';
      
      context.fillStyle = 'rgba(0, 255, 0, 0.25)'; 
      for (const { row, col } of highlightedCells) {
        context.fillRect(col * cellSize, row * cellSize, cellSize, cellSize);
      }
  
      
      context.fillStyle = 'rgba(255, 0, 0, 1)'; 
      for (const { row, col } of tempHighlightCells) {
        context.fillRect(col * cellSize, row * cellSize, cellSize, cellSize);
      }
  
      
      context.fillStyle = 'rgba(0, 255, 0, 0.5)'; 
      for (const { row, col } of selectedCells) {
        context.fillRect(col * cellSize, row * cellSize, cellSize, cellSize);
      }
 
      
      for (let row = 0; row < gridSize; row++) {
        for (let col = 0; col < gridSize; col++) {
          const letter = board[row][col];
          const x = col * cellSize + cellSize / 2;
          const y = row * cellSize + cellSize / 2;
  
          context.fillStyle = '#fff'; 
          context.fillText(letter, x, y);
        }
      }
  
      
      for (let i = 0; i <= gridSize; i++) {
        
        context.beginPath();
        context.moveTo(i * cellSize, 0);
        context.lineTo(i * cellSize, canvas.height);
        context.stroke();
  
        
        context.beginPath();
        context.moveTo(0, i * cellSize);
        context.lineTo(canvas.width, i * cellSize);
        context.stroke();
      }
    }
    function clearCell(cell) {
        const index = selectedCells.findIndex(c => c.row === cell.row && c.col === cell.col);
        if (index !== -1) {
          selectedCells.splice(index, 1);
          drawGrid(); 
        }
      }

      canvas.addEventListener('mousemove', handleMouseMove);
canvas.addEventListener('mouseleave', handleMouseLeave);


function handleMouseMove(event) {
  if(isRunning){
  const rect = canvas.getBoundingClientRect();
  const mouseX = event.clientX - rect.left;
  const mouseY = event.clientY - rect.top;

  const cellSize = canvas.width / gridSize;

  
  const row = Math.floor(mouseY / cellSize);
  const col = Math.floor(mouseX / cellSize);

  
  clearCanvas();
  drawGrid();

  
  context.fillStyle = 'rgba(0, 255, 0, 0.15)';
  context.fillRect(col * cellSize, row * cellSize, cellSize, cellSize);
}
}


function handleMouseLeave() {
  
  clearCanvas();
  drawGrid();
}

function clearCanvas() {
    context.clearRect(0, 0, canvas.width, canvas.height);
  }

  
  function renderWordList() {
    const wordListContainer = document.getElementById('wordList');
    wordListContainer.innerHTML = ''; 
  
    
    const row = document.createElement('div');
    row.classList.add('row');
    wordListContainer.appendChild(row);
  
    
    const numColumns = Math.min(4, Math.ceil(words.length / 4));
  
    
    const wordsPerColumn = Math.ceil(words.length / numColumns);
  
    
    for (let i = 0; i < numColumns; i++) {
      
      const col = document.createElement('div');
      col.classList.add('col-md');
      row.appendChild(col);
  
      
      for (let j = i * wordsPerColumn; j < (i + 1) * wordsPerColumn && j < words.length; j++) {
        const word = words[j];
        const listItem = document.createElement('a');
        listItem.href = '#';
        listItem.id = `clue-${word}`
        listItem.classList.add('list-group-item', 'list-group-item-action');
        listItem.textContent = word;
        listItem.style.border = "none"
        listItem.style.padding="0px"
        listItem.style.margin="0px"

        col.appendChild(listItem);
      }
    }
  }
  renderWordList();
     
  
  function checkWinCondition() {
    
    for (const word of words) {
      
      const foundWordItem = document.querySelector(`#clue-${word}`);
      
      
      if (!foundWordItem || !foundWordItem.classList.contains('found-word')) {
        return false;
      }
    }
    
    
    clearInterval(timer);
    return true;
  }


  let timer;
  let seconds = 0;
  let minutes = 0;
  let isRunning = false;
  let points = 0;

  function updateTimer() {
      seconds++;
      if (seconds === 60) {
          seconds = 0;
          minutes++;
      }
  
      let formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
      let formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  
      document.getElementById('timer').innerText = `${formattedMinutes}:${formattedSeconds}`;
  }
  
  function startTimer() {
      timer = setInterval(updateTimer, 1000);
  }
  
  function stopTimer() {
      clearInterval(timer);
  }
  
  function toggleGame() {
      const startButton = document.getElementById('startButton');
      
      if (isRunning) {
          stopTimer();
          startButton.innerText = 'Start Game';
          startButton.classList.remove('btn-danger');
          startButton.classList.add('btn-success');
      } else {
          startTimer();
          startButton.innerText = 'Stop Game';
          startButton.classList.remove('btn-success');
          startButton.classList.add('btn-danger');
      }
      
      isRunning = !isRunning;
  }
  
  function checkWinCondition() {
      
      for (const word of words) {
          
          const foundWordItem = document.querySelector(`#clue-${word}`);
          
          
          if (!foundWordItem || !foundWordItem.classList.contains('found-word')) {
              return false;
          }
      }
      
      
      clearInterval(timer);
      return true;
  }
  
  document.getElementById('startButton').addEventListener('click', toggleGame);

  function getPointsForAttempt() {
    if (minutes < 1) return 10;
    if (minutes < 2) return 5;
    if (minutes < 3) return 3;
    if (minutes < 4) return 2;
    return 1;
}

function getPointsForCompletion() {
    if (minutes < 1) return 50;
    if (minutes < 2) return 25;
    if (minutes < 3) return 10;
    if (minutes < 4) return 5;
    return 5;
}

function updatePoints(pointsToAdd) {
    points += pointsToAdd;
    document.getElementById('points').innerText = points;
}

  });
    