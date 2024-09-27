// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyCpUDfKEeyAMILqkuuxUzCHGrMTZaRUsGE",
    authDomain: "zebra-random-number.firebaseapp.com",
    databaseURL: "https://zebra-random-number-default-rtdb.firebaseio.com",
    projectId: "zebra-random-number",
    storageBucket: "zebra-random-number.appspot.com",
    messagingSenderId: "904013490719",
    appId: "1:904013490719:web:9481a20d5ce0704423032a"
};
firebase.initializeApp(firebaseConfig);
var database = firebase.database();

document.getElementById('generate').addEventListener('click', function() {
    var generatedNumbersRef = database.ref('generatedNumbers');

    generatedNumbersRef.once('value').then(function(snapshot) {
        var generatedNumbers = snapshot.val() || [];
        const totalNumbers = 220;

        // Check if all numbers have been generated
        if (generatedNumbers.length >= totalNumbers) {
            document.getElementById('numberDisplay').innerText = "All numbers have been generated.";
            return;
        }

        var newNumber;
        do {
            newNumber = Math.floor(Math.random() * totalNumbers) + 1;
        } while (generatedNumbers.includes(newNumber));

        generatedNumbers.push(newNumber);
        
        document.getElementById('numberDisplay').innerText = "Subject ID: " + newNumber;
        var message = newNumber % 2 === 0 ? "Randomised to 4 hour bedrest" : "Randomised to 1 hour bedrest";
        document.getElementById('messageDisplay').innerText = message;
        
        generatedNumbersRef.set(generatedNumbers); // Update the list of generated numbers
    });
});
