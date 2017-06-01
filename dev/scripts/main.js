
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyA8FFMyn81ZNHNmY6EUHIuiyyb4Wq_MBvQ",
    authDomain: "songkick-19f05.firebaseapp.com",
    databaseURL: "https://songkick-19f05.firebaseio.com",
    projectId: "songkick-19f05",
    storageBucket: "songkick-19f05.appspot.com",
    messagingSenderId: "946494866814"
  };
  firebase.initializeApp(config);

const dbRef = firebase.database().ref('UserConcertList');
 

$(function(){

  firebase.database().ref('userConcertList').on('value', function(res){
    $('.concertListItems').empty();
    var userConcertListItems = res.val();
    for (userConcertListItem in userConcertListItems) {
      $('.userConcertListItems').append("<li data-key="+userConcertListItem+">" + userConcertListItems[userConcertListItem] + "</li>");
    }
  });

  $('.concertListItems').on('click', '.concertListItem', function() {
    //grab the value of each concertList item when user clicks on them and store in fb
    let userConcertListItem = $('.concertListItem') //this?  how to access?
    if (userConcertListItem !== '') {
      dbRef.push(userConcertListItem);
    }
  });

});