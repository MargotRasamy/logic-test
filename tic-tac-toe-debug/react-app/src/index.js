import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {


  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true,
    };
  }


  handleClick(i) {
    const squares = this.state.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      squares: squares, 
      xIsNext: !this.state.xIsNext,
    });
  }

  renderSquare(i) {
    return <Square
        value={this.state.squares[i]}
        onClick={() => this.handleClick(i)}
        />;
  }

  render() {
    const winner = calculateWinner(this.state.squares);
    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    // Problem resolution here :
    // The person who coded the game forgot to give the condition for diagonnal wins.
    // Diagonnal wins refer to these cells :
    [0, 4, 8],
    [2, 4, 6]

    // I would also suggest the use of methods such as horizontalWins(), verticalWins() or diagonalWins() 
    // that I created below to get all the conditions like this :
    // ...horizontalWins(3,3)
    // ...verticalWins(3,3)
    // ...diagonalWins(3)
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

function horizontalWins (xAxisCells, yAxisCells) {
  let cells = []
  
  for (let i = 0; i< yAxisCells ; i++) {
  	cells.push([])
  	for (let j = i * xAxisCells; j < i * xAxisCells + xAxisCells ; j++) {
    	cells[i].push(j)
    }
  }
  
 return cells
}

function verticalWins (xAxisCells, yAxisCells) {
  let cells = []
  
  for (let i = 0; i< yAxisCells ; i++) {
    cells.push([])
    for (let j = i; j < i + (xAxisCells * xAxisCells) ; j+= xAxisCells) {
      cells[i].push(j)
    }
  }
  
 return cells
}

// For diagonals, we'll only have one argument as we need a square board to get the 2 diagonals.
function diagonalWins (dimensionCells) {
  let cells = [[],[]]
  
    for (let j = 0; j < dimensionCells * dimensionCells ; j += (dimensionCells + 1) ) {
      cells[0].push(j)
    }
    
    for (let j = dimensionCells - 1; j < (dimensionCells * dimensionCells) - (dimensionCells - 1) ; j += (dimensionCells - 1) ) {
      cells[1].push(j)
    }
  
 return cells
}



