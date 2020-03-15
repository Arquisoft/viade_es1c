import { Route, Point } from "../entities";
import FC from 'solid-file-client';
import auth from 'solid-auth-client';

export const getRoute = (urlRoute) => {

  var route;
  const fc = new FC(auth);
  fc.readFile(urlRoute, null).then((content) => {

    // We obtain the JSON file from the pod
    route = JSON.parse(content);

    // To create an entity Route we need three parameters:
    var name;
    var points = [];
    var pointsAsArray = [];

    // We obtain the name of the route
    name = route.name;

    // We obtain the points of the route
    for (var i = 0; i < route.itinerary.numberOfItems; i++) {
      var latitude = route.itinerary.itemListElement[i].item.latitude;
      var longitude = route.itinerary.itemListElement[i].item.longitude;
      var elevation = route.itinerary.itemListElement[i].item.elevation;
      var point = new Point(latitude, longitude, elevation);
      points.push(point);
      pointsAsArray.push([latitude, longitude]);
    }

    // We return the information of the JSON as an entity Route
    return new Route(name, points, pointsAsArray);
  })
  .catch(err => console.error(`Error: ${err}`))
}

export const getPointsOfRouteAsArray = (route) => {
  var pointsAsArray = [];
  for (var i = 0; i < route.points.length; i++) {
    var point = [route.points[i].latitude, route.points[i].longitude];
    pointsAsArray.push(point);
  }
  return pointsAsArray;
}