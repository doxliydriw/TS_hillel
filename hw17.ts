// Проєкт "Зоопарк":

export class Department
{
    name: string;
    depEmployeeList: Employee[];
    depBudget: number = 0;

    constructor ( name: string, employees: EmployeeList )
    {
        this.name = name;
        this.depEmployeeList = employees.getDepartmentList( name );
    }
    getDepartmentName (): string
    {
        return this.name;
    }
    getEmployees (): Employee[]
    {
        return this.depEmployeeList;
    }
    setBudget ( amount: number ): void
    {
        this.depBudget = amount;
        console.log( `Budget for ${this.name} department has been set to ${amount}.` );
    }
    getBudget (): number
    {
        return this.depBudget;
    }
    calculateExpenses (): number
    {
        let totalExpenses = 0;
        this.depEmployeeList.forEach( employee =>
        {
            totalExpenses += employee.salary;
        } );
        return totalExpenses;
    }
}

//Квитки можуть бути трьох видів: дорослі, дитячі та сімейні.
// Кожен квиток має вартість.
enum TicketType
{
    adult = 20,
    child = 10,
    family = 50
}
interface ITicket
{
    type: TicketType;
    price: number;
    buyer: IPerson;
}
interface IPerson
{
    name: string;
    age: number;
}
/*
interface IObserver
{
    update ( observable: IObservable ): void;
}

interface IObservable
{
    attach ( observer: IObserver ): void;
    detach ( observer: IObserver ): void;
    notify (): void;
}

abstract class Observable implements IObservable
{
    private readonly observers: IObserver[] = [];
    public attach ( observer: IObserver ): void
    {
        const isExist = this.observers.includes( observer );
        if ( isExist )
            return console.log( 'Observable: Observer has been already attached.' );
        this.observers.push( observer );
        console.log( 'Observable: Attached an observer' );

    }

    public detach ( observer: IObserver ): void
    {
        const obseverIndex = this.observers.indexOf( observer );

        if ( obseverIndex === -1 )
            return console.log( 'Observable: No such observer.' );
        this.observers.splice( obseverIndex, 1 );
        console.log( 'Observable: Detached on observer.' );
    }

    public notify (): void
    {
        console.log( 'Observable: Notifying observer:' );
        for ( const observer of this.observers ) {
            observer.update( this );
        }
    }
}
*/
export class Visitor implements IPerson
{
    name: string;
    age: number;
    contacts: string;

    constructor ( name: string, age: number, contacts: string )
    {
        this.name = name;
        this.age = age;
        this.contacts = contacts;
    }
    notify ( message: string )
    {
        console.log( `${this.name}: ${message}` );
    }
}
/*"Клієнти":
Дані клієнтів зберігаються у Відділу реклами.
Відділ реклами використовує цей список для розсилки новин про зоопарк і рекламні акції.
*/
export class ClientList
{
    list: Visitor[] = [];
    addClient ( client: Visitor ): void
    {
        if ( !this.list.includes ) {
            this.list.push( client );
        }
    }
}

//"Каса":
export class TicketOffice extends Department
{
    visitors: Visitor[];
    clients: ClientList;
    ticketsSold: ITicket[];
    closingTime: Date;

