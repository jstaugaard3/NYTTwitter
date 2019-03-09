//------NY TIMES--------------------------------------------//

var headline1 = "";


function buildQueryURL() {
    //Query build for NYTimes API.  Parameters commented out are for follow on development
    //after building MVP

    var queryURL = "https://api.nytimes.com/svc/mostpopular/v2/viewed/1.json?";
    var queryParams = { "api-key": "76MLUOUhu8ALZ2Y8BCj6gA5pGcglP951" };

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
    console.log("In Giphy Headline 1 : " + headline1);

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (gifs) {

    // Loop through the gifs
    for (var i = 0; i < gifs.data.length; i++) {

      var imgURL = gifs.data[i].images.fixed_height.url;
      console.log(imgURL);

    } // end loop through array of gifs
})

} // end getGiphys

//Call getArticles and Giphys when page loads----------??
$(document).ready(function () {
    console.log("ready");
    getArticles();
})


$(document).on('click', '.btn', function () {
  headline1 = $(this).text();
  console.log(headline1);
  getGiphys(headline1);
});