export interface ScheduleData {
  default: {
    [date :string]: ScheduleRow[];
  }
}

export interface ScheduleRow {
  arrival_time: string;
  departure_time: string;
  trip_headsign: string;
  route_short_name: string;
  route_long_name: string;
}