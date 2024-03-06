/* До нас звернувся невеликий приватний зоопарк для створення застосунку, 
який полегшить управління бізнесом.Нижче опис сутностей, які є на даний момент.
Вам необхідно ознайомиться, поставити уточнювальні запитання, після чого побудувати 
програму на основі наявних у вас знань.Використовуйте шаблони, можливості ТЗ і своє уявлення про прекрасне.
*/
// Проєкт "Зоопарк":

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
}

interface IPerson
{
    name: string;
    age: number;
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
class TicketOffice
{
    visitors: Visitor[] = [];
    clients: Visitor[] = [];
    ticketsSold: ITicket[] = [];
    private closingTime: Date;

    constructor ( closingTime: Date )
    {
        this.closingTime = closingTime;
    }

    //Відповідає за продаж квитків.
    sellTicket ( client: Visitor, ticketType: TicketType ): ITicket
    {
        const price = ticketType;
        const ticket: ITicket = {
            type: ticketType,
            price: price
        };
        // Під час продажу квитка, Каса додає дані про відвідувача у два списки: поточні відвідувачі та клієнти.
        this.addVisitor( client );
        return ticket;
    }
    /* "Поточні відвідувачі":
    Зберігає інформацію про відвідувачів, включаючи їхні імена та контактні дані. */
    addVisitor ( visitor: Visitor ): void
    {
        const isClient = this.clients.some( client => client.name === visitor.name && client.contacts === visitor.contacts );
        if ( !isClient ) {
            this.clients.push( visitor );
        }
        this.visitors.push( visitor );
    }
    //Можливість оповіщення відвідувачів за 15 хвилин до закриття і перед відходом.
    informBeforeClosing (): void
    {
        const timeUntilClosing = this.closingTime.getTime() - new Date().getTime();
        if ( timeUntilClosing > 0 && timeUntilClosing <= 900000 ) { // 15 minutes = 900000 milliseconds
            const message = `The zoo will close in 15 minutes. Please start making your way to the exit.`;
            this.visitors.forEach( visitor => visitor.notify( message ) );
        }
    }

    informOnLeaving ( visitor: Visitor ): void
    {
        const message = `Thank you for visiting the zoo. We hope you had a great time!`;
        visitor.notify( message );
        this.visitors = this.visitors.filter( v => v !== visitor ); // Remove visitor from the list
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

class Marketing
{
    ticketOffice: TicketOffice;

    constructor ( ticketOffice: TicketOffice )
    {
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

"Адміністрація":

Відповідає за управління співробітниками і тваринами.

Може додавати і видаляти співробітників і тварин.

Створює сповіщення про рекламні акції та інші важливі події в зоопарку.

"Тварини":
Включає в себе інформацію про кожну тварину, таку як вид, ім'я, вік, здоров'я та інші характеристики.
*/
interface Animal
{
    class: string;
    birth: Date;
    name: string;
    healthStatus: string;
}

class Animals
{
    listOfAnimals: Animal[];

    constructor ( animalList: Animal[] )
    {
        this.listOfAnimals = animalList;
    }

    addAnimal ( animal: Animal ): void
    {
        this.listOfAnimals.push( animal );
        console.log( `Added ${animal.name} to the list of animals.` );
    }

    removeAnimal ( animalName: string ): void
    {
        const index = this.listOfAnimals.findIndex( animal => animal.name === animalName );
        if ( index !== -1 ) {
            const removedAnimal = this.listOfAnimals.splice( index, 1 )[0];
            console.log( `Removed ${removedAnimal.name} from the list of animals.` );
        } else {
            console.log( `Animal with name ${animalName} not found.` );
        }
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

    constructor ( name: string, age: number, jobTitle: string )
    {
        this.name = name;
        this.age = age;
        this.jobTitle = jobTitle;
    }

    changeJobTitle ( newTitle: string ): void
    {
        this.jobTitle = newTitle;
        console.log( `Changed ${this.name}'s job title to ${newTitle}.` );
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

Співробітники можуть мати різні посади та обов'язки, які слід враховувати.;

"Бюджет":

Бухгалтерія розпоряджається бюджетом і стежить за фінансами зоопарку.

Можливість вести бюджетний облік і надавати фінансові звіти.;
*/