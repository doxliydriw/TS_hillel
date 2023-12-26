// Enum для domainArea
enum DomainArea
{
    IT = "IT",
    Finance = "Finance",
    Marketing = "Marketing"
}

//сутність - Компанія
class Company
{
    private name: string; //має назву
    private departmentList: Department[] = []; // список департаментів
    private NewEmployeesList: NewEmployee[] = []; //список попередньо найнятого персоналу
    private AllEmployeesList: Employee[] | NewEmployee[] = []; //список усього персоналу компанії - співробітники всіх департаментів і попередньо найняті

    constructor ( name: string )
    {
        this.name = name;
    }

    //додати Департамент
    addDepartment ( department: Department ): void
    {
        this.departmentList.push( department );
    }
    //додати попередьо найнятого працівника
    addNewEmployee ( employee: NewEmployee ): void
    {
        this.NewEmployeesList.push( employee );
    }
    //отримати списко Департаментів
    getdepartmentList (): Department[]
    {
        return this.departmentList;
    }
    //отримати список попередьо найнятих працівників
    getNewEmployeesList (): NewEmployee[]
    {
        return this.NewEmployeesList;
    }
    //отримати список всіх працівників
    getAllEmployeesList (): Employee[] | NewEmployee[]
    {
        let AllEmployeesList: Employee[] | NewEmployee[] = [...this.NewEmployeesList,];
        for ( let i of this.departmentList ) {
            AllEmployeesList = AllEmployeesList.concat( i.getdepartmentEmployeeList() );
        }
        return this.AllEmployeesList;
    }


}
//Сутність Департамент
class Department
{
    private name: string; // має назву
    private domainArea: DomainArea; //доменну область
    private departmentEmployeeList: Employee[] = []; //список своїх співробітників
    //бюджет, що складається з дебіту і кредиту
    private debit: number = 0;
    private credit: number = 0;

    constructor ( name: string, domainArea: DomainArea )
    {
        this.name = name;
        this.domainArea = domainArea;
    }

    getdepartmentEmployeeList (): Employee[]
    {
        return this.departmentEmployeeList;
    }

    getDepartmentName (): string
    {
        return this.name;
    }

    getDomainArea (): DomainArea
    {
        return this.domainArea;
    }

    get budget (): number
    {
        return this.debit - this.credit;
    }
    //метод для обчислення балансу виходячи з поточного бюджету
    calculateBalance (): number
    {
        return this.budget;
    }
    //додавання нових співробітників який враховує зміни балансу і 
    //перетворення з Попередньо найнятого на Співробітника або 
    //видалення Співробітника з минулого відділу
    addEmployee ( employee: Employee | NewEmployee ): void
    {
        if ( employee instanceof Employee ) {
            this.departmentEmployeeList.push( employee );
            employee.setDepartment( this.name );
        }
        else {
            this.departmentEmployeeList.push( employee.toEmployee( 'Active', this.name ) );
        }
        this.credit += employee.getSalary();
    }



}
//сутність Бухгалтерія, яка є департаментом
class AccountningDepartment extends Department
{
    private balance: number; //має властивість баланс

    constructor ()
    {
        super( 'Accounting', DomainArea.Finance );
        this.balance = 0;
    }

    // Метод для взяття на баланс співробітника або департаменту
    takeOnBalance ( amount: Employee | Department ): void
    {
        if ( amount instanceof Employee ) {
            this.balance += amount.getSalary();
        }
        else {
            this.balance += amount.budget;
        }
    }

    // Метод для зняття з балансу
    withdrawFromBalance ( amount: Employee | Department ): void
    {
        if ( amount instanceof Employee ) {
            this.balance -= amount.getSalary();
        }
        else {
            this.balance -= amount.budget;
        }
    }

    // Метод для виплати зарплати для всього персоналу
    paySalaries ( company: Company ): void
    {
        for ( const employee of company.getAllEmployeesList() ) {
            if ( employee instanceof Employee && employee.getStatus() === 'Active' ) {
                //платіж заробітної плати за допомогою внутрішніх виплат
            }
            else {
                //платіж заробітної плати за допомогою зовнішніх виплат
            }
        }

    }
}


//Сутність Попередньо найнятого співробітника
class NewEmployee
{
    private name: string; //має імʼя
    private lastName: string; //прізвіще 
    private salary: number;//зарплата
    private bankDetails: string;//номер банківського рахунку

    constructor ( name: string, lastName: string, salary: number, bankDetails: string )
    {
        this.name = name;
        this.lastName = lastName;
        this.salary = salary;
        this.bankDetails = bankDetails;

    }

    getSalary ()
    {
        return this.salary;
    }
    //Метод переведеення з Попередьонайнятого до Діючого Співробітника:
    toEmployee ( status: "Active" | "Inactive" | "OnUnpaidLeave", department: string ): Employee
    {
        return new Employee( this.name, this.lastName, this.salary, this.bankDetails, status, department );
    }
}


//Сутність співробітника
class Employee extends NewEmployee
{
    private status: "Active" | "Inactive" | "OnUnpaidLeave"; //статус
    private department: string; //назву департаменту до якого прикріплений

    constructor ( name: string, lastName: string, salary: number, bankDetails: string, status: "Active" | "Inactive" | "OnUnpaidLeave", department: string )
    {
        super( name, lastName, salary, bankDetails );
        this.status = status;
        this.department = department;
    }

    getStatus (): "Active" | "Inactive" | "OnUnpaidLeave"
    {
        return this.status;
    }

    getDepartment (): string
    {
        return this.department;
    }

    setDepartment ( department: string )
    {
        return department;
    };
}


