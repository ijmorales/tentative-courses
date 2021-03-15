import { Config, names, starWars, uniqueNamesGenerator } from "unique-names-generator";
import { Student } from "./classes/Student"
import { Schedule, ScheduleCollection } from "./classes/Schedule"
import { Teacher } from "./classes/Teacher"
import { DAYS, LEVELS, HOURS } from "./constants";

export function generateStudents (n: Number) : Array<Student> {
  const students: Student[] = []
  const randNameConfig: Config = {
    dictionaries: [names]
  }

  const availableCombinations = getAvailableCombinations()
  
  for (let i = 0; i < n; i++) {
    const randomIdx = getRandomInt(0, availableCombinations.length);
    // Each student has between 1 and 3 hours available a week
    const s = new Student(
      randomName(randNameConfig),
      getRandomInt(0, 2) === 0 ? "Individual" : "In Group",
      LEVELS[getRandomInt(0, LEVELS.length)],
      availableCombinations.slice(randomIdx, randomIdx + getRandomInt(1, 4)) as ScheduleCollection
    )
    students.push(s)
  }

  return students
}

export function generateTeachers(n: Number) : Array<Teacher> {
  const teachers : Teacher[] = []
  const randNameConfig: Config = {
    dictionaries: [starWars]
  }

  const availableCombinations = getAvailableCombinations()

  for (let i = 0; i < n; i++) {
    // Each teacher works between 2 and 10 hours a week
    const randomIdx = getRandomInt(0, availableCombinations.length)
    const randomWorkHours = getRandomInt(2, 11)
    const t: Teacher = new Teacher(
      randomName(randNameConfig),
      availableCombinations.slice(randomIdx, randomIdx + randomWorkHours) as ScheduleCollection
    )
    teachers.push(t)
  }

  return teachers;
}

// Fisher-Yates Shuffle function
function shuffle(array: Array<any>) {
  let counter = array.length;

  while (counter > 0) {
    let index = Math.floor(Math.random() * counter);

    counter--;

    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

function getRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function randomName(config: Config) {
  return uniqueNamesGenerator(config)
}

function getAvailableCombinations() : ScheduleCollection {
  const availableCombinations = new ScheduleCollection()
  DAYS.forEach((d) => {
    HOURS.forEach((h) => {
      availableCombinations.push(new Schedule(d, h))
    })
  });
  return shuffle(availableCombinations) as ScheduleCollection
}
