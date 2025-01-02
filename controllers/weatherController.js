const { PrismaClient } = require("@prisma/client");
const getPostData = require("../utils");

const prisma = new PrismaClient();

async function getAllLocations(req, res) {
  try {
    const locations = await prisma.locations.findMany();
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        message: "Locations fetched successfully!",
        data: locations,
      })
    );
  } catch (err) {
    console.log(err);
  }
}

async function getWeatherRealtime(req, res, location) {
  console.log(location);
  try {
    const weatherlocation = await prisma.locations.findFirst({
      where: {
        name: location,
      },
    });
    const weather_realtime = await prisma.weather_realtime.findFirst({
      where: {
        location_id: weatherlocation.id,
      },
    });

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        message: "RealTime weather is fetched successfully!",
        data: weather_realtime,
      })
    );
  } catch (err) {
    console.log(err);
  }
}

async function getWeatherforecast(req, res, location) {
  try {
    const weatherlocation = await prisma.locations.findFirst({
      where: {
        name: location,
      },
    });
    const weather_forcast = await prisma.weather_forcast.findFirst({
      where: {
        location_id: weatherlocation.id,
      },
    });

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        message: "weather is fetched successfully!",
        data: weather_forcast,
      })
    );
  } catch (err) {
    console.log(err);
  }
}

async function getAirquality(req, res, location) {
  try {
    const weatherlocation = await prisma.locations.findFirst({
      where: {
        name: location,
      },
    });
    const air_quality = await prisma.air_quality.findFirst({
      where: {
        location_id: weatherlocation.id,
      },
    });

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        message: "air quality is fetched successfully!",
        data: air_quality,
      })
    );
  } catch (err) {
    console.log(err);
  }
}

async function postData(req, res, location) {
  const body = await getPostData(req);
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(
    JSON.stringify({
      message: "air quality is fetched successfully!",
      data: body,
    })
  );
}

module.exports = {
  getAllLocations,
  getWeatherRealtime,
  getWeatherforecast,
  getAirquality,
  postData,
};
