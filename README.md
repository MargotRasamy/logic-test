# Movies prediction
Movies prediction according to your best friends'rankings of a movie.

## To try the project :

#### 1. Download and install Node.js on your machine
Install Node.js : https://nodejs.org/en/download/ 

#### 2. Clone the project

* With SSH : 
```console
git clone git@github.com:MargotRasamy/logic-test.git
```

* With https : 
```console
git clone https://github.com/MargotRasamy/logic-test.git
```

#### 3. Try predictions with the data file

Enter the cloned directory in your terminal : 

```console
cd logic-test
```

* On a mac or linux : 

```console
node moviePrediction.js < data.txt
```

* On a windows : 

```console
Get-Content data.txt | node moviePrediction.js
```

#### 4. Try predictions with other inputs

If you want to try the movie predictions according to your best friends'taste and rankings, edit the *data.txt* file or create another file and enter informations with the following rule :

* First line : Your own rankings of an x amount of movies you have watched from 0 to 10 included and separated by spaces

* Second line : The number of friends of yours who have watched those movies and who have also watched the movie you want to predict your future ranking of.

* 3rd line : The number of best friends you have out of all your friends

* 4th to N line : Each of your friend's rankings of the movies you have watched followed by the next movie you want to watch from 0 to 10 included and separated by spaces

Here's an example of the type of input to enter in the data file :

```console
10 7 3 4 3
4
2
9 4 7 2 1 1
2 1 3 2 10 5
9 10 10 9 10 10
8 9 2 4 3 4
```


# Debug exercise

In the tic-tac-toe-debug folder, you can find the tic-tac-toe I debugged.

The main issue with the given Tic-tac-toe game was that it wasn't fully functionnal as the game couldn't handle diagonal winners.

#### To run the debugged tic-tac-toe game

Enter the directory in your terminal : 

```console
cd logic-test/tic-tac-toe-debug/react-app
```

Install the dependencies : 

```console
npm install
```

Run the game :

```console
npm start
```

#### 1. First step of problem solving : Reproduce the bug and see what happens

* First step of debugging for me was to test the game by running it and trying to reproduce the problem mentionned by the person who found the bug.
To achieve this first step, I execute the game and try to get a diagonal winner.

![Step 1](https://user-images.githubusercontent.com/47738956/125207559-445ace80-e28d-11eb-9518-b02b5674faa5.png)
![Step 1 bis](https://user-images.githubusercontent.com/47738956/125207561-47ee5580-e28d-11eb-9988-4affd7f33ef5.png)

First thing I see is that when I get a diagonal winner, the game doesn't inform me there is a winner and which one it is, unlike when I try to get a horizontal or vertical win.

* So what do I see ?
The text "Winner : X" is not displayed as expected ! So first possible hypothesis I can make is the following :

*There might be something wrong with the conditions to display the winner.*

#### 2. Second step of problem solving : Retrieve the block of code that has a bug

* According to the previous step, the bug probably has something to do with the conditions of display of the winner.
I look up for the piece of code where we display the winner :

```console
render() {
    const winner = calculateWinner(this.state.squares);
    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }
...
}
```

And I can see that in the render function, we check the condition with the variable winner that points to a function called calculateWinner().
If calculateWinner() returns true, the status used to display the game status gives the game winner.
So if the winner is not displayed, the issue can only be in the winner condition. Therefore, let's take a loot at the calculateWinner() function.

* Analyze the block of code that contains the issue

```console
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
```

Let's break down the code of this function. 

The function calculateWinner() takes an item called squares as an argument and in this game, squares will refer to this.state.squares.
This.state.squares is an array filled with null elements and has the length equal to the size of the board. 
In tic-tac-toe, we have a 3 x 3 board game. Therefore, this.state.squares is our board with a length of 9.
We can see that in the state inside the constructor :

```console
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
```

When a player chooses a cell, his name is written inside the cell. In this game, it's either 'X' or 'O'.
So, back to the calculateWinner() function :

We have 2 main things going on in this function :
- First, we declare an array called *lines* that contains multiple arrays of int elements.
- Second, we have a for loop that iterates over the *lines* array. Inside this loop, we are destructuring each int element inside each arrays of the *lines* array as variables called a, b and c. 
Then, we check if squares[a] && squares[a] === squares[b] && squares[a] === squares[c], which therefore gives us the information whether our tic tac toe board is filled with the same player name ('X' or 'O') for the cells at positions a, b and c following the *lines* array. If this condition is true, we return the player name written in the cell squares[a]. Otherwise, we'll return a null.
Obviously, we can check by using console.log() during the whole debugging process.

We can conclude that our *lines* array contains arrays of conditions to win the Tic tac toe game with in each array, we have the combination of the cells a player need to play to win.

By the time we have come to this conclusion, we can now fix our issue by simply checking if the combination of cells to get a diagonal are present in *lines*.

```console
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
  ];
```

It seems we only have 6 combinations for both horizontal and vertical winning. We are indeed missing the diagonal winning combination !
We can finally proceed to solve our problem by adding the combinations [0, 4, 8] and [2, 4, 6] to get our diagonal winner !

```console
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
  ];
```

We finally debugged our game ! We can try playing it now !

![Debug 1](https://user-images.githubusercontent.com/47738956/125207746-41aca900-e28e-11eb-95ab-ad042d77536f.png)
![Debug 2](https://user-images.githubusercontent.com/47738956/125207750-45403000-e28e-11eb-8e34-9d25a1f5a7ee.png)

PS: For this issue, it was a comportemental bug, which means we were missing something in terms of what we want our code to do.
But usually, if we are trying to debug something that causes an error, the best thing to do is to analyze the error and again, 
reproduce the steps triggered the error and use console.log() to check every possible elements that may cause the problem.
