import './styles.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

const commonWords = [
  "ability", "abroad", "accept", "access", "accident", "account", "achieve", "acquire", "action", "active",
  "activity", "actually", "add", "address", "admit", "adult", "advice", "affect", "afraid", "agency",
  "agent", "agree", "agreement", "air", "allow", "almost", "already", "also", "always", "amazing",
  "amount", "analysis", "animal", "another", "answer", "anyone", "anything", "appear", "apply", "approach",
  "area", "argue", "around", "arrive", "article", "artist", "assume", "attention", "attorney", "audience",
  "author", "available", "avoid", "baby", "back", "bank", "base", "beautiful", "because", "become",
  "before", "begin", "behavior", "behind", "believe", "benefit", "best", "better", "between", "beyond",
  "big", "bill", "billion", "black", "blood", "blue", "board", "body", "book", "born",
  "both", "break", "bring", "brother", "budget", "build", "building", "business", "call", "camera",
  "campaign", "cancer", "candidate", "capital", "care", "career", "carry", "case", "catch", "cause",
  "center", "central", "century", "certain", "certainly", "chair", "challenge", "chance", "change", "character",
  "charge", "check", "child", "choice", "choose", "church", "citizen", "city", "civil", "claim",
  "class", "clear", "clearly", "close", "coach", "cold", "collection", "college", "color", "come",
  "commercial", "common", "community", "company", "compare", "computer", "concern", "condition", "conference", "consider",
  "consumer", "contain", "continue", "control", "cost", "could", "country", "couple", "course", "court",
  "cover", "create", "crime", "cultural", "culture", "current", "customer", "dark", "data", "daughter",
  "dead", "deal", "death", "debate", "decade", "decide", "decision", "deep", "defense", "degree",
  "democrat", "describe", "design", "despite", "detail", "determine", "develop", "difference", "different", "difficult",
  "dinner", "direction", "director", "discover", "discuss", "disease", "doctor", "door", "down", "draw",
  "dream", "drive", "drop", "drug", "during", "each", "early", "economic", "economy", "education",
  "effect", "effort", "eight", "either", "election", "employee", "energy", "enjoy", "enough", "enter",
  "entire", "environment", "especially", "establish", "evening", "event", "every", "everybody", "everyone", "everything",
  "evidence", "example", "executive", "exist", "expect", "experience", "expert", "explain", "face", "fact",
  "factor", "fail", "fall", "family", "fast", "father", "federal", "feel", "feeling", "field",
  "fight", "figure", "final", "finally", "financial", "finish", "firm", "first", "floor", "focus",
  "follow", "food", "foot", "force", "foreign", "forget", "form", "former", "forward", "four",
  "free", "friend", "from", "front", "full", "fund", "future", "game", "garden", "gas",
  "general", "generation", "girl", "give", "glass", "goal", "good", "government", "great", "green",
  "ground", "group", "grow", "growth", "guess", "hair", "half", "hand", "hang", "happen",
  "happy", "hard", "health", "hear", "heart", "heavy", "help", "herself", "high", "history",
  "hold", "home", "hope", "hospital", "hotel", "house", "however", "huge", "human", "husband",
  "idea", "identify", "image", "imagine", "impact", "important", "improve", "include", "including", "increase",
  "indeed", "individual", "industry", "inside", "instead", "institution", "interest", "interesting", "international", "interview",
  "investment", "involve", "issue", "item", "itself", "join", "just", "keep", "kid", "kill",
  "kind", "kitchen", "know", "knowledge", "land", "language", "large", "last", "late", "later",
  "laugh", "lawyer", "lead", "leader", "learn", "least", "leave", "left", "legal", "less",
  "letter", "level", "life", "light", "like", "likely", "line", "list", "listen", "little",
  "live", "local", "long", "look", "lose", "loss", "love", "machine", "magazine", "main",
  "maintain", "major", "majority", "make", "manage", "management", "manager", "many", "market", "marriage",
  "material", "matter", "maybe", "mean", "measure", "media", "medical", "meeting", "member", "memory",
  "mention", "message", "method", "middle", "might", "military", "million", "mind", "minute", "miss",
  "model", "modern", "moment", "money", "month", "more", "morning", "most", "mother", "mouth",
  "move", "movement", "movie", "much", "music", "must", "name", "nation", "national", "natural",
  "nature", "near", "nearly", "necessary", "need", "network", "never", "newspaper", "night", "none",
  "north", "note", "nothing", "notice", "number", "occur", "officer", "official", "often", "once",
  "only", "onto", "open", "operation", "opportunity", "option", "order", "organization", "other", "others",
  "outside", "over", "owner", "page", "pain", "painting", "paper", "parent", "part", "partner",
  "party", "pass", "past", "patient", "pattern", "pay", "peace", "people", "perform", "performance",
  "perhaps", "period", "person", "personal", "phone", "physical", "pick", "picture", "piece", "place",
  "plan", "plant", "play", "player", "point", "police", "policy", "political", "politics", "poor",
  "popular", "population", "position", "positive", "possible", "power", "practice", "prepare", "present", "president",
  "pressure", "pretty", "prevent", "price", "private", "probably", "problem", "process", "produce", "product",
  "production", "professional", "professor", "program", "project", "property", "protect", "prove", "provide", "public",
  "purpose", "quality", "question", "quickly", "quite", "race", "radio", "raise", "range", "rate",
  "rather", "reach", "read", "ready", "real", "reality", "realize", "really", "reason", "receive",
  "recent", "recognize", "record", "reduce", "reflect", "region", "relate", "relationship", "religious", "remain",
  "remember", "remove", "report", "represent", "republican", "require", "research", "resource", "respond", "response",
  "result", "return", "reveal", "rich", "right", "risk", "road", "rock", "role", "room",
  "rule", "run", "safe", "same", "save", "school", "science", "scientist", "score", "season",
  "seat", "second", "section", "security", "see", "seek", "seem", "sell", "send", "senior",
  "sense", "series", "serious", "serve", "service", "set", "seven", "several", "sex", "sexual",
  "shake", "share", "shoot", "short", "shot", "should","shoulder", "show", "side", "sign", "significant", "similar", "simple", "simply", "since", "sing",
  "single", "sister", "situation", "skill", "skin", "small", "smile", "so", "social", "society",
  "soldier", "some", "somebody", "someone", "something", "sometimes", "son", "song", "soon", "sort",
  "sound", "south", "space", "speak", "special", "specific", "speech", "spend", "sport", "spring",
  "staff", "stage", "stand", "standard", "star", "start", "state", "statement", "station", "stay",
  "step", "still", "stock", "stop", "store", "story", "strategy", "street", "strong", "structure",
  "student", "study", "stuff", "style", "subject", "success", "successful", "such", "suddenly", "suffer",
  "suggest", "summer", "support", "sure", "surface", "system", "table", "take", "talk", "task",
  "tax", "teach", "teacher", "team", "technology", "television", "tell", "ten", "tend", "term",
  "test", "than", "thank", "that", "the", "their", "them", "themselves", "then", "theory",
  "there", "these", "they", "thing", "think", "third", "this", "those", "though", "thought",
  "thousand", "threat", "three", "through", "throughout", "throw", "thus", "time", "to", "today",
  "together", "tonight", "too", "top", "total", "tough", "toward", "town", "trade", "traditional",
  "training", "travel", "treat", "treatment", "tree", "trial", "trip", "trouble", "true", "truth",
  "try", "turn", "two", "type", "under", "understand", "unit", "until", "up", "upon",
  "us", "use", "usually", "value", "various", "very", "victim", "view", "violence", "visit",
  "voice", "vote", "wait", "walk", "wall", "want", "war", "watch", "water", "way",
  "we", "wear", "week", "weight", "well", "west", "western", "what", "whatever", "when",
  "where", "whether", "which", "while", "white", "who", "whole", "whom", "whose", "why",
  "wide", "wife", "will", "win", "wind", "window", "wish", "with", "within", "without",
  "woman", "wonder", "word", "work", "worker", "world", "worry", "would", "write", "writer",
  "wrong", "yard", "yeah", "year", "yes", "yet", "you", "young", "your", "yourself"
];
function getRandomWord() {
  const randomIndex = Math.floor(Math.random() * commonWords.length);
  return commonWords[randomIndex];
}


