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

*First line : Your own rankings of an x amount of movies you have watched from 0 to 10 included and separated by spaces
*Second line : The number of friends of yours who have watched those movies and who have also watched the movie you want to predict your future ranking of.
*3rd line : The number of best friends you have out of all your friends
*4th to N line : Each of your friend's rankings of the movies you have watched followed by the next movie you want to watch from 0 to 10 included and separated by spaces

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
