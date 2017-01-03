$(document).ready(function(){
  var direccion = localStorage.getItem('calleSAve');
  var fechaDesde = localStorage.getItem('desdeSAve');
  var fechaHasta = localStorage.getItem('hastaSave');
  $('#buscar_dos').attr('value', direccion);
  $('#llegada_dos').attr('value', fechaDesde);
  $('#salida_dos').attr('value', fechaHasta);
  Materialize.updateTextFields();

});

var map, places, infoWindow;
var markers = [];
var autocomplete;
var MARKER_PATH = 'https://maps.gstatic.com/intl/en_us/mapfiles/marker_green';
var hostnameRegexp = new RegExp('^https?://.+?/');
var newCentro =  JSON.parse(localStorage.getItem('newCenter'));

function initAutocomplete(){
  //autocompleta el input con direccion
  autocomplete = new google.maps.places.Autocomplete(
      (document.getElementById('first_name')),
      {types: ['geocode']});
  // When the user selects an address from the dropdown, populate the address
  // fields in the form.
  places = new google.maps.places.PlacesService(map);

  autocomplete.addListener('place_changed', guardarCentro);
}

function guardarCentro() {

  var place = autocomplete.getPlace();
  var centro = null;

  if (place.geometry) {
    centro=place.geometry.location;
    console.log(centro);
    localStorage.setItem('newCenter', JSON.stringify(centro));
  }
}

var miCentro = newCentro;

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 15,
    center: miCentro,
    mapTypeControl: false,
    panControl: false,
    zoomControl: true,
    streetViewControl: true
  });

	infoWindow = new google.maps.InfoWindow({
    	content: document.getElementById('info-content')
	});
    var destination_input = document.getElementById('buscar_dos');
    autocomplete = new google.maps.places.Autocomplete(destination_input);
    places = new google.maps.places.PlacesService(map);

    autocomplete.addListener('place_changed', onPlaceChanged);
}
function onPlaceChanged() {
  var place = autocomplete.getPlace();
  if (place.geometry) {
    map.panTo(place.geometry.location);
    map.setZoom(15);
    search();
  } else {
    document.getElementById('buscar_dos').placeholder = 'Enter a city';
  }
}
// Search for hotels in the selected city, within the viewport of the map.
function search() {
  var search = {
    bounds: map.getBounds(),
    types: ['lodging']
  };

  places.nearbySearch(search, function(results, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      clearMarkers();
      // Create a marker for each hotel found, and
      // assign a letter of the alphabetic to each marker icon.
      for (var i = 0; i < results.length; i++) {
        var markerLetter = String.fromCharCode('A'.charCodeAt(0) + i);
        var markerIcon = MARKER_PATH + markerLetter + '.png';
        // Use marker animation to drop the icons incrementally on the map.
        markers[i] = new google.maps.Marker({
          position: results[i].geometry.location,
          animation: google.maps.Animation.DROP,
          icon: markerIcon
        });
        // If the user clicks a hotel marker, show the details of that hotel
        // in an info window.
        markers[i].placeResult = results[i];
        google.maps.event.addListener(markers[i], 'click', showInfoWindow);
        setTimeout(dropMarker(i), i * 100);
        //addResult(results[i], i);
      }
    }
  });
}

function clearMarkers() {
  for (var i = 0; i < markers.length; i++) {
    if (markers[i]) {
      markers[i].setMap(null);
    }
  }
  markers = [];
}
function dropMarker(i) {
  return function() {
    markers[i].setMap(map);
  };
}
function showInfoWindow() {
  var marker = this;
  places.getDetails({placeId: marker.placeResult.place_id},
      function(place, status) {
        if (status !== google.maps.places.PlacesServiceStatus.OK) {
          return;
        }
        infoWindow.open(map, marker);
        buildIWContent(place);
      });
}

// Load the place information into the HTML elements used by the info window.
function buildIWContent(place) {
  document.getElementById('iw-icon').innerHTML = '<img class="hotelIcon" ' +
      'src="' + place.icon + '"/>';
  document.getElementById('iw-url').innerHTML = '<b><a href="' + place.url +
      '">' + place.name + '</a></b>';
  document.getElementById('iw-address').textContent = place.vicinity;

  if (place.formatted_phone_number) {
    document.getElementById('iw-phone-row').style.display = '';
    document.getElementById('iw-phone').textContent =
        place.formatted_phone_number;
  } else {
    document.getElementById('iw-phone-row').style.display = 'none';
  }

  // Assign a five-star rating to the hotel, using a black star ('&#10029;')
  // to indicate the rating the hotel has earned, and a white star ('&#10025;')
  // for the rating points not achieved.
  if (place.rating) {
    var ratingHtml = '';
    for (var i = 0; i < 5; i++) {
      if (place.rating < (i + 0.5)) {
        ratingHtml += '&#10025;';
      } else {
        ratingHtml += '&#10029;';
      }
    document.getElementById('iw-rating-row').style.display = '';
    document.getElementById('iw-rating').innerHTML = ratingHtml;
    }
  } else {
    document.getElementById('iw-rating-row').style.display = 'none';
  }
if (place.website) {
    var fullUrl = place.website;
    var website = hostnameRegexp.exec(place.website);
    if (website === null) {
      website = 'http://' + place.website + '/';
      fullUrl = website;
    }
    document.getElementById('iw-website-row').style.display = '';
    document.getElementById('iw-website').textContent = website;
  } else {
    document.getElementById('iw-website-row').style.display = 'none';
  }
}