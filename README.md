## About

A solution proposal for [Nulinga's code challenge](https://github.com/nulinga/tentative-courses) written in JavaScript (in super-set with TypeScript) and with [NodeJS](https://nodejs.org/es/) (runtime) and [Jest](https://jestjs.io/) (test framework) as the core dependencies.

## Features

### Required

- Complete set of entities, including: Course, Student and Teacher with type constraints.
- Generation of mock students, teachers and courses based on the requirements.
- Acceptance tests for each important constraint of the Course schema.

### Nice to have

- Students with no assigned courses report.
- Students with tentative assignations, pending of confirmation (when course's schedule differs in X hours from student's schedule).

### Extra

- Dump of the generated data to JSON.

## How to run

1. Install [NodeJS](https://nodejs.org/es/download/) in your system.
2. Clone the repository

    `git clone https://github.com/ijmorales/tentative-courses`
3. Install dependencies 

    `npm install`
4. Run the program 

    `npm run start`
5. *(Optional)* Run tests 

    `npm run test`
6. *(Optional)* Attach a debugger ([Steps for VSCode](https://code.visualstudio.com/docs/nodejs/nodejs-debugging#_attaching-to-nodejs))