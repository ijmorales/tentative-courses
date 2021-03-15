import { Person, Student, Teacher, Course } from "../src/classes"

import { CourseGenerator } from "../src/classes/Generator"
import { GROUP_LIMIT } from "../src/constants"
import { generateStudents, generateTeachers } from "../src/utils"

declare global {
  namespace jest {
    interface Matchers<R> {
      toBeAvailableOnSchedule(received: Person, course: Course): R
      toComplyGroupLimit(received: Course, limit: Number): R
      toComplyModality(received: Course): R
      toBeSameLevel(received: Course): R
    }
  }
}

const mock = {
  students: generateStudents(100),
  teachers: generateTeachers(10),
}
const courses = new CourseGenerator(mock.students, mock.teachers, 1).generate()

// Custom matcher
expect.extend({
  toBeAvailableOnSchedule(received: Teacher | Student, course: Course) {
    const pass = !received.availability.includesDeep(course.schedule)
    if (pass) {
      return {
        message: () => `expected ${received} not to be available on course schedule`,
        pass: true
      }
    } else {
      return {
        message: () => `expected ${received} to be available on course schedule`,
        pass: false
      }
    }
  },
  toComplyGroupLimit(received: Course, limit: Number) {
    const pass = !(received.students.length <= limit)
    if (pass) {
      return {
        message: () => `expected ${received.students.length} not to comply group limit of ${limit}`,
        pass: true
      }
    } else {
      return {
        message: () => `expected ${received.students.length} to comply group limit ${limit}`,
        pass: false
      }
    }
  },
  toComplyModality(received: Course) {
    let pass

    if (received.modality === "In Group") {
      pass = received.students.length <= GROUP_LIMIT
    } else {
      pass = received.students.length === 1
    }

    if (pass) {
      return {
        message: () => `expected ${received.id} to comply modality`,
        pass: true
      }
    } else {
      return {
        message: () => `expected ${received.id} not to comply modality`,
        pass: false
      }
    }
  },
  toBeSameLevel(received: Course) {
    let level: null | string = null
    let pass = true
    for (const student of received.students) {
      if (level === null) {
        level = student.level
      } else if (level !== student.level) {
        pass = false
      }
    }

    if (pass) {
      return {
        message: () => `expected course id: ${received.id}  students to all be the same level`,
        pass: true
      }
    } else {
      return {
        message: () => `expected course id: ${received.id} students not to be all the same level`,
        pass: false
      }
    }
  }
})

// Acceptance tests
describe('expected behavior of CourseGenerator', () => {
  test('expected properties', () => {
    for (const course of courses) {
      expect(course).toHaveProperty("students")
      expect(course).toHaveProperty("teacher")
      expect(course).toHaveProperty("schedule")
      expect(course).toHaveProperty("level")
    }
  })
  
  test('teacher is available on course schedule', () => {
    for (const course of courses) {
      expect(course.teacher).toBeAvailableOnSchedule(course.teacher, course)
    }
  })

  test('student is available on course schedule', () => {
    for (const course of courses) {
      course.students.forEach((st) => {
        expect(st).toBeAvailableOnSchedule(st, course)
      })
    }
  })

  test('course comply group limit', () => {
    for (const course of courses) {
      expect(course).toComplyGroupLimit(course, GROUP_LIMIT)
    }
  })

  test('course comply modality', () => {
    for (const course of courses) {
      expect(course).toComplyModality(course)
    }
  })

  test("all courses's students to be the same level", () => {
    for (const course of courses) {
      expect(course).toBeSameLevel(course)
    }
  })
})
