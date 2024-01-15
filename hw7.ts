// Фільтрація масиву

// Напишіть узагальнену функцію filterArray( array, condition ), 
//яка фільтрує масив елементів на основі наданої умови.;

function filterArray<T> ( array: T[], conditionFunc: ( elem: T ) => boolean ): T[]
{
    let result = array.filter( function ( elem )
    {
        return conditionFunc( elem );
    } );
    return result;
}


const numbers = [1, 2, 3, 4, 5];
const filteredResult = filterArray( numbers, num => num > 3 );
console.log( filteredResult );


//Узагальнений стек

//Створіть узагальнений клас Stack,
//який являє собою стек елементів з методами push, pop і peek.;

class Stack<T>
{
    genericValue: T[];

    constructor ( genericValue: T[] )
    {
        this.genericValue = genericValue;
    }

    push ( elem: T )
    {
        this.genericValue.push( elem );
    }

    pop (): T | undefined
    {
        return this.genericValue.pop();
    }

    peek (): number | undefined
    {
        return this.genericValue.length > 0 ? this.genericValue.length - 1 : undefined;
    }

}

const stack = new Stack<string>( ['one', 'two', 'three'] );

let topIndex = stack.peek();
console.log( `Index of the top element: ${topIndex}` );
stack.push( 'four' );
topIndex = stack.peek();
console.log( `Index of the top element: ${topIndex}` );

//Узагальнений словник

//Створіть узагальнений клас Dictionary,
//який являє собою словник( асоціативний масив ) 
//з методами set, get і has.
//Обмежте ключі тільки валідними типами для об'єкта.

type DicElem<T> = { [n: number | string]: T; };

class Dictionary<T>
{
    genericValue: DicElem<T>[] = [];

    set ( key: number | string, value: T ): void
    {
        const element: DicElem<T> = {};
        element[key] = value;
        this.genericValue.push( element );
    }

    get ( key: number | string ): T | undefined
    {
        const element = this.genericValue.find( elem => key in elem );
        return element ? element[key] : undefined;
    }

    has ( key: number | string ): boolean
    {
        return this.genericValue.some( elem => key in elem );
    }
};

const myDictionary = new Dictionary<number>();

myDictionary.set( 1, 42 );
myDictionary.set( 'two', 3 );

console.log( myDictionary.get( 1 ) );
console.log( myDictionary.get( 'two' ) );
console.log( myDictionary.has( 'three' ) );
console.log( myDictionary );