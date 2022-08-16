const playerCreator = (name, sign) => {
  return { name, sign };
};

const gameBoard = (() => {
  let board = [];

  board = [
    [" ", " ", " "],
    [" ", " ", " "],
    [" ", " ", " "],
  ];

  let isGameOver = false;

  const playerO = playerCreator("Player 1", "O");
  const playerX = playerCreator("Player 2", "X");
  let currPlayer = playerO;

  // text selectors
  let referee = document.querySelector(".referee");
  let player = document.querySelector(".player");

  const gameOver = () => {
    isGameOver = true;
    referee.innerHTML = "Game over.";
  };

  const checkWinner = () => {
    // horizontally, check 3 rows
    for (let r = 0; r < 3; r++) {
      if (
        board[r][0] == board[r][1] &&
        board[r][1] == board[r][2] &&
        board[r][0] != " "
      ) {
        // if we found the winning row
        // apply the winner style to that row
        for (let i = 0; i < 3; i++) {
          let tile = document.getElementById(r.toString() + "-" + i.toString());
          tile.classList.add("winner");
        }
        gameOver();
        return;
      }
    }

    // vertically, check 3 columns
    for (let c = 0; c < 3; c++) {
      if (
        board[0][c] == board[1][c] &&
        board[1][c] == board[2][c] &&
        board[0][c] != " "
      ) {
        // if we found the winning col
        // apply the winner style to that col
        for (let i = 0; i < 3; i++) {
          let tile = document.getElementById(i.toString() + "-" + c.toString());
          tile.classList.add("winner");
        }
        gameOver();
        return;
      }
    }

    // diagonally
    if (
      board[0][0] == board[1][1] &&
      board[1][1] == board[2][2] &&
      board[0][0] != " "
    ) {
      for (let i = 0; i < 3; i++) {
        let tile = document.getElementById(i.toString() + "-" + i.toString());
        tile.classList.add("winner");
      }
      gameOver();
      return;
    }

    // cross-diagonally
    if (
      board[0][2] == board[1][1] &&
      board[1][1] == board[2][0] &&
      board[0][2] != " "
    ) {
      // 0-2
      let tile = document.getElementById("0-2");
      tile.classList.add("winner");

      // 1-1
      tile = document.getElementById("1-1");
      tile.classList.add("winner");

      // 2-0
      tile = document.getElementById("2-0");
      tile.classList.add("winner");
      gameOver();
      return;
    }
  };

  function setTile() {
    if (isGameOver) {
      return;
    }

    let coords = this.id.split("-"); // "1-2" -> ["1", "2"]
    let r = parseInt(coords[0]);
    let c = parseInt(coords[1]);

    // if already taken
    if (board[r][c] != " ") {
      return;
    }

    board[r][c] = currPlayer.sign; // mark the board array
    this.innerText = currPlayer.sign; // mark the board on html

    const switchCurrPlayer = () => {
      if (currPlayer == playerO) {
        currPlayer = playerX;
        player.innerHTML = "Player 2";
      } else {
        currPlayer = playerO;
        player.innerHTML = "Player 1";
      }
    };

    switchCurrPlayer();
    checkWinner();
  }

  const drawBoard = (() => {
    for (let r = 0; r < 3; r++) {
      for (let c = 0; c < 3; c++) {
        let tile = document.createElement("div");
        tile.id = r.toString() + "-" + c.toString();
        tile.classList.add("tile");
        if (r == 0 || r == 1) {
          tile.classList.add("horizontal");
        }
        if (c == 0 || c == 1) {
          tile.classList.add("vertical");
        }
        tile.innerText = "";
        tile.addEventListener("click", setTile);
        document.getElementById("gameboard").appendChild(tile);
      }
    }
  })();

  return { board };
})();