    constructor ( name = 'Ticket office', employees: EmployeeList, closingTime: Date )
    {
        super( name, employees );
        this.visitors = [];
        this.clients = new ClientList();
        this.ticketsSold = [];
        this.closingTime = closingTime;
    }
    /*Відповідає за продаж квитків.
    Під час продажу квитка, Каса додає дані про відвідувача у два списки:
    поточні відвідувачі та клієнти.
    Зберігає інформацію про відвідувачів, включаючи їхні імена та контактні дані.
    */
    sellTicket ( buyer: Visitor, ticketType: TicketType ): ITicket
    {
        const price = ticketType;
        const ticket: ITicket = {
            type: ticketType,
            price: price,
            buyer: buyer
        };
        this.addVisitor( buyer );
        return ticket;
    }
    addVisitor ( visitor: Visitor ): void
    {
        this.clients.addClient( visitor );
        this.visitors.push( visitor );
    }
    //Можливість оповіщення відвідувачів за 15 хвилин до закриття і перед відходом.
    informBeforeClosing (): void
    {
        const timeUntilClosing = this.closingTime.getTime() - new Date().getTime();
        if ( timeUntilClosing > 0 && timeUntilClosing <= 900000 ) {
            const message = `The zoo will close in 15 minutes. Please start making your way to the exit.`;
            this.visitors.forEach( visitor => visitor.notify( message ) );
        }
    }
    informOnLeaving ( visitor: Visitor ): void
    {
        const message = `Thank you for visiting the zoo. We hope you had a great time!`;
        visitor.notify( message );
        this.visitors = this.visitors.filter( v => v !== visitor );
    }
    calculateDailyIncome (): number
    {
        let totalIncome = 0;
        this.ticketsSold.forEach( ticket =>
        {
            totalIncome += ticket.price;
        } );
        return totalIncome;
    }
}

/* "Відділ реклами":
Відповідає за маркетингові та рекламні заходи.
*/
export class Marketing extends Department
{
    private clientsList: ClientList;

    constructor ( clientsList: ClientList, employees: EmployeeList )
    {
        super( "Marketing", employees );
        this.clientsList = clientsList;
    }
    //Відділ реклами використовує цей список для розсилки новин про зоопарк і рекламні акції.
    sendNotification ( message: string ): void
    {
        this.clientsList.list.forEach( client =>
        {
            console.log( `Sending notification to ${client.name}: ${message}` );
            client.notify( message );
        } );
    }
}

/*
"Виручка":
Каса збирає дані про виручку за день.
Ці дані передаються в Бухгалтерію.
"Бухгалтерія":
Відповідає за фінансове управління зоопарку.
Розпоряджається бюджетом, включно з оплатою співробітників, закупівлею корму для тварин і обслуговуванням зоопарку.
Зберігає дані про всіх співробітників, тварин і виплати.
Можливість генерувати фінансові звіти.
*/

export class Accounting extends Department
{
    private expenses: number = 0;
    private ticketOffice: TicketOffice;
    companyBubget: number;

    constructor ( ticketOffice: TicketOffice, employees: EmployeeList, companyBudget: number )
    {
        super( "Marketing", employees );
        this.ticketOffice = ticketOffice;
        this.companyBubget = companyBudget;
    }
    calculateCompanyExpenses ( departments: Department[] ): void
    {
        let totalExpenses = 0;
        departments.forEach( department =>
        {
            totalExpenses += department.calculateExpenses();
        } );
        this.expenses = totalExpenses;
    }
    calculateCompanyBudget ( income: number ): number
    {
        return income - this.expenses;
    }
    paySalary ( employee: Employee ): void
    {
        this.companyBubget - employee.salary;
    }
}

/*
"Адміністрація":
Відповідає за управління співробітниками і тваринами.

Створює сповіщення про рекламні акції та інші важливі події в зоопарку.
*/
export class Administration extends Department
{
    private animalList: Animal[];
    private marketing: Marketing;
    private companyEmployeeList: EmployeeList;

    constructor (
        name: string,
        employees: EmployeeList,
        animalList: Animal[],
        marketing: Marketing,
    )
    {
        super( name, employees );
        this.animalList = animalList;
        this.marketing = marketing;
        this.companyEmployeeList = employees;
    }
    addAnimal ( animal: Animal ): void
    {
        this.animalList.push( animal );
        this.marketing.sendNotification( `New animal ${animal.name} has been added to the zoo.` );
    }
    removeAnimal ( animalName: string ): void
    {
        const index = this.animalList.findIndex( animal => animal.name === animalName );
        if ( index !== -1 ) {
            const removedAnimal = this.animalList.splice( index, 1 )[0];
            console.log( `Removed ${removedAnimal.name} from the list of animals.` );
        } else {
            console.log( `Animal with name ${animalName} not found.` );
        }
    }
    //Адміністрація може додавати і видаляти співробітників.
    addEmployee ( employee: Employee ): void
    {
        this.companyEmployeeList.addEmployee( employee );
    }
    removeEmployee ( employeeName: string ): void
    {
        this.companyEmployeeList.removeEmployee( employeeName );
    }
    createCampaign ( message: string )
    {
        this.marketing.sendNotification( message );
    }
}

