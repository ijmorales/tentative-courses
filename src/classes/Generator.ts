import {v4 as uuidv4} from 'uuid'
import { Student, Teacher, Course } from "."

export class CourseGenerator {
  students: Array<Student>
  teachers: Array<Teacher>
  scheduleFlexibilityHours: Number

  generate() : [Course[], Student[]] {
    let leftStudents = this.students

    const courses: Array<Course> = []
    leftStudents.forEach((s) => {
      const students: Array<Student> = []
      const course = new Course()
      course.id = uuidv4()
      course.level = s.level
      course.modality = s.modality

      // Busco si hay alguno horario del estudiante en los que haya docentes disponibles
      const schedule = s.availability.find(stSchedule => this.teachers.find((t) => t.getFreeHours().includesDeep(stSchedule)))
      if (schedule === undefined) { return }

      
      // Busco docentes que tengan ese horario disponible
      course.schedule = schedule
      course.teacher = this.teachers.find((t) => t.getFreeHours().includesDeep(schedule)) as Teacher

      // Saco de la lista de restantes el estudiante que acabo de agregar
      course.students.push(s)
      leftStudents = leftStudents.filter((st) => st !== s)
      
      // Busco otros estudiantes que podrian agregarse al grupo
      const groupMembersLimit = course.modality === "Individual" ? 1 : 6
      for (const st of leftStudents) {
        if (course.students.length < groupMembersLimit) {
          if (st.shouldJoinCourse(course, this.scheduleFlexibilityHours)) {
            course.students.push(st)
          }
        } else {
          break
        }
      }

      // Saco de mi lista de pendientes a los estudiantes del curso que acabo de crear
      leftStudents = leftStudents.filter((s) => !course.students.includes(s))

      // Marco al docente asignado como busy para evitar 2 asignaciones en el mismo horario
      course.teacher.assignSchedule(schedule)
      courses.push(course)
    })

    return [courses, leftStudents];
  }

  constructor (students: Array<Student>, teachers: Array<Teacher>, scheduleFlexibilityHours: Number = 0) {
    this.students = students
    this.teachers = teachers
    this.scheduleFlexibilityHours = scheduleFlexibilityHours
  }
}