const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  const name = "Kathmandu";

  // const existingLocation = await prisma.locations.findUnique({
  //   where: { name: name },
  // });

  const location = await prisma.locations.create({
    data: {
      name,
    },
  });

  await prisma.weather_realtime.create({
    data: {
      location_id: location.id,
      temperature: 20.2,
      condition: "Sunny",
      humidity: 30,
      wind_speed: 2.2,
    },
  });

  await prisma.weather_forcast.create({
    data: {
      location_id: location.id,
      max_temp: 28,
      min_temp: 14,
      condition: "Sunny",
    },
  });

  await prisma.air_quality.create({
    data: {
      location_id: location.id,
      aqi: 10,
      description: "Moderate",
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
