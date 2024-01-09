//Визначте інтерфейс, який використовує сигнатуру індексу з типами об'єднання. 
//Наприклад, тип значення для кожного ключа може бути число | рядок.;
interface iOne
{
    [index: string]: number | string;
}

const One: iOne = {
    a: 1,
    1: 'test'
};

//Створіть інтерфейс, у якому типи значень у сигнатурі індексу є функціями. 
//Ключами можуть бути рядки, а значеннями — функції, які приймають будь - які аргументи.

interface iTwo
{
    [key: string]: ( param: any ) => any;
}

const Two: iTwo = {
    funcOne: ( a = 1 ) =>
    {
        if ( a > 0 ) {
            console.log( 'True' );
        }
    }
};

//Опишіть інтерфейс, який використовує сигнатуру індексу для опису об'єкта, подібного до масиву. 
//Ключі повинні бути числами, а значення - певного типу.;
type myType = {
    x: number;
    y: number;
};
interface iThree
{
    [index: number]: myType;
    length: number;
}

const Three = {
    1: { x: 1, y: 2 },
    2: { x: 11, y: 22 },
    length: 2
};

//Створіть інтерфейс з певними властивостями та індексною сигнатурою. 
//Наприклад, ви можете мати властивості типу name: string 
//та індексну сигнатуру для додаткових динамічних властивостей.

interface iFour
{
    name: string,
    lastname: string,
    [key: number | string]: string;
}

const Four: iFour = {
    name: 'Jhon',
    lastname: 'Smith',
    zodiac: 'capricorn',
    911: 'call wife'
};

//Створіть два інтерфейси, один з індексною сигнатурою, а інший розширює перший, додаючи специфічні властивості.
interface iFive
{
    [key: number | string]: string;
}

interface iFiveDash extends iFive
{
    name: string,
    lastname: string,
}

const Five: iFive = {
    birth: 'test'
};

const FiveDesh: iFiveDash = {
    birth: 'test',
    911: 'son',
    name: 'John',
    lastname: 'Smith'
};

//Напишіть функцію, яка отримує об'єкт з індексною сигнатурою і перевіряє, 
//чи відповідають значення певних ключів певним критеріям
//( наприклад, чи всі значення є числами ).;
interface Target
{
    [key: string]: number | string;
}

function checkValues ( target: Target ): boolean
{
    const keys = Object.keys( target );
    console.log( keys );
    for ( const key of keys ) {
        console.log( target[key] );
        const value = target[key];
        console.log( typeof value );
        if ( typeof value !== 'number' ) {
            return false;
        }
    }
    return true;
}

const myTarget: Target = {
    a: 1,
    b: 2,
    c: 3,
    d: 'a'
};

console.log( checkValues( myTarget ) );

