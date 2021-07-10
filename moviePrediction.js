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
	//implement your code here using input array
	
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



//  K = nombre de copains meilleurs / gouts similiaries aux notres sur les 5 premiers episodes
//  N = nombre de copains qui ont vus les 5 premiers episodes Rocky et le nouveau
// La distance entre vos goûts et ceux d'un copain donné est calculée comme suit :
// - pour chacun des 5 premiers Rocky, on regarde l'écart entre votre note et la note donnée par le copain en question (plus précisément, la valeur absolue de la différence) ;
// - on prend ensuite la somme des écarts pour les 5 épisodes.


// Les K meilleurs copains sont alors ceux dont les goûts sont à plus petite distance de vous. Pour vous épargner un terrible dilemme on vous garantit que le choix est unique, ainsi il ne peut pas y avoir deux K-ièmes plus proches copains ex æquo. Vous calculerez la moyenne de leurs notes pour le nouveau Rocky arrondie à l'entier inférieur : ceci vous donnera une prédiction de la note que vous risquez de mettre à cet épisode si vous le regardez.

// line 1 mes notes
// line 2 