


async function initMap() {
    
    await getLocation()
}

var x = document.getElementById("map");
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}

function showPosition(position) {
    const ibadan = { lat: position.coords.latitude, lng: position.coords.longitude };
    // The map, centered at Uluru
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 15,
        center: ibadan,
    });
    // The marker, positioned at Uluru
    const marker = new google.maps.Marker({
        position: ibadan,
        map: map,
    });
}

async function getNearbyStation() {
    if (navigator.geolocation) {
        await navigator.geolocation.getCurrentPosition(
            function (position) {
                var map;
                var service;
                var infowindow;

                function initialize() {
                    console.log(position);
                    var pyrmont = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

                    map = new google.maps.Map(document.getElementById('map'), {
                        center: pyrmont,
                        zoom: 15
                    });

                    var request = {
                        location: pyrmont,
                        radius: '1000',
                        type: ['gas_station']
                    };

                    service = new google.maps.places.PlacesService(map);
                    service.nearbySearch(request, callback);
                }

                function callback(results, status) {
                    if (status == google.maps.places.PlacesServiceStatus.OK) {
                        for (var i = 0; i < results.length; i++) {
                            createMarker(results[i], map);
                        }
                    }
                }
                initialize()
            }
        );
    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}

function createMarker(points, map){
    console.log(points);
    const marker = new google.maps.Marker({
        position: {lat: points.geometry.location.lat(), lng: points.geometry.location.lng()},
        map: map
    });
}