/*
"Тварини":
Включає в себе інформацію про кожну тварину, таку як вид, ім'я, вік, здоров'я та інші характеристики.
*/
interface IAnimal
{
    animalClass: string;
    birthDate: Date;
    name: string;
    healthStatus: string;
}
export class Animal implements IAnimal
{
    animalClass: string;
    birthDate: Date;
    name: string;
    healthStatus: string;

    constructor ( animalClass: string, birthDate: Date, name: string, healthStatus: string ) 
    {
        this.animalClass = animalClass;
        this.birthDate = birthDate;
        this.name = name;
        this.healthStatus = healthStatus;
    }

}
/*
"Співробітники":
*/
export class Employee implements IPerson
{
    name: string;
    age: number;
    jobTitle: string;
    department: string;
    private _salary: number = 0;

    constructor ( name: string, age: number, department: string, jobTitle: string )
    {
        this.name = name;
        this.age = age;
        this.department = department;
        this.jobTitle = jobTitle;
    }
    //Співробітники можуть мати різні посади та обов'язки, які слід враховувати.;
    changeJobTitle ( newTitle: string ): void
    {
        this.jobTitle = newTitle;
        console.log( `Changed ${this.name}'s job title to ${newTitle}.` );
    }

    changeDepartment ( department: string ): void
    {
        this.department = department;
    };

    get salary (): number
    {
        return this._salary;
    }

    set salary ( value: number )
    {
        this._salary = value;
    }
}
export class EmployeeList
{
    employees: Employee[];

    constructor ( employees: Employee[] )
    {
        this.employees = employees;
    }

    getDepartmentList ( departmentName: string ): Employee[]
    {
        return this.employees.filter( ( employee ) => employee.department === departmentName );
    }

    findEmployee ( name: string ): boolean
    {
        return this.employees.some( employee => employee.name === name );
    }

    addEmployee ( employee: Employee ): void
    {
        this.employees.push( employee );
        console.log( `Added employee ${employee.name} to the list.` );
    }

    removeEmployee ( employeeName: string ): EmployeeList | undefined
    {
        if ( this.findEmployee( employeeName ) ) {
            const index = this.employees.findIndex( employee => employee.name === employeeName );
            const removedEmployee = this.employees.splice( index, 1 )[0];
            console.log( `Removed employee ${removedEmployee.name} from the list.` );
            return this;
        } else {
            console.log( `Employee with name ${employeeName} not found.` );
            return undefined;
        }
    }
}
/*
"Бюджет":

Бухгалтерія розпоряджається бюджетом і стежить за фінансами зоопарку.

Можливість вести бюджетний облік і надавати фінансові звіти.;
*/

export class Zoo
{
    name: string; //має назву
    private departmentList: Department[] = []; // список департаментів
    private AllEmployeesList: EmployeeList; //список усього персоналу компанії - співробітники всіх департаментів

    constructor ( name: string, AllEmployeesList: EmployeeList )
    {
        this.name = name;
        this.AllEmployeesList = AllEmployeesList;
    }
    //додати Департамент
    addDepartment ( department: Department ): void
    {
        this.departmentList.push( department );
    }
    //отримати списко Департаментів
    getdepartmentList (): Department[]
    {
        return this.departmentList;
    }
    //отримати список всіх працівників
    getAllEmployeesList (): EmployeeList
    {
        return this.AllEmployeesList;
    }
}