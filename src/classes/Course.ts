import { Teacher, Student, Schedule } from "."
import { Modality } from "../types"

export class Course {
  // We should setup a constraint in code so we forbid individual courses having more than 1 student
  id: Number | string;
  level: string;
  teacher: Teacher;
  students: Array<Student> = []
  modality: Modality;
  schedule: Schedule;
  timetable() {
    return this.schedule.toString()
  }
}