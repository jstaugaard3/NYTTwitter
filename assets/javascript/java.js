//------NY TIMES--------------------------------------------//

var headline1 = "";


function buildQueryURL() {
    //Query build for NYTimes API.  Parameters commented out are for follow on development
    //after building MVP

    var queryURL = "https://api.nytimes.com/svc/mostpopular/v2/viewed/1.json?";
    var queryParams = { "api-key": "76MLUOUhu8ALZ2Y8BCj6gA5pGcglP951" };

    return queryURL + $.param(queryParams);
}

//getArticles.  Articles returned in 'response' object
function getArticles() {
    var queryURL = buildQueryURL();
    console.log("getArticles : " + queryURL);

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        headline1 = response.results[0].title;
        $("#article1").text(response.results[0].title);
        $("#article2").text(response.results[1].title);
        $("#article3").text(response.results[2].title);
        $("#article4").text(response.results[3].title);
        $("#article5").text(response.results[4].title);
        getGiphys();
    })

}

//--------GIPHY--------------------------------------//

function getGiphys(hl) {
  // Build query
  //var animalToGet = $(this).attr("data-name");
  var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=HeHkAiN21cAfgDt2c1HZzCPq0GE9yKyj&limit=10&offset=0&rating=G&lang=en&q=" + hl;
  
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (gifs) {

    // Loop through the gifs
    for (var i = 0; i < gifs.data.length; i++) {

      var imgURL = gifs.data[i].images.fixed_height.url;

      var newsPic = $("<img class='card-img-top gif'>").attr({
        src: imgURL
      });
      j=i+1
      $("#giphyContainer"+j).empty();
      $("#giphyContainer"+j).append(newsPic);
      
    } // end loop through array of gifs
})

} // end getGiphys

//Call getArticles and Giphys when page loads----------??
$(document).ready(function () {
    getArticles();
})


$(document).on('click', '.btn', function () {
  headline1 = $(this).text();
  console.log(headline1);
  getGiphys(headline1);
});

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
$(".btn").on("click", function(event) {
  event.preventDefault();

  // Grabs input from // for NYT and Giphy classes Need Gihpy html tags ids?
  // var nytData= $(".list-group-heading").val().trim();
  // var giphyData = $(".giphyHoldingPlace").val().trim();


  // Creates local "temporary" object for holding the data from Giphy and NYT 
  var newObject = {
    nytHeadline: headline1,
   //giphyPics: giphyData,
  };

  //uploads newObject data to the firebase db
  database.ref().push(newObject);

  //console log everyting to the console 
  console.log(newObject);

});


//Create a firebase event pull DB and adding to html
 
database.ref().on("child_added", function(childSnapshot) {
  console.log(childSnapshot.val());

  // Store everything into a variable.
  var fireNytData = childSnapshot.val().nytHeadline;
  // var fireGiphyData = childSnapshot.val().giphyPics;

  // console.log test return of GiphyData
  console.log(fireNytData);

  //Put back on Html to html  
  $(".list-group-item-text").text(fireNytData);


});