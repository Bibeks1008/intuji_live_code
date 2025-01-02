const http = require("http");
const url = require("url");

const {
  getAllLocations,
  getWeatherRealtime,
  getWeatherforecast,
  getAirquality,
  postData,
} = require("./controllers/weatherController");

const server = http.createServer((req, res) => {
  const reqUrl = url.parse(req.url);
  console.log(reqUrl);
  console.log(reqUrl.path === `/website/realtime/?${reqUrl.query}`);
  const method = req.method;

  if (reqUrl.path === "/weather/locations" && method === "GET") {
    getAllLocations(req, res);
  } else if (
    reqUrl.path === `/website/realtime/?${reqUrl.query}` &&
    method === "GET"
  ) {
    const location = reqUrl.query.split("=")?.[1];
    getWeatherRealtime(req, res, location);
  } else if (
    reqUrl.path === `/website/forecast/?${reqUrl.query}` &&
    method === "GET"
  ) {
    const location = reqUrl.query.split("=")?.[1];
    getWeatherforecast(req, res, location);
  } else if (
    reqUrl.path === `/website/airquality/?${reqUrl.query}` &&
    method === "GET"
  ) {
    const location = reqUrl.query.split("=")?.[1];
    getAirquality(req, res, location);
  } else if (
    reqUrl.path === `/website/generate/?${reqUrl.query}` &&
    method === "POST"
  ) {
    const location = reqUrl.query.split("=")?.[1];
    postData(req, res, location);
  }
});

const PORT = process.env.PORT || 8080;

server.listen(8080, () => console.log(`Server running on port ${PORT}`));

module.exports = server;
