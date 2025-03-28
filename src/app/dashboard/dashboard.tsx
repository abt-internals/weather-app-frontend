import { sampleObj } from "@/components/sampleObj";
import { forcastObj } from "@/components/sampleObj";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  AlarmClock,
  CloudHail,
  Cloudy,
  Compass,
  Droplet,
  Flame,
  Sun,
  Thermometer,
  Wind,
} from "lucide-react";

const UserDashboard = () => {
  const location = sampleObj.location;
  const currObj = sampleObj.current;
  const forecastInfo = forcastObj.forecast.forecastday;
  const hourInfo = forecastInfo[0].hour;

  function getDayAndTime(dateString: string | number | Date) {
    const date = new Date(dateString);

    const day = date.toLocaleDateString("en-US", { weekday: "long" }); // Get full day name
    const time = date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });

    return { day, time };
  }

  // Example Usage
  const today = getDayAndTime(location.localtime);
  const updated = getDayAndTime("2025-03-27 01:15");
  const forecastDay = getDayAndTime(forecastInfo[0].date);

  return (
    <div className="w-full bg-gray-500 p-4 md:p-20">
      <div className="flex min-h-screen flex-col text-black md:flex-row">
        <div className="rounded-t-xl bg-white p-8 md:w-[25%] md:rounded-l-xl md:rounded-tr-none">
          <h1 className="mb-4 text-6xl">
            <p>
              {currObj.temp_c}
              <sup>&deg;C</sup>
            </p>
          </h1>
          <p>
            {today.day},
            <span className="text-neutral-500">
              {today.time} {currObj.is_day === 1 ? "AM" : "PM"}
            </span>
          </p>
        </div>
        <div className="rounded-b-xl bg-gray-200 p-8 md:w-[75%] md:rounded-r-xl md:rounded-bl-none">
          <h1 className="font-semibold">Welcome back bhushan!</h1>
          <p className="mb-5">
            Check out today's weather information (last updated {updated.time}{" "}
            {currObj.is_day === 1 ? "AM" : "PM"})
          </p>
          <Tabs defaultValue="Today" className="w-full gap-10">
            <TabsList>
              <TabsTrigger value="Today">Today</TabsTrigger>
              <TabsTrigger value="Forecast">Forecast</TabsTrigger>
            </TabsList>
            <TabsContent value="Today">
              <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card className="min-h-35 bg-white px-4 py-2 text-black">
                  <p className="flex items-center justify-between text-neutral-500">
                    wind status
                    <Wind />
                  </p>
                  <h1 className="bold text-3xl ">
                    {currObj.wind_kph} <span className="text-base">Kph</span>
                  </h1>
                  <p className="flex gap-2">
                    <Compass />
                    {currObj.wind_dir}
                  </p>
                </Card>
                <Card className="min-h-35 bg-white px-4 py-2 text-black ">
                  <p className="flex items-center justify-between text-neutral-500">
                    Heat index
                    <Flame />
                  </p>
                  <h1 className="bold text-3xl ">{currObj.heatindex_c}%</h1>
                </Card>
                <Card className="min-h-35 bg-white px-4 py-2 text-black">
                  <p className="flex items-center justify-between text-neutral-500">
                    Dew point
                    <Droplet />
                  </p>
                  <h1 className="bold text-3xl ">{currObj.dewpoint_c}</h1>
                </Card>
                <Card className="min-h-35 bg-white px-4 py-2 text-black">
                  <p className="flex items-center justify-between text-neutral-500">
                    UV
                    <Sun />
                  </p>
                  <h1 className="bold text-3xl ">{currObj.uv}%</h1>
                  <p className="flex gap-2">
                    {currObj.is_day ? "" : "No uv at night"}
                  </p>
                </Card>
                <Card className="min-h-35 bg-white px-4 py-2 text-black">
                  <p className="flex items-center justify-between text-neutral-500">
                    Humidity
                    <Droplet />
                  </p>
                  <h1 className="bold text-3xl ">{currObj.humidity}%</h1>
                  <p className="flex gap-2">
                    {currObj.humidity > 70 ? "Mostly humid" : "Partially humid"}
                  </p>
                </Card>
                <Card className="min-h-35 bg-white px-4 py-2 text-black">
                  <p className="flex items-center justify-between text-neutral-500">
                    Cloud
                    <Cloudy />
                  </p>
                  <h1 className="bold text-3xl ">{currObj.cloud}%</h1>
                  <p className="flex gap-2">
                    {currObj.cloud > 70 ? "Mostly cloudy" : "Partially cloudy"}
                  </p>
                </Card>
                <Card className="min-h-35 bg-white px-4 py-2 text-black">
                  <p className="flex items-center justify-between text-neutral-500">
                    Air quality
                    <Wind />
                  </p>
                  <h1 className="bold text-3xl ">Good</h1>
                  <p className="flex gap-2">
                    EPA Index: {currObj.air_quality["us-epa-index"]}
                  </p>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="Forecast">
              Enter Date to Forecast
              <Input type="date" />
              <div className="w-full">
                <div>
                  <p>
                    Showing Data for {forecastDay.day} ({forecastInfo[0].date})
                  </p>
                  <Card className="flex items-center justify-center bg-white font-semibold text-black">
                    <p>
                      Maximun Tempreture : {forecastInfo[0].day.maxtemp_c}
                      <sup>&deg;C</sup>
                    </p>
                    <p>
                      Minimum Tempreture : {forecastInfo[0].day.mintemp_c}
                      <sup>&deg;C</sup>
                    </p>
                    <p>
                      Maximun Wind Speed : {forecastInfo[0].day.maxwind_kph} kph
                    </p>
                    <p>Average Humidity : {forecastInfo[0].day.avghumidity}%</p>
                  </Card>
                  <p className="my-10">Forecast for Day</p>
                  <div className="flex w-full flex-row gap-4 overflow-x-auto p-5">
                    {hourInfo.map((item, index) => (
                      <Card
                        // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                        key={index}
                        className="min-h-35 min-w-70 bg-white px-4 py-2 font-semibold text-black *:flex *:items-center *:gap-2"
                      >
                        <p>
                          <AlarmClock />
                          Time: {getDayAndTime(item.time).time}
                        </p>
                        <p>
                          <Thermometer />
                          <span>
                            Tempreture: {item.temp_c}
                            <sup>&deg;C</sup>
                          </span>
                        </p>
                        <p>
                          <Wind /> Wind Speed: {item.wind_kph} kph
                        </p>
                        <p>
                          <Compass /> Wind Direction: {item.wind_dir}
                        </p>
                        <p>
                          <Droplet /> Humidity: {item.humidity}%
                        </p>
                        <p>
                          <CloudHail />
                          Chance of Rain: {item.chance_of_rain}%
                        </p>
                        <p>
                          <CloudHail />
                          Will it Rain: {item.will_it_rain ? "Yes" : "No"}
                        </p>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
