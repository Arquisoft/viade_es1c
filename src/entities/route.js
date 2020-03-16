class Route {

    constructor(name, points, pointsAsArray) {
        this.name = name;
        this.points = points;
        this.origin = points[0];
        this.target = points[points.length - 1];
        this.pointsAsArray = pointsAsArray;
    }
}

export default Route;