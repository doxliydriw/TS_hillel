// 1. Створіть інтерфейс з декількома властивостями. Відтворіть ту саму структуру завдяки Type alias.
interface IUser
{
    id: number;
    name: string;
    email: string;
}
type TypeUser = {
    id: number;
    name: string;
    email: string;
};
// 2. Створіть інтерфейс з анотацією будь - якого функціонального виразу.Відтворіть ту саму структуру завдяки Type alias.
interface ISetName
{
    ( name: string ): string;
}
type SetName = ( name: string ) => string;
// 3. На відміну від інтерфейсу, псевдонім типу також можна використовувати для інших типів, 
// таких як примітиви, об’єднання та кортежі.Продемонструйте у коді цей вираз:
//  створіть псевдонім типу для примітивного значення, обʼєднання та кортежу.

type SomeText = string;

type Status = "logedin" | "logedout";

type IdList = [number, number];
/* 4. І Interface, і Type alias можна розширити, але синтаксис відрізняється.
Крім того, зауважте, що інтерфейс і псевдонім типу не виключають один одного.
Тобто інтерфейс може розширювати псевдонім типу, і навпаки.
Продемонструйте цей вираз у вашому коді:
*/
// - один інтерфейс розширює інший;
interface AdminUser extends IUser
{
    isAdmin: boolean;
}
// - один інтерфейс розширює псевдонім типу;
interface ISuperUser extends TypeUser
{
    permissions: string[];
}
// - один псевдонім типу розширює інтерфейс;
type BannedUser = IUser & {
    banned: boolean;
};
// - один псевдонім типу розширює інший.
type PatreonUser = TypeUser & {
    patreon: boolean;
};

/* 5. Клас може реалізувати інтерфейс або псевдонім типу, і те, і інше точно таким же чином.
Однак зауважте, що клас та інтерфейс вважаються статичними структурами.
Як ви думаєте, на що це впливає ? 
Створіть класи, котрі будуть реалізовувати в одному випадку інтерфейси, а в іншому псевдонім типу.
Наприкінці, спробуйте вимусити клас реалізувати псевдонім типу, який іменує тип об’єднання. */

class UserClass
{
    constructor ( public id: number, public name: string, public email: string ) { }
}

let user: IUser | TypeUser;

const condition = true;

if ( condition ) {
    class User extends UserClass implements IUser { }
    user = new User( 1, "John", "john@test.com" );
} else {
    class User extends UserClass implements TypeUser { }
    user = new User( 2, "Sarah", "sarah@test.com" );
}

console.log( user );

class TestStatus
{
    _status: Status;
    constructor ( status: Status )
    {
        this._status = status;
    }
}

const StatusTest = new TestStatus( 'logedin' );


/* 6. На відміну від псевдоніма типу, інтерфейс можна визначати кілька разів 
і розглядатиметься як єдиний інтерфейс( з об’єднаними членами всіх декларацій ).
Продемонструйте цю властивість інтерфейсів у своєму рішенні. */

interface IUser1
{
    name: string;
}

interface IUser2
{
    age: number;
}

interface CombinedInterface extends IUser1, IUser2 { }

const obj: CombinedInterface = { name: "John", age: 42 };
console.log( obj.name );
console.log( obj.age );
