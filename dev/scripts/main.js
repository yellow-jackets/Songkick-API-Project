
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

const sk = {};

sk.apiKey = 'hHSjLHKTmsfByvxU';

var filteredList = [];



sk.addConcert = function () {
  $('#concertListItems').on('click', '.concertListItem', function () {
    const concertDetails = $(this).html();
    skRef.push(concertDetails);
  });

  skRef.on('value', function (res) {
    var userListConcertItems = res.val();

  for (var userListConcertItem in userListConcertItems) {
    filteredList.push(userListConcertItems[userListConcertItem]);
    $('#userListConcertItems').empty();
    filteredList = _.uniq(filteredList);
  }

  filteredList.forEach(function (element) {
    $('#userListConcertItems').append("<li>" + element + "</li>");

    });
  });
};



// write a function to get the users location from field on submit
sk.locationResults = ""

sk.locationEvent = function () {
  $('form').on('submit', function (e) {
    e.preventDefault();
    let userCity = $('.usersLocation').val();
    let userCityLowerCase = userCity.toLowerCase();
    let userCityCapitalized = userCityLowerCase.charAt(0).toUpperCase() + userCityLowerCase.substr(1);
    sk.getMatchingCities(userCityCapitalized);
    $('.usersLocation').val('');
    $('#concertListItems').empty();
  });
}

// cities that match query
sk.getMatchingCities = function (userCity) {
  $.ajax({
    url: 'https://api.songkick.com/api/3.0/search/locations.json',
    method: 'GET',
    dataType: 'jsonp',
    jsonp: 'jsoncallback',
    data: {
      query: userCity,
      apikey: sk.apiKey
    }
  }).then(function (locationResults) {
    sk.locationResults = locationResults.resultsPage.results.location[0];
    $('.location').html(`<h3 class="cityHeading">What's <span>LIT</span> in ${sk.locationResults.city.displayName}?</h3><p class="listInstructions">Choose some concerts below</p>`);
    sk.getCityShows(sk.locationResults.metroArea.id);
  });
};

sk.getCityShows = function (id) {
  $.ajax({
    url: `https://api.songkick.com/api/3.0/metro_areas/${id}/calendar.json`,
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


sk.filterList = function (concertList) {
  let drilledToConcertArray = concertList.resultsPage.results.event
  let concertsByPop = drilledToConcertArray.sort((obj1, obj2) => obj2.popularity - obj1.popularity)
    .filter((value) => value.type === "Concert")
    .slice(0, 20);
  sk.addArtistNameToObject(concertsByPop);
};


sk.addArtistNameToObject = function (concertList) {
  concertList.forEach(function (concert) {
    var artistName = concert.performance[0].displayName;
    var givenConcertDate = new Date((concert.start.date).replace(/-/g, '\/').replace(/T.+/, ''));
    var concertDate = givenConcertDate.toString("dddd MMMM d, yyyy");
    var popularityOutOfTen = ((concert.popularity) * 100).toFixed(1);

    concert.artistName = artistName;
    concert.concertDate = concertDate
    concert.artistPopularity = popularityOutOfTen;
  });
  sk.getArtistsImages(concertList);
};


sk.getArtistsImages = function (concertList) {
  var artistImages = [];

  artistImages = concertList.map(function (concert) {
    return $.ajax({
      url: `https://music-api.musikki.com/v1/artists`,
      method: 'GET',
      dataType: 'json',
      data: {
        // make the q: a variable input based on grabbing the artist name
        q: concert.artistName,
        appkey: '7039c8a27b6cbabadb760d4890a3011e',
        appid: '294aaa1e4e2e356b1873051727fa0456'
      }
    });
  });

  $.when(...artistImages)
    .done(function (...promises) {
      // if the image doesn't existin the promise, we want to append a new object property with a value of a default image
      promises.forEach(function (promise, index) {
        // checks if an image result is undefined, if it is add a placeholder, otherwise, continue
        if (promise[0].results[0] === undefined) {
          concertList[index].image = "https://unsplash.it/300?random"
        } else {
          concertList[index].image = promise[0].results[0].image;
        }
      });
      console.log(concertList);
      sk.sendObjectToHandlebarTemplate(concertList);
    });
};



//need an object that already has all the proerties were sending to HB. Then send to HB object
//all data must be received before sending to HB

sk.sendObjectToHandlebarTemplate = function (concertList) {
  var concertTemplate = $('#concertList').html();
  var compiledConcertTemplate = Handlebars.compile(concertTemplate);

  concertList.forEach(function (concert) {
    $('#concertListItems').append(compiledConcertTemplate(concert));
  })



};

sk.smoothScroll = function () {
  $('.trigger, .slider').click(function() {
  $('.slider').toggleClass('close')
  $('.slider').toggleClass('closedTray')
  $('.slider').scrollTop(0);
//   $('html, body').animate({
//         scrollTop: $('.trayTitle').offset().top
//     }, 0);

  $('.collapse').text("view/collapse");
});

}

sk.buttonScroll = function () {
    $('.submitButton').on('click', function() {
    $('html, body').animate({
        scrollTop: $('.location').offset().top
    }, 1000);
  });
}

sk.events = function () {
  sk.smoothScroll();
  sk.buttonScroll();
  sk.addConcert();
}

sk.init = function () {
  sk.locationEvent();
  sk.events();
};



$(function () {
  sk.init();

});
