//------NY TIMES
// App ID      1deb8316-b9cc-49b8-b0b9-114a9eed31d4
// API Key 76MLUOUhu8ALZ2Y8BCj6gA5pGcglP951	


function buildQueryURL() {

    var queryURL = "https://api.nytimes.com/svc/mostpopular/v2/viewed/1.json?";
    var queryParams = { "api-key": "76MLUOUhu8ALZ2Y8BCj6gA5pGcglP951" };
    
    // Grab text the user typed into the search input, add to the queryParams object
    //   queryParams.q = $("#search-term")
    //  .val()
    //  .trim();

    // If the user provides a startYear, include it in the queryParams object
    // var startYear = $("#start-year")
    //  .val()
    //  .trim();

    // if (parseInt(startYear)) {
    //  queryParams.begin_date = startYear + "0101";
    // }

    // If the user provides an endYear, include it in the queryParams object
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


//function updatePage(NYTData) {
//    console.log(NYTData);
//    console.log("------------------------------------");
//}


function getArticles() {
    var queryURL = buildQueryURL();
    console.log("getArticles : " +queryURL);

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
    })
}


$(document).ready(function () {
    console.log("ready");
    getArticles();
    

})




