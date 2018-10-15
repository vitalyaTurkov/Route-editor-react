//Получение промежуточных точек(всех точек кроме первой и последней)
function getWaypoints(points) {
    const result = [];
    for(let i = 1; i < points.length - 1; i++) {
        result.push({location: new window.google.maps.LatLng({lat: points[i].lat, lng: points[i].lng})});
    }
    return result;
}

export const setRoute = ( points, directionsDisplay, map, deletePoint ) => {
    const waypoints = getWaypoints(points);

    const directionsService = new window.google.maps.DirectionsService();

    const request = { //Формируем запрос к api, чтобы получить маршрут
        origin: new window.google.maps.LatLng({lat: points[0].lat, lng: points[0].lng}), //точка старта
        destination: new window.google.maps.LatLng({lat: points[points.length - 1].lat, lng: points[points.length - 1].lng}),
        waypoints: waypoints,
        travelMode: window.google.maps.DirectionsTravelMode.DRIVING //режим прокладки маршрута
    };

    directionsService.route(request, function(response, status) {
        if (status === window.google.maps.DirectionsStatus.OK) {
            directionsDisplay.setDirections(response);
        }
        else {
            alert("Невозможно проложить путь!");
            deletePoint(points[points.length - 1]);
        }
    });

    directionsDisplay.setMap(map);
};