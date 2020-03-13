class Route {

    constructor(name, points) {
        this.name = name;
        this.points = points;
        this.origin = points[0];
        this.target = points[points.length - 1];
    }
}

export default Route;