import { Modality } from "../types"
import { Course, Schedule, ScheduleCollection } from "."
import { Person } from "./BaseEntities"

export class Student extends Person {
  modality: Modality;
  level: string;
  needsConfirmation: boolean;

  shouldJoinCourse(course: Course, scheduleFlexibilityHours: Number = 0): boolean {
    let scheduleOK = false
    if (this.availability.includesDeep(course.schedule)) {
      scheduleOK = true
    } else if (scheduleFlexibilityHours) {
      scheduleOK = this.availability.some((a) => (a.calcDifference(course.schedule) / 1000 / 60 / 60) <= scheduleFlexibilityHours)
      this.needsConfirmation = scheduleOK
    }

    return scheduleOK && this.level === course.level && this.modality === course.modality
  }
  
  constructor(name: string, modality:  Modality, level: string, availability: ScheduleCollection, needsConfirmation = false) {
    super(name)
    this.modality = modality
    this.level = level
    this.availability = availability
    this.needsConfirmation = needsConfirmation
  }
}