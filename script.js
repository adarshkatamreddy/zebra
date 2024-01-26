// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyCpUDfKEeyAMILqkuuxUzCHGrMTZaRUsGE",
    authDomain: "zebra-random-number.firebaseapp.com",
    databaseURL: "https://zebra-random-number-default-rtdb.firebaseio.com",
    projectId: "zebra-random-number",
    storageBucket: "zebra-random-number.appspot.com",
    messagingSenderId: "904013490719",
    appId: "1:904013490719:web:9481a20d5ce0704423032a",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var database = firebase.database();

document.getElementById('generate').addEventListener('click', function() {
    var availableNumbersRef = database.ref('availableNumbers');
    availableNumbersRef.transaction(function(availableNumbers) {
        if (availableNumbers) {
            var index = Math.floor(Math.random() * availableNumbers.length);
            var number = availableNumbers[index];
            availableNumbers.splice(index, 1); // Remove the number from the array
            document.getElementById('numberDisplay').innerText = "Generated Number: " + number;
            return availableNumbers; // Update the database
        } else {
            return []; // Initialize the array if it's not set
        }
    });
});
