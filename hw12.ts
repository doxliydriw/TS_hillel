/*
Візьміть декоратор DeprecatedMethod і навчіть його працювати з об'єктом, 
який вміє приймати причину, через яку його не варто використовувати, 
і назву методу, яким його можна замінити, якщо це можливо.
*/
type DeprecationInfo = {
    reason: string;
    replacement?: string;
};

function ObjectCheck ( description: DeprecationInfo )
{
    return function actualDeprecatedMethod<T, A extends any[], R> (
        originalMethod: ( ...args: A ) => R,
        context: ClassMethodDecoratorContext<T, ( ...args: A ) => R> )
    {
        if ( context.kind !== 'method' ) throw new Error( 'Method-only decorator' );

        function replacementMethod ( this: T, ...args: A ): R
        {
            console.log( `${String( context.name )} is depricated because ${description.reason} and will be removed` +
                ( description.replacement ? ` and will be replaced by ${description.replacement} method` : '' )
            );
            return originalMethod.apply( this, args );
        };
        return replacementMethod;
    };
}

let testDescription: DeprecationInfo = {
    reason: `it's not safe`,
    //replacement: 'newSafeMethod'
};

/*
Створіть декоратори MinLength, MaxLength та Email
*/
function MinLength<T, V> (
    originalField: undefined,
    context: ClassFieldDecoratorContext<T, V> )
{
    if ( context.kind !== 'field' ) throw new Error( 'Setter-only decorator' );
    function checkProperty ( this: T, originalValue: V ): V
    {
        if ( String( originalValue ).length < 5 )
            console.log( `${originalValue} could not be less than 5` );
        return originalValue;
    }
    return checkProperty;
}

function MaxLength<T, V> (
    originalField: undefined,
    context: ClassFieldDecoratorContext<T, V> )
{
    if ( context.kind !== 'field' ) throw new Error( 'Setter-only decorator' );
    function checkProperty ( this: T, originalValue: V ): V
    {
        if ( String( originalValue ).length > 10 )
            console.log( `${originalValue} could not be more than 10` );
        return originalValue;
    }
    return checkProperty;
}

function Email<T, V> (
    originalField: undefined,
    context: ClassFieldDecoratorContext<T, V> )
{
    console.log( 'inside decorator' );
    if ( context.kind !== 'field' ) throw new Error( 'Setter-only decorator' );
    function checkProperty ( this: T, originalValue: V ): V
    {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if ( !emailRegex.test( String( originalValue ) ) )
            console.log( `${originalValue} is not a valid email` );
        return originalValue;
    }
    return checkProperty;
}

class Rocket
{
    public fuel = 75;

    @MinLength @MaxLength @Email
    public _justString = 'testtest';


    public set justString ( el: string )
    {
        this._justString = el;
    };

    public get justString ()
    {
        return this._justString;
    };

    @ObjectCheck( testDescription )
    public checkForStart (): boolean
    {
        return this.fuel !== 0;
    };

}


const rocket = new Rocket;
console.log( rocket._justString );



console.log( rocket.checkForStart() );




