/* До нас звернувся невеликий приватний зоопарк для створення застосунку, 
який полегшить управління бізнесом.Нижче опис сутностей, які є на даний момент.
Вам необхідно ознайомиться, поставити уточнювальні запитання, після чого побудувати 
програму на основі наявних у вас знань.Використовуйте шаблони, можливості ТЗ і своє уявлення про прекрасне.
*/
// Проєкт "Зоопарк":

class Department
{
    name: string;
    depEmployeeList: Employee[];
    depBudget: number = 0;

    constructor ( name: string, employees: Employee[] )
    {
        this.name = name;
        this.depEmployeeList = employees;
    }

    getDepartmentName (): string
    {
        return this.name;
    }

    getEmployees (): Employee[]
    {
        return this.depEmployeeList;
    }

    /*
    addEmployee ( employee: Employee ): void
    {
        this.employees.push( employee );
        console.log( `Added ${employee.name} to the ${this.name} department.` );
    }
    

    removeEmployee ( employeeName: string ): void
    {
        const index = this.employees.findIndex( employee => employee.name === employeeName );
        if ( index !== -1 ) {
            const removedEmployee = this.employees.splice( index, 1 )[0];
            console.log( `Removed ${removedEmployee.name} from the ${this.name} department.` );
        } else {
            console.log( `Employee with name ${employeeName} not found in the ${this.name} department.` );
        }
    }
*/

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

class Visitor implements IPerson
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

//"Каса":
class TicketOffice extends Department
{
    visitors: Visitor[];
    clients: Visitor[];
    ticketsSold: ITicket[];
    closingTime: Date;

    constructor ( name = 'Ticket office', closingTime: Date )
    {
        super( name, [] );
        this.visitors = [];
        this.clients = [];
        this.ticketsSold = [];
        this.closingTime = closingTime;
    }

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
        const isClient = this.clients.some( client => client.name === visitor.name && client.contacts === visitor.contacts );
        if ( !isClient ) {
            this.clients.push( visitor );
        }
        this.visitors.push( visitor );
    }

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

/*"Клієнти":
Дані клієнтів зберігаються у Відділу реклами.
Відділ реклами використовує цей список для розсилки новин про зоопарк і рекламні акції.
"Відділ реклами":
Відповідає за маркетингові та рекламні заходи.
Використовує список клієнтів для розсилки новин про зоопарк і рекламні акції.
*/

class Marketing extends Department
{
    private ticketOffice: TicketOffice;

    constructor ( ticketOffice: TicketOffice )
    {
        super( "Marketing", [] );
        this.ticketOffice = ticketOffice;
    }

    sendNotification ( message: string ): void
    {
        this.ticketOffice.clients.forEach( client =>
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

class Accounting extends Department
{
    private expenses: number = 0;
    private ticketOffice: TicketOffice;

    constructor ( ticketOffice: TicketOffice )
    {
        super( "Marketing", [] );
        this.ticketOffice = ticketOffice;
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
        // Assuming income is calculated from TicketOffice's calculateDailyIncome()
        return income - this.expenses;
    }

    paySalaries (): void
    {

    }
}

/*
"Адміністрація":
Відповідає за управління співробітниками і тваринами.
Може додавати і видаляти співробітників і тварин.
Створює сповіщення про рекламні акції та інші важливі події в зоопарку.
*/
class Administration extends Department
{
    private animalList: Animal[];
    private marketing: Marketing;

    constructor ( name: string, employees: Employee[], animalList: Animal[], marketing: Marketing )
    {
        super( name, employees );
        this.animalList = animalList;
        this.marketing = marketing;
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

class Animal implements IAnimal
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
class Employee implements IPerson
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

class EmployeeList
{
    employees: Employee[];

    constructor ( employees: Employee[] )
    {
        this.employees = employees;
    }

    addEmployee ( employee: Employee ): void
    {
        this.employees.push( employee );
        console.log( `Added employee ${employee.name} to the list.` );
    }

    removeEmployee ( employeeName: string ): void
    {
        const index = this.employees.findIndex( employee => employee.name === employeeName );
        if ( index !== -1 ) {
            const removedEmployee = this.employees.splice( index, 1 )[0];
            console.log( `Removed employee ${removedEmployee.name} from the list.` );
        } else {
            console.log( `Employee with name ${employeeName} not found.` );
        }
    }
}

/*
Адміністрація може додавати і видаляти співробітників.



"Бюджет":

Бухгалтерія розпоряджається бюджетом і стежить за фінансами зоопарку.

Можливість вести бюджетний облік і надавати фінансові звіти.;
*/

class Zoo
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