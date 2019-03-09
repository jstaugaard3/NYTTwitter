//


  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDXpFI9G8cr47mpFzj9n7fA8ugEuBeU9Og",
    authDomain: "nytgiphy.firebaseapp.com",
    databaseURL: "https://nytgiphy.firebaseio.com",
    projectId: "nytgiphy",
    storageBucket: "nytgiphy.appspot.com",
    messagingSenderId: "964063517515"
  };

  firebase.initializeApp(config);
  var database = firebase.database();

//Button add data from NYT or Giphy
$("#add-data-btn").on("click", function(event) {
    event.preventDefault();
  
    // Grabs input from // for NYT and Giphy classes Need Gihpy html tags ids?
    // var nytData= $(".list-group-heading").val().trim();
    // var giphyData = $(".giphyHoldingPlace").val().trim();
  
    // Creates local "temporary" object for holding the data from Giphy and NYT 
    var newObject = {
      nytHeadline: ,
      giphyPics: giphyData,
    };

    //uploads newObject data to the firebase db
    database.ref().push(newObject);

    //console log everyting to the console 
    console.log(newObject);
 
    //Clear all the text on html page

    $(".list-group-heading").val("");
    $(".giphyHoldingPlace").val("");

});

//Create a firebase event pull DB and adding to html
 
  database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());
  
    // Store everything into a variable.
    var fireNytData = childSnapshot.val().nytHeadline;
    var fireGiphyData = childSnapshot.val().giphyPics;
  
    // console.log test return of GiphyData
    console.log(fireGiphyData);
  
    //Put back on Html page appending to html ? 
    $(".giphyHoldingPlace").append(fireGiphyData);


});