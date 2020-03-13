export const getRoute = (value) => {
  let route1 = {
    "name": "Ruta1",
    "origin": "Oviedo",
    "target": "Oviedo",
    "date": "11-03-2020",
    "points": [
      {
        "latitude": "40.6643",
        "longitude": "-74.0059700",
        "altitude": "200",
        "city": "Oviedo",
        "description": "Bien"
      },
      {
        "latitude": "40.6643",
        "longitude": "-79.0059700",
        "altitude": "200",
        "city": "Oviedo",
        "description": "Bien"
      }
    ]
  };
  let route2 = {
    "name": "Ruta2",
    "origin": "Oviedo",
    "target": "Oviedo",
    "date": "11-03-2020",
    "points": [
      {
        "latitude": "43.3624",
        "longitude": "-5.8433",
        "altitude": "200",
        "city": "Oviedo",
        "description": "Bien"
      },
      {
        "latitude": "43.38022",
        "longitude": "-5.86837",
        "altitude": "200",
        "city": "Oviedo",
        "description": "Bien"
      }
    ]
  };
  let route3 = {
    "name": "Ruta3",
    "origin": "Oviedo",
    "target": "Oviedo",
    "date": "11-03-2020",
    "points": [
      {
        "latitude": "42.3624",
        "longitude": "-5.8433",
        "altitude": "200",
        "city": "Oviedo",
        "description": "Bien"
      },
      {
        "latitude": "42.38022",
        "longitude": "-5.86837",
        "altitude": "200",
        "city": "Oviedo",
        "description": "Bien"
      }
    ]
  };
  console.log(value);
  if (value === route1.name) {
    return route1;
  } else if (value === route2.name) {
    return route2;
  } else {
    return route3;
  }
}

export const getFormattedRoutes = (route) => {
    let points = new Array();
    for (let i = 0; i < route.points.length; i++) {
      points.push([route.points[i].latitude, route.points[i].longitude]);
    }
    return points;
}