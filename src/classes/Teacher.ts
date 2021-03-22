import isEqual from 'lodash.isequal'
import { Person } from './BaseEntities'
import { Schedule, ScheduleCollection } from './Schedule'
import { Course } from './Course'

export class Teacher extends Person {
  public availability: ScheduleCollection

  getFreeHours () {
    return this.availability.filter((a) => a.busy === false) as ScheduleCollection
  }

  assignSchedule (schedule) : void {
    const matchSchedule = this.availability.find((s) => isEqual(s, schedule)) as Schedule
    matchSchedule.busy = true
  }

  shouldJoinCourse (course: Course) : boolean {
    return this.getFreeHours().includesDeep(course.schedule)
  }

  constructor (name: string, availability: ScheduleCollection) {
    super(name)
    this.availability = availability
  }
}
