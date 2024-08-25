

//Component that represent each square
function Square({ className, value, onSquareClick }) {
    return (
      <button className={className} onClick={onSquareClick}>
        {value}
      </button>
    );
  }
  
  //Component that represent the group of nine squares 
  function Board({ xIsNext, squares, onPlay, onRestart}) {
    //States to chanche the class of each square
    const[isThereWinner0, setIsThereWinner0] = React.useState(false);
    const[isThereWinner1, setIsThereWinner1] = React.useState(false);
    const[isThereWinner2, setIsThereWinner2] = React.useState(false);
    const[isThereWinner3, setIsThereWinner3] = React.useState(false);
    const[isThereWinner4, setIsThereWinner4] = React.useState(false);
    const[isThereWinner5, setIsThereWinner5] = React.useState(false);
    const[isThereWinner6, setIsThereWinner6] = React.useState(false);
    const[isThereWinner7, setIsThereWinner7] = React.useState(false);
    const[isThereWinner8, setIsThereWinner8] = React.useState(false);
    //Cloning the square array
    const nextSquares = squares.slice();
  
    //If restart is true, changes all the classes to the initial state
    React.useEffect(()=>{
      if(onRestart) {
        setIsThereWinner0(false);
        setIsThereWinner1(false);
        setIsThereWinner2(false);
        setIsThereWinner3(false);
        setIsThereWinner4(false);
        setIsThereWinner5(false);
        setIsThereWinner6(false);
        setIsThereWinner7(false);
        setIsThereWinner8(false);
      }
     }, squares)
  
     //Collection of classes states of each square
    const statesCollection = [    
      isThereWinner0, isThereWinner1, isThereWinner2, isThereWinner3, isThereWinner4, isThereWinner5, isThereWinner6, isThereWinner7, isThereWinner8
    ];
  
    //Manage click event on each square
    function handleClick(i) {
      //Return if there is no winner or if the square clicked is filled     
      if (calculateWinner(squares) || squares[i]) {
        return;
      } 
      //If there is no winner or the square is empty, its fill the nextSquares array
      if (xIsNext) {
        nextSquares[i] = 'X';
      } else {
        nextSquares[i] = 'O';
      }
      //Method on Game component to construct moves history and to notify a new player movent
      onPlay(nextSquares);
    }
    
    const winner = calculateWinner(squares);
    let status = null;

    winner ? (status = 'Ganador: ' + winner[0]) : (status = 'Siguiente jugador: ' + (xIsNext ? 'X' : 'O'));

    //End of the game
    winner ? null : nextSquares.includes(null) ? null : status = "Empate";
  
    React.useEffect(()=>{
      if (winner) {
        
        switch(winner[1][0]) {
          case 0:
            setIsThereWinner0(true);
            break;
          case 1:
            setIsThereWinner1(true);
            break;
          case 2:
            setIsThereWinner2(true);
            break;
          case 3:
            setIsThereWinner3(true);
            break;
          case 6:
            setIsThereWinner6(true);
            break;
        };
  
        switch(winner[1][1]) {
          case 1:
            setIsThereWinner1(true);
            break;
          case 3:
            setIsThereWinner3(true);
            break;
          case 4:
            setIsThereWinner4(true);
            break;
          case 5:
            setIsThereWinner5(true);
            break;
          case 7:
            setIsThereWinner7(true);
            break;
        };
  
        switch(winner[1][2]) {
          case 2:
            setIsThereWinner2(true);
            break;
          case 5:
            setIsThereWinner5(true);
            break;
          case 6:
            setIsThereWinner6(true);
            break;
          case 7:
            setIsThereWinner7(true);
            break;
          case 8:
            setIsThereWinner8(true);
            break;
        };   
  
      }  
    }, [squares]);
  
    //To group the squares inside a DIV per row
    let rowOfElements = [];
    for(let i = 0; i < 9; i+=3) {
      rowOfElements.push(
      <div className="board-row">
        <Square className={statesCollection[i] ? "square squareWinner" : "square"} key={i} value={squares[i]} onSquareClick={() => handleClick(i)} />
        <Square className={statesCollection[i + 1] ? "square squareWinner" : "square"} key={i + 1} value={squares[i + 1]} onSquareClick={() => handleClick(i + 1)} />
        <Square className={statesCollection[i + 2] ? "square squareWinner" : "square"} key={i + 2} value={squares[i + 2]} onSquareClick={() => handleClick(i + 2)} />
      </div>);
    }
  
    return (
      <>
        <div className="status">{status}</div>
        {rowOfElements.map(row => <>{row}</>)}
      </>
    );
  }
  
  //Main component
  function Game() {
    const [history, setHistory] = React.useState([Array(9).fill(null)]);
    const [currentMove, setCurrentMove] = React.useState(0);
    //To know when is the X turn. X is always the first to begin the game.
    const xIsNext = currentMove % 2 === 0;
    const currentSquares = history[currentMove];
    const restartValue = React.useRef(false);
    const restartColor = React.useRef(false);
  
    function handlePlay(nextSquares) {
      const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
      setHistory(nextHistory);
      setCurrentMove(nextHistory.length - 1);
    }
  
    function jumpTo(nextMove) {
      setCurrentMove(nextMove);
    }
  
    //Historical of game
    const moves = history.map((squares, move) => {
      let description;
      if (move > 0) {
        description = <>Ir hacia la jugada <span>#{move}</span></>;
        return (
          <li key={move}>
            <button className="game-info__historyButton" onClick={() => jumpTo(move)}>{description}</button>
          </li>
        );
      }
    });
  
    function onRestart() {
      jumpTo(0);
      restartValue.current = true;
      restartColor.current = true;
      setHistory([Array(9).fill(null)]);
    }
  
    return (
      <div className="game">
        <div className="game-board">
          <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} onRestart={restartValue.current} onHistoryClic = {restartColor.current} />
        </div>      
        <div className="game-info">
        <div><p>Estás en el movimiento: <span>{currentMove}</span></p></div>
        <button id="game-info__restart" onClick={()=>onRestart()}>INICIO</button>
          <ul>{moves}</ul>
        </div>
      </div>
    );
  }
  
  //To know how is the winner
  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        let winnerLetterAndPositions = [];
        winnerLetterAndPositions.push(squares[a], lines[i])
        return winnerLetterAndPositions;
      }
    }
    return null;
  }
  
  
  const container = document.getElementById('root');
  const root = ReactDOM.createRoot(container); // createRoot(container!) if you use TypeScript
  root.render(<Game />);