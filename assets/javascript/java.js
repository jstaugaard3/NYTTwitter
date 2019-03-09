//------NY TIMES--------------------------------------------//

function buildQueryURL() {
    //Query build for NYTimes API.  Parameters commented out are for follow on development
    //after building MVP

    var queryURL = "https://api.nytimes.com/svc/mostpopular/v2/viewed/1.json?";
    var queryParams = { "api-key": "76MLUOUhu8ALZ2Y8BCj6gA5pGcglP951" };

    // Grab text the user typed into the search input, add to the queryParams object
    //   queryParams.q = $("#search-term")
    //  .val()
    //  .trim();
 
    // var startYear = $("#start-year")
    //  .val()
    //  .trim();

    // if (parseInt(startYear)) {
    //  queryParams.begin_date = startYear + "0101";
    // }

    //var endYear = $("#end-year")
    //  .val()
    //  .trim();

    //if (parseInt(endYear)) {
    //  queryParams.end_date = endYear + "0101";
    //}

    // Logging the URL so we have access to it for troubleshooting
    console.log("---------------\nURL: " + queryURL + "\n---------------");
    console.log(queryURL + $.param(queryParams));
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
    })
}

//Call getArticles when page loads
$(document).ready(function () {
    console.log("ready");
    getArticles();
})




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
