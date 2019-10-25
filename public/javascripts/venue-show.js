mapboxgl.accessToken = process.env.MAPBOX_TOKEN;

var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/light-v10',
    center: venue.geometry.coordinates,
    zoom: 7
});

// create a HTML element for our venue location/marker
var el = document.createElement('div');
el.className = 'marker';

// make a marker for our location and add to the map
new mapboxgl.Marker(el)
.setLngLat(venue.geometry.coordinates)
.setPopup(new mapboxgl.Popup({ offset: 25 }) // add popups
.setHTML('<h3>' + venue.title + '</h3><p>' + venue.location + '</p>'))
.addTo(map);

//toggle edit review form
$('.toggle-edit-form').on('click', function() {
    //toggle the edit button text on click
    $(this).text() === 'Edit' ? $(this).text('Cancel') : $(this).text('Edit');
    //toggle visibility of edit review form
    $(this).siblings('.edit-review-form').toggle();
});

// Add click listener for clearing of rating from edit and new form
$('.clear-rating').click(function() {
    $(this).siblings('.input-no-rate').click();
});