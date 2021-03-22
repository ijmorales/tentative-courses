import { generateStudents, generateTeachers, saveJSONToFile } from './utils'
import { CourseGenerator } from './classes'

const DEV = false
const SAVE_TO_JSON = true

function main () {
  console.log('Nulinga Code Challenge @ https://github.com/nulinga/tentative-courses')

  const scheduleFlexibilityHours = 1
  const students = generateStudents(100)
  const teachers = generateTeachers(10)
  const [courses, leftStudents] = new CourseGenerator(students, teachers, scheduleFlexibilityHours).generate()

  console.log(courses)

  if (SAVE_TO_JSON) {
    const savedFiles = saveJSONToFile(JSON.stringify(courses, null, 2), JSON.stringify(leftStudents, null, 2))
    console.log('\nSaved JSON dumps to: \n', savedFiles)
  }
}

if (DEV) {
  // If DEV, run the program in a loop so it's easier to attach the debugger
  while (true) {
    main()
  }
} else {
  main()
}
