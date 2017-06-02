  
  // Initialize Firebase
var config = {
    apiKey: "pE1BwpmMDHJdfs9n",
    authDomain: "songkick-19f05.firebaseapp.com",
    databaseURL: "https://songkick-19f05.firebaseio.com",
    projectId: "songkick-19f05",
    storageBucket: "songkick-19f05.appspot.com",
    messagingSenderId: "946494866814"
  };
firebase.initializeApp(config);

const skRef = firebase.database().ref('/UserConcertList');
 

$(function(){
  $('#concertListItems').on('click', '.concertListItem', function() {
    const concertDetails = $(this).text();
    skRef.push(concertDetails);
  });

  skRef.on('value', function(res){
    var userListConcertItems = res.val();
    for (var userListConcertItem in userListConcertItems){
      console.log(userListConcertItem)
      $('#userListConcertItems').append("<li>" + userListConcertItems[userListConcertItem] + "</li>");
    }
    // for (let userListConcertItem in userListConcertItem) {
    //   $('#userConcertListItems').append("<li data-key="+userConcertListItem+">" + userConcertListItems[userConcertListItem] + "</li>");
    // }
  });
});

const sk = {};

sk.apiKey = 'hHSjLHKTmsfByvxU';


// write a function to get the users location from field on submit
sk.locationResults = ""

sk.locationEvent = function(){
  $('form').on('submit', function(e){
    e.preventDefault();
    let userCity = $('.usersLocation').val();
   let userCityLowerCase = userCity.toLowerCase();
  let userCityCapitalized = userCityLowerCase.charAt(0).toUpperCase() + userCityLowerCase.substr(1);
   sk.getMatchingCities(userCityCapitalized);
   $('.usersLocation').val('');
   $('#concertListItems').empty();
  });

  // sk.getMatchingCities(userCity)
}

// cities that match query
sk.getMatchingCities = function (userCity) {
  $.ajax({
    url: 'http://api.songkick.com/api/3.0/search/locations.json',
    method: 'GET',
    dataType: 'jsonp',
    jsonp: 'jsoncallback',
    data: {
      query: userCity,
      apikey: sk.apiKey
    }
  }).then(function (locationResults) {
      sk.locationResults = locationResults.resultsPage.results.location[0];
    $('.location').html(sk.locationResults.city.displayName);
    sk.getCityShows(sk.locationResults.metroArea.id);
  });
};

sk.getCityShows = function (id) {
  $.ajax({
    url: `http://api.songkick.com/api/3.0/metro_areas/${id}/calendar.json`,
    method: 'GET',
    dataType: 'jsonp',
    jsonp: 'jsoncallback',
    data: {
      apikey: sk.apiKey
    }
  }).then(function (res) {
      sk.filterList(res)
  });
};


sk.filterList = function(concertList) {
  let drilledToConcertArray = concertList.resultsPage.results.event
  var concertsByPop = drilledToConcertArray.sort(function(obj1, obj2){
    return  obj2.popularity - obj1.popularity;
  })
  var concertsOnly = concertsByPop.filter(function(value){
    return value.type === "Concert"
  })
  var slicedConcerts = concertsOnly.slice(0, 20)
  sk.putConcertsInTemplate(slicedConcerts);

};


sk.putConcertsInTemplate = function(concertList){
  var concertTemplate = $('#concertList').html();
  var compiledConcertTemplate = Handlebars.compile(concertTemplate);
  concertList.forEach(function(concert){
    // console.log(concert)


    // var artistName = concert.performance[0].displayName
    // $('.artist').append('<h3>' + artistName + '</h3>')


    $('#concertListItems').append(compiledConcertTemplate(concert));
  });
};


// http://api.songkick.com/api/3.0/search/locations.json?query={search_query}&apikey={your_api_key}

//get location id and make second songkickajax request for concerts
//get artist names from second songkickajax store in variable and use to query musiki for images
//funnel second ajaxsongkick and musiki results into handlebar template
//display that in our masonry div

//figure out how to make it clickable into firebase (storage)
//figure out hot update userConcertListItems with firebase->handlebar template for the userConcertListItems

// get artist images

// figre out how to append this
sk.getArtistImage = function () {
  $.ajax({
    url: `https://music-api.musikki.com/v1/artists`,
    method: 'GET',
    dataType: 'json',
    data: {
      // make the q: a variable input based on grabbing the artist name
      q: 'French Montana',
      appkey: '7039c8a27b6cbabadb760d4890a3011e',
      appid: '294aaa1e4e2e356b1873051727fa0456'
    }
  }).then(function (artist) {
      console.log(artist.results[0].image);
  });
};

sk.init = function() {
<<<<<<< HEAD
  sk.getMatchingCities();
  // remove getArtistImage from here once we call it in another function
  sk.getArtistImage();
=======
  sk.locationEvent();
>>>>>>> 4b0ecee5b3f680668f5cfc7231e24eb44ec60d9a
};


$(function() {
    sk.init();
});
