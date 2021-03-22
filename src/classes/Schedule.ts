import isEqual from 'lodash.isequal'
import { parse } from 'date-fns'

export class Schedule {
  day: string
  hour: Number
  busy: boolean

  constructor (day: string, hour: Number, busy: boolean = false) {
    this.day = day
    this.hour = hour
    this.busy = busy
  }

  toString () {
    return `${this.day} ${this.hour}:00`
  }

  toDate () {
    return parse(this.toString(), 'EEEE HH:mm', new Date())
  }

  calcDifference (s2: Schedule) : number {
    return Math.abs(s2.toDate().getTime() - this.toDate().getTime()) // Returns difference in MS
  }
}

export class ScheduleCollection extends Array<Schedule> {
  markAsBusy (timetable: string) {
    const match = this.find((s: Schedule) => s.toString() === timetable) as Schedule
    match.busy = true
  }

  // Deep Comparison
  includesDeep (s1: Schedule): boolean {
    return this.find((s2) => isEqual(s1, s2)) !== undefined
  }
}
