-- CreateTable
CREATE TABLE "Locations" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "latitude" DECIMAL(10,6),
    "longitude" DECIMAL(10,6),

    CONSTRAINT "Locations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Weather_realtime" (
    "id" SERIAL NOT NULL,
    "temperature" DECIMAL(5,2) NOT NULL,
    "condition" VARCHAR(255) NOT NULL,
    "humidity" INTEGER NOT NULL,
    "wind_speed" DECIMAL(5,2) NOT NULL,
    "updated_at" TIMESTAMPTZ(3) NOT NULL,
    "location_id" INTEGER NOT NULL,

    CONSTRAINT "Weather_realtime_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Weather_forcast" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "min_temp" DECIMAL(5,2) NOT NULL,
    "max_temp" DECIMAL(5,2) NOT NULL,
    "condition" VARCHAR(255) NOT NULL,
    "location_id" INTEGER NOT NULL,

    CONSTRAINT "Weather_forcast_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Air_quality" (
    "id" SERIAL NOT NULL,
    "aqi" INTEGER NOT NULL,
    "description" VARCHAR(255) NOT NULL,
    "location_id" INTEGER NOT NULL,

    CONSTRAINT "Air_quality_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Weather_realtime" ADD CONSTRAINT "Weather_realtime_location_id_fkey" FOREIGN KEY ("location_id") REFERENCES "Locations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Weather_forcast" ADD CONSTRAINT "Weather_forcast_location_id_fkey" FOREIGN KEY ("location_id") REFERENCES "Locations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Air_quality" ADD CONSTRAINT "Air_quality_location_id_fkey" FOREIGN KEY ("location_id") REFERENCES "Locations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
