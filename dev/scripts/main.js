const sk = {};

sk.apiKey = 'hHSjLHKTmsfByvxU';
sk.city = 'toronto';

sk.init = function () {
  sk.getMatchingCities();
};

// write a function to get the users location from field on submit

// cities that match query
sk.getMatchingCities = function () {
  $.ajax({
    url: 'http://api.songkick.com/api/3.0/search/locations.json',
    method: 'GET',
    dataType: 'jsonp',
    jsonp: 'jsoncallback',
    data: {
      query: sk.city,
      apikey: sk.apiKey
    }
  }).then(function (locationResults) {
      locationResults = locationResults.resultsPage.results.location;
      console.log(locationResults);
  });
};
// http://api.songkick.com/api/3.0/search/locations.json?query={search_query}&apikey={your_api_key}



$(function () {
    sk.init();
})