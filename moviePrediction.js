var readline = require('readline');
const readline_object = readline.createInterface({
  input: process.stdin,
});

/*******
 * Read input from STDIN
 * Use: console.log()  to output your result.
 * Use: console.error() to output debug information into STDERR
 * ***/

 var input = [];

 readline_object.on("line", (value) => { //Read input values
     input.push(value);
 })
 //Call ContestResponse when all inputs are read
 readline_object.on("close", ContestResponse); 
 
 
 function ContestResponse(){
	function convertStrToIntArray (inputLine) {
	    return inputLine.split(' ').map(item => parseInt(item))
	}
	
	let myNotes = convertStrToIntArray(input[0])
    let myFriendsNb = parseInt(input[1])
    let myBestFriendsNb = parseInt(input[2])
    let firstFriendLineIndex = 3
    const sumReducer = (accumulator, currentValue) => accumulator + currentValue
    
    
	function getNotesDifference (friendNotesLine) {
	    
	    let friendNotes = convertStrToIntArray(friendNotesLine)
	   
	    let notesDifferences = myNotes.map((myNote, index) => {
	        return Math.abs(myNote - friendNotes[index])
	    })
	    
	    return notesDifferences.reduce(sumReducer)
	  
	}
	
	function getAllFriendsNotes () {
	    let allNotesDiff = []
	   
	    for (let i=0; i<myFriendsNb; i++) {
            let friendRankings = convertStrToIntArray(input[i + firstFriendLineIndex])
	        allNotesDiff.push(
	            {
	                friendId: i,
	                notesDiff: getNotesDifference(input[i + firstFriendLineIndex]),
	                notes: friendRankings,
                    lastMovieNote: friendRankings[friendRankings.length - 1]
	            })
	    }
	   return allNotesDiff
	}
	
	function getBestFriends() {
	    let bestFriendsNotes = [] 
	    bestFriendsNotes = getAllFriendsNotes().sort((a, b) => a.notesDiff - b.notesDiff)
	    return bestFriendsNotes.slice(0, myBestFriendsNb)
	    
	}
	
	function getLastMoviePredictionNote () {
	    let notesSum = getBestFriends().reduce((accumulator, currentValue) => { return accumulator + currentValue.lastMovieNote }, 0)
	    return Math.floor(notesSum / myBestFriendsNb)
	}
	
    console.log(getLastMoviePredictionNote())
}