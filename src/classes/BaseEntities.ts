import { Modality } from "../types"
import isEqual from "lodash.isequal"
import { ScheduleCollection } from "."

export abstract class Person {
  name: string;
  availability: ScheduleCollection;

  getSchedule(timetable: string) {
    return this.availability.find((a) => a.toString() === timetable)
  }

  constructor (name: string) {
    this.name = name;
  }
}






