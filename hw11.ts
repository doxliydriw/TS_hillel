//Palindrome;
function poliCheck ( target: number ): boolean
{
    let stringTarget: string = target.toString();
    return stringTarget === stringTarget.split( '' ).reverse().join( '' );
}

function poli ( target: number, counter = 0 ):
    {
        result: number;
        steps: number;
    }
{
    if ( poliCheck( target ) ) {
        return {
            result: target,
            steps: counter,
        };
    } else {
        let reversedTarget: number = parseInt( target
            .toString()
            .split( '' )
            .reverse()
            .join( '' ), 10 );
        return poli( target + reversedTarget, counter + 1 );
    }
}

console.log( poli( 123 ) );
console.log( poli( 123962412 ) );
//poli( 196 );



//Array shifting
function generateShiftedArr<T> ( arr: T[] ): T[][]
{
    if ( arr.length === 1 ) {
        return [arr];
    };
    const result: T[][] = [];
    for ( let i = 0; i < arr.length; i++ ) {
        const currentElement = arr[i];
        const remainingElements = [...arr.slice( 0, i ), ...arr.slice( i + 1 )];
        const shiftOfRest = generateShiftedArr( remainingElements );

        for ( const shifted of shiftOfRest ) {
            result.push( [currentElement, ...shifted] );
        }
    }

    return result;
}

console.log( generateShiftedArr( [1, 2, 3, 'aa'] ) );
