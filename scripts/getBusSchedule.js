var fs = require('fs');

const STOPS = [11, 106, 1903]

const stopUrl = `http://data.foli.fi/gtfs/v0/stop_times/stop/`;
const tripUrl = `http://data.foli.fi/gtfs/v0/trips/all`;
const routeUrl = `http://data.foli.fi/gtfs/v0/routes`;
const calendarUrl = `http://data.foli.fi/gtfs/v0/calendar_dates`;

const main = async () => {
  console.log('fetching trips...');
  let trips = await (await fetch(tripUrl)).json();
  console.log('fetching routes...')
  let routes = await (await fetch(routeUrl)).json();
  console.log('fetching calendar dates...')
  let calendarDates = await (await fetch(calendarUrl)).json();

  STOPS.forEach(async stop => {
    let result = {};

    console.log(`PROCESSING ${stop}`);
    console.log('fetching stop times...')
    let stopTimes = await (await fetch(stopUrl + stop)).json();
    console.log(stopTimes);
    stopTimes.forEach(st => {
      console.log('stoptime ' + st.arrival_time);
      const trip = trips.filter(t => t.trip_id === st.trip_id)[0];
      const route = routes.filter(r => r.route_id === trip.route_id)[0];
      const dates = calendarDates[trip.block_id];
      dates.forEach(date => {
        if (!result[date.date]) {
          result[date.date] = []
        }
        const r = {
          arrival_time: st.arrival_time,
          departure_time: st.departure_time,
          trip_headsign: trip.trip_headsign,
          route_short_name: route.route_short_name,
          route_long_name: route.route_long_name
        }
        result[date.date].push(r);
      })
    });

    const resultJson = JSON.stringify(result);
    fs.writeFile(`src/bus_schedule/data/${stop}.json`, resultJson, 'utf8', (err) => {
      if (err) { 
        console.log(err);
        return;
      }
      console.log('file created');
    })

  });
}

main();



// const url = `http://data.foli.fi/gtfs/v0/stop_times/stop/${stopCode}`;
// fetch trips
// fetch routes
// fetch calendar dates
// foreach stops
/// fetch stop times
/// map trips to stop time
/// map route to trip
/// map calendar dates to trips
/// structure at this point:
/*
  stop
  -trip
  --date
  --date
  --date
  -trip
  -trip
  -trip
*/
/// foreach date
//// add date to result (if doesnt exist)
//// add stop time to date
console.log('test');