document.addEventListener('DOMContentLoaded', async function () {
  // Declare all variables at the top
  let randomWord = getRandomWord();
  let words = [];
  let canvas, context, gridSize, cellSize;
  let firstClick = null;
  let secondClick = null;
  let highlightedCells = [];
  let selectedCells = [];
  let tempHighlightCells = [];
  let foundWords = [];
  let timer, seconds = 0, minutes = 0, isRunning = false, points = 0;
  const instructionsDiv = document.getElementById('instructions');
  const wordListDiv = document.getElementById('wordList');
  let gameStarted = false;

  let title = document.getElementById('game-title');
  title.textContent = 'WORDS RELATED TO: ' + randomWord.toUpperCase();

  // Fetch related words
  try {
    const response = await fetch(`https://api.datamuse.com/words?rel_trg=${randomWord}`);
    if (response.ok) {
      const data = await response.json();
      words = data.filter(word => word.word.length >= 4 && word.word.length <= 7)
                  .slice(0, 16)
                  .map(word => word.word.toUpperCase());
      if (words.length < 16) {
        window.location.reload();
      }
    } else {
      throw new Error('Failed to fetch related words');
    }
  } catch (error) {
    console.error(error);
    return; // Stop execution if there is an error
  }

  // Fetch definitions for all words
  const definitions = {};
  for (let word of words) {
    const definition = await fetchDefinitions(word);
    definitions[word] = definition;
  }

  // Render word list with definitions
  renderWordListWithDefinitions(definitions);

  // Setup canvas and game board
  canvas = document.getElementById('gameCanvas');
  context = canvas.getContext('2d');
  canvas.style.cursor = 'pointer';
  gridSize = 12;
  cellSize = canvas.width / gridSize;

  // Setup board
  const board = Array.from({ length: gridSize }, () => Array.from({ length: gridSize }, () => ''));
  placeWords(board, words);
  fillEmptySquares(board);
  drawGrid();

  canvas.addEventListener('click', handleClick);
  canvas.addEventListener('mousemove', handleMouseMove);
  canvas.addEventListener('mouseleave', handleMouseLeave);
  document.getElementById('startButton').addEventListener('click', toggleGame);

  async function fetchDefinitions(word) {
    try {
      const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
  
      if (Array.isArray(data) && data.length > 0) {
        const definitions = [];
        // Loop through all meanings and their definitions
        data[0].meanings.forEach(meaning => {
          meaning.definitions.forEach(definition => {
            definitions.push(definition.definition);
          });
        });
  
        return definitions.length > 0 ? definitions : [`No definitions found for this word, so it's a gimme: ${word}`];
      } else {
        return [`No definitions found for this word, so it's a gimme: ${word}`];
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      return [`No definition found for this word, so it's a gimme: ${word}`];
    }
  }
// Render the word list with longest definitions as an ordered list
async function renderWordListWithDefinitions(definitions) {
  const wordListContainer = document.getElementById('wordList');
  wordListContainer.innerHTML = ''; // Clear existing content

  const ol = document.createElement('ol');
  ol.setAttribute('type', '1');
  ol.style.color = "#fff";
  ol.style.backgroundColor = "#000";

  wordListContainer.appendChild(ol);

  for (let word of Object.keys(definitions)) {
    const definitionList = definitions[word]; // Get all definitions for each word

    const li = document.createElement('li');
    li.style.border = "none";
    li.style.padding = "5px";
    li.style.margin = "5px";

    const contentElement = document.createElement('span');
    contentElement.dataset.word = word; // Store the word in a data attribute

    // Create a nested unordered list for definitions
    const ul = document.createElement('ul');
    definitionList.forEach(definition => {
      const defLi = document.createElement('li');
      defLi.textContent = definition;
      ul.appendChild(defLi);
    });

    // Initially show the definition
    contentElement.appendChild(ul);

    // Event listener to reveal the word on click
    const revealWord = () => {
      if (isRunning) {
        contentElement.textContent = `${word}: Five points deducted for getting a hint!`; // Show the word
        li.removeEventListener('click', revealWord); // Remove the event listener

        // Deduct points and update display
        updatePoints(-5);
        console.log('Lost 5 points for using a hint');
      }
    };

    // Attach event listener to the list item
    li.addEventListener('click', revealWord);

    li.appendChild(contentElement);
    ol.appendChild(li);
  }
}

  // Handle canvas click event
  function handleClick(event) {
    if (isRunning) {
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
        clearCell(secondClick);
        secondClick = { row, col };
        highlightCell(secondClick);
        attemptSelection();
      }
    }
  }

  // Attempt selection and handle word finding logic
  function attemptSelection() {
    if (!firstClick || !secondClick) return;

    const word = getWordFromSelection(firstClick, secondClick);

    if (words.includes(word)) {
      if (!foundWords.includes(word)) {
        highlightWord(firstClick, secondClick);

        const foundWordItem = document.querySelector(`span[data-word="${word}"]`);
        if (foundWordItem) {
          foundWordItem.textContent = word;
          foundWordItem.classList.add('found-word');
          updatePoints(getPointsForAttempt());
        }

        foundWords.push(word);
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

  // Update points based on correct selection
  function updatePoints(pointsToAdd) {
    points += pointsToAdd;
    document.getElementById('points').innerText = points;
  }

  // Get the word from the selected cells
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

  // Highlight the word on the board
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

  // Highlight a cell on the board
  function highlightCell(cell) {
    if (cell) {
      selectedCells.push(cell);
      drawGrid();
    }
  }

  // Temporarily highlight cells for incorrect selection
  function temporaryHighlight(start, end) {
    if (isRunning) {
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

      drawGrid();

      setTimeout(() => {
        tempHighlightCells = [];
        drawGrid();
      }, 500);
    }
  }

  // Place words on the board
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

  // Fill empty squares with random letters
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

  // Draw the grid on the canvas
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

  // Clear a cell's highlight
  function clearCell(cell) {
    const index = selectedCells.findIndex(c => c.row === cell.row && c.col === cell.col);
    if (index !== -1) {
      selectedCells.splice(index, 1);
      drawGrid();
    }
  }

  // Handle mouse move event over the canvas
  function handleMouseMove(event) {
    if (isRunning) {
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

  // Handle mouse leave event from the canvas
  function handleMouseLeave() {
    clearCanvas();
    drawGrid();
  }

  // Clear the entire canvas
  function clearCanvas() {
    context.clearRect(0, 0, canvas.width, canvas.height);
  }

  // Check if all words are found
  function checkWinCondition() {
    for (const word of words) {
      const foundWordItem = document.querySelector(`span[data-word="${word}"]`);
      if (!foundWordItem || !foundWordItem.classList.contains('found-word')) {
        return false;
      }
    }
    clearInterval(timer);
    return true;
  }

  // Update the timer
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

  // Start the timer
  function startTimer() {
    timer = setInterval(updateTimer, 1000);
  }

  // Stop the timer
  function stopTimer() {
    clearInterval(timer);
  }

  // Toggle the game state
  function toggleGame() {
    const startButton = document.getElementById('startButton');
    
    if (isRunning) {
      stopTimer();
      startButton.innerText = 'Start Game';
      startButton.classList.remove('btn-danger');
      startButton.classList.add('btn-success');
    } else {
      startTimer();
      if(gameStarted === false){
      instructionsDiv.style.display = 'none';
      wordListDiv.style.display = 'block';
      gameStarted = true;
     }
      startButton.innerText = 'Stop Game';
      startButton.classList.remove('btn-success');
      startButton.classList.add('btn-danger');
    }
    isRunning = !isRunning;
  }

  // Get points for a correct attempt
  function getPointsForAttempt() {
    if (minutes < 1) return 10;
    if (minutes < 2) return 5;
    if (minutes < 3) return 3;
    if (minutes < 4) return 2;
    return 1;
  }

  // Get points for completing the game
  function getPointsForCompletion() {
    if (minutes < 1) return 50;
    if (minutes < 2) return 25;
    if (minutes < 3) return 10;
    if (minutes < 4) return 5;
    return 5;
  }
  console.log(words)
});
