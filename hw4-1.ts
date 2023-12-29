interface Calculator
{
    add: ( a: number, b: number ) => number;
    subtract: ( a: number, b: number ) => number;
    multiply: ( a: number, b: number ) => number;
    divide: ( a: number, b: number ) => number;
}

const calculator: Calculator = {
    add: ( a, b ) => a + b,
    subtract: ( a, b ) => a - b,
    multiply: ( a, b ) => a * b,
    divide: ( a, b ) => ( b !== 0 ? a / b : NaN ),
};

function calculate ( calculator: Calculator, operation: string, a: number, b: number ): number
{
    switch ( operation ) {
        case 'add':
        case '+':
            return calculator.add( a, b );
        case 'subtract':
        case '-':
            return calculator.subtract( a, b );
        case 'multiply':
        case '*':
            return calculator.multiply( a, b );
        case 'divide':
        case '/':
            return calculator.divide( a, b );
        default:
            throw new Error( 'Wrong data inputed' );
    }
}


const res = calculate( calculator, '/', 5, 0 );
console.log( res );