import { ReadingResponse } from './ReadingResponse';

export interface ReadingsByDate {
  [date: string]: ReadingResponse[];
}