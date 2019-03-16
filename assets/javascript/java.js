//------NY TIMES--------------------------------------------//

var headline1 = "";
var imgURL = "";


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
  var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=HeHkAiN21cAfgDt2c1HZzCPq0GE9yKyj&limit=6&offset=0&rating=G&lang=en&q=" + hl;
  
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (gifs) {

    // Loop through the gifs
    for (var i = 0; i < gifs.data.length; i++) {

      imgURL = gifs.data[i].images.fixed_height.url;

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
  $("#giphyContainer").remove();
  var newGiphyDiplay = $("<div class='container' id='giphyContainer'>" +
      "<div class='row'>" +
      "<div class='col-lg-4 card insideGif' id='giphyContainer1'></div>" +
      "<div class='col-lg-4 card insideGif' id='giphyContainer2'></div>" +
      "<div class='col-lg-4 card insideGif' id='giphyContainer3'></div>" +
      "</div>" +
      "<div class='row'>" +
      "<div class='col-lg-4 card insideGif' id='giphyContainer4'></div>" +
      "<div class='col-lg-4 card insideGif' id='giphyContainer5'></div>" +
      "<div class='col-lg-4 card insideGif' id='giphyContainer6'></div>" +
      "</div>" +
      "</div>");
  $(this).append(newGiphyDiplay);
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

// On click event to get imgURL of Giphy, create a new object, and send Obj to firebase
$(document).on("click", '.gif', function(event) {
  event.preventDefault();

  //New variable using onclick event to grab giphy url only
  imgURL = event.currentTarget.getAttribute("src");

  // Creates local object for holding the data from Giphy imgURL
  var newObject = {
    giphyPics: imgURL,
  };

  //uploads newObject data to the firebase db
  database.ref().push(newObject);

});


//Create a firebase event pull DB and adding to html
//limits the amount of children to pull from firebase on pageload to 5 
database.ref().endAt().limitToLast(5).on("child_added", function(childSnapshot) {

  // Storing the Key from the firebase object with the Giphy imgURL called giphyPics
  var fireGiphData = childSnapshot.val().giphyPics;

  //sets a new variable to the img class using the attribute of the Firebase return variable fireGiphData
  var newsGif = $("<img class='card-img-top gif mb-2'>").attr({
    src: fireGiphData 
  });
  //creates a variable that counts the length of all the children objects returned from firebase
  var count = $("#work").children().length;
  //logic to remove any children equal or greater than 5 to allow only show 5 images at all times
  if(count >= 5) {
    $("#work").children().last().remove()
  }
  //Prepends the newsGif variable to the work ID
  $("#work").prepend(newsGif);
});