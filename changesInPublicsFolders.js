 }).then(function (locationResults) {
    sk.locationResults = locationResults.resultsPage.results.location[0];
    $('.location').html("What's <span>LIT</span> in " + sk.locationResults.city.displayName + "?");
    sk.getCityShows(sk.locationResults.metroArea.id);
  });

//added this to style.css
//this ensures all concert tickets are the same height
 .concertListItem ul {
  margin: 5px;
  background-color: #B7B7B7;
  min-height: 460px; }

  //this get the concert button yellow and styled

    .concertListItem ul li button {
  background-color: #F6D70E;
  font-family: 'Oswald', sans-serif;
  border: 1px solid black;
  }

  //good 'ol calc ;) and some media queries

  .concertListItem {
  float: left;
  width: calc(25% - (60px / 4));
  margin: 10px 20px 10px 0px;
  text-align: center;
  border: 2px solid black; }
  .concertListItem h3 {
    font-family: 'Oswald', sans-serif; }
  .concertListItem h4 {
    font-size: 16px; }
  .concertListItem img {
    filter: grayscale(100%);
    display: block;
    width: 100%; }
.concertListItem:nth-of-type(4n) {
  margin-right: 0;
}

@media (max-width: 768px) {

.concertListItem {
	float: left;
	width: calc(50% - (20px / 2));
	margin: 10px 20px 10px 0px;}
.concertListItem:nth-of-type(2n) {
	margin-right: 0;
	}
}
/* Landscape phones and down */
@media (max-width: 480px) {
	.concertListItem {
	width: calc(100% - 20px);
	margin: 10px 10px 10px 10px;}
	.logo {
	margin: 0 20px;
	text-align: center;
	width: calc(100% - 40px);
	img {
		width: 100%;
	}

}


}