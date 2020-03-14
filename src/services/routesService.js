import {Route, Point} from "../entities";

import route1 from './rutaDePrueba1.json';
import route2 from './rutaDePrueba2.json';
import route3 from './rutaDePrueba3.json';
import route4 from './rutaDePrueba4.json';

/*
  Once the pod is completely configurated, this function will obtain
  the data from the specified route from the user's pod. Right now,
  we are using local routes stored in the repository.
*/
export const getRoute = (value) => {

  // We select one route out of the 4 we have in our repository
  var route;
  if (value === route1.name) {
    route = route1;
  } else if (value === route2.name) {
    route = route2;
  } else if (value === route3.name) {
    route = route3;
  } else {
    route = route4;
  }

  // To create an entity Route we need two parameters:
  var name;
  var points = [];

  // We obtain the name of the route
  name = route.name

  // We obtain the points of the route
  for (var i = 0; i < route.itinerary.numberOfItems; i++) {
    var latitude = route.itinerary.itemListElement[i].item.latitude;
    var longitude = route.itinerary.itemListElement[i].item.longitude;
    var elevation = route.itinerary.itemListElement[i].item.elevation;
    var point = new Point(latitude, longitude, elevation);
    points.push(point);
  }

  // We return the information of the JSON as an entity Route
  return new Route(name, points);
}

export const getPointsOfRouteAsArray = (route) => {
  var pointsAsArray = [];
  for (var i = 0; i < route.points.length; i++) {
    var point = [route.points[i].latitude, route.points[i].longitude];
    pointsAsArray.push(point);
  }
  return pointsAsArray;
}