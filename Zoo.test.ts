import { Employee, EmployeeList } from './hw17';

describe( 'EmployeeList', () =>
{
    const employee1 = new Employee( 'John', 23, 'Marketing', 'manager' );
    const employee2 = new Employee( 'Jane', 32, 'Accountning', 'manager' );
    it( 'should get department list', () =>
    {
        const employees = [
            employee1,
            employee2,
        ];
        console.log( employees );

        const employeeList = new EmployeeList( employees );
        const marketingEmployees = employeeList.getDepartmentList( 'Marketing' );
        expect( marketingEmployees.length ).toBe( 1 );
        expect( marketingEmployees[0].name ).toBe( 'John' );
    } );

    it( 'should find employee by name', () =>
    {
        const employees = [
            employee1,
            employee2,
        ];
        const employeeList = new EmployeeList( employees );
        expect( employeeList.findEmployee( 'John' ) ).toBeTruthy();
        expect( employeeList.findEmployee( 'Bob' ) ).toBeFalsy();
    } );
} );