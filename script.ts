class School {
    // implement 'add area', 'remove area', 'add lecturer', and 'remove lecturer' methods

    _areas: Area[] = [];
    _lecturers: Lecturer[] = []; // Name, surname, position, company, experience, courses, contacts

    get areas(): Area[] {
        return this._areas;
    }

    get lecturers(): Lecturer[] {
        return this._lecturers;
    }

    addArea(area: Area): void {
        this._areas.push(area);
    }

    removeArea(area: Area): void {
        const index = this._areas.indexOf(area);
        if (index !== -1) {
            this._areas.splice(index, 1);
        }
    }

    addLecturer(lecturer: Lecturer): void {
        this._lecturers.push(lecturer);
    }

    removeLecturer(lecturer: Lecturer): void {
        const index = this._lecturers.indexOf(lecturer);
        if (index !== -1) {
            this._lecturers.splice(index, 1);
        }
    }
}

class Lecturer {
    _name: string;
    _surname: string;
    _position: string;
    _company: string;
    _experience: number;
    _courses: string[];
    _contacts: string;

    constructor(name: string, surname: string, position: string, company: string, experience: number, courses: string[], contacts: string) {
        this._name = name;
        this._surname = surname;
        this._position = position;
        this._company = company;
        this._experience = experience;
        this._courses = courses;
        this._contacts = contacts;
    }

}

class Area {
    // implement getters for fields and 'add/remove level' methods
    _levels: Level[] = [];
    _name: string;

    constructor(name: string) {
        this._name = name;
    }

    get levels(): Level[] {
        return this._levels;
    }

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }

    addLevel(level: Level): void {
        this._levels.push(level);
    }

    removeLevel(level: Level): void {
        const index = this._levels.indexOf(level);
        if (index !== -1) {
            this._levels.splice(index, 1);
        }
    }
}

class Level {
    // implement getters for fields and 'add/remove group' methods

    _groups: Group[] = [];
    _name: string;
    _description: string;

    constructor(name: string, description: string) {
        this._name = name;
        this._description = description;
    }

    get groups(): Group[] {
        return this._groups;
    }

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }

    get description(): string {
        return this._description;
    }

    set description(value: string) {
        this._description = value;
    }

    addGroup(group: Group): void {
        this._groups.push(group);
    }

    removeGroup(group: Group): void {
        const index = this._groups.indexOf(group);
        if (index !== -1) {
            this._groups.splice(index, 1);
        }
    }
}

class Group {
    // implement getters for fields and 'add/remove student' and 'set status' methods

    _area!: string;
    _status!: string;
    _students: Student[] = []; // Modify the array so that it has a valid toSorted method*
    _directionName: string;
    _levelName: string;

    constructor(directionName: string, levelName: string) {
        this._directionName = directionName;
        this._levelName = levelName;
    }

    get area(): string {
        return this._area;
    }

    set area(value: string) {
        this._area = value;
    }

    get status(): string {
        return this._status;
    }

    set status(value: string) {
        this._status = value;
    }

    get directionName(): string {
        return this._directionName;
    }

    set directionName(value: string) {
        this._directionName = value;
    }

    get levelName(): string {
        return this._levelName;
    }

    set levelName(value: string) {
        this._levelName = value;
    }
    get students(): Student[] {
        return this._students;
    }

    addStudent(student: Student): void {
        this._students.push(student);
    }

    removeStudent(student: Student): void {
        const index = this._students.indexOf(student);
        if (index !== -1) {
            this._students.splice(index, 1);
        }
    }

    setStatus(status: string): void {
        this._status = status;
    }

    //As .toSorted is a new feature i've updated tsconfig.json to read: "lib": [
    //"ESNext.Array",
    //"DOM",
    //"ESNext",
    //]
    showPerformance(): Student[] {
        const sortedStudents = this._students.toSorted((a, b) => b.getPerformanceRating() - a.getPerformanceRating());
        return sortedStudents;
    }
}

class Student {
    // implement 'set grade' and 'set visit' methods

    _firstName: string;
    _lastName: string;
    _birthYear: number;
    _grades: { [workName: string]: number } = {}; // workName: mark
    _visits: { [lesson: string]: boolean } = {}; // lesson: present

    constructor(firstName: string, lastName: string, birthYear: number) {
        this._firstName = firstName;
        this._lastName = lastName;
        this._birthYear = birthYear;
    }

    get fullName(): string {
        return `${this._lastName} ${this._firstName}`;
    }

    set fullName(value: string) {
        [this._lastName, this._firstName] = value.split(' ');
    }

    get age(): number {
        return new Date().getFullYear() - this._birthYear;
    }

    // implement 'set grade' method
    setGrade(workName: string, mark: number): void {
        this._grades[workName] = mark;
    }

    // implement 'set visit' method
    setVisit(lesson: string, present: boolean): void {
        this._visits[lesson] = present;
    }

    getPerformanceRating(): number {
        const gradeValues: number[] = Object.values(this._grades);

        if (!gradeValues.length) return 0;

        const averageGrade: number = gradeValues.reduce((sum, grade) => sum + grade, 0) / gradeValues.length;
        const attendancePercentage: number =
            (Object.values(this._visits).filter(present => present).length / Object.values(this._visits).length) * 100;

        return (averageGrade + attendancePercentage) / 2;
    }
}