import { generateStudents, generateTeachers } from "./utils"
import { CourseGenerator } from "./classes"

function main() {
  while(true) {
    console.log("Nulinga Code Challenge @ https://github.com/nulinga/tentative-courses")
    const scheduleFlexibilityHours = 1
    const students = generateStudents(10000);
    const teachers = generateTeachers(800);
    const courses = new CourseGenerator(students, teachers, scheduleFlexibilityHours).generate();
    console.log(courses)
  }
}

main()



