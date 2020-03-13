export type Route = {
  name: String,
  origin: String,
  target: String,
  date: String,
  points: Array<Point>
};

export type Point = {
  latitude: String,
  longitude: String,
  altitude: String,
  city: String,
  description: String
}