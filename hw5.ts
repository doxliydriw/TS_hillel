class Circle
{
    protected name: string = 'Circle';
    protected color: string;
    radius: number;


    constructor ( color: string, radius: number )
    {
        this.color = color;
        this.radius = radius;
    }

    get myname ()
    {
        return this.name;
    }

    get mycolor ()
    {
        return this.color;
    }

    calculateArea (): number
    {
        return Math.PI * Math.pow( this.radius, 2 );
    }
}

class Rectangle
{
    protected name: string = 'Rectangle';
    protected color: string;
    sideOne: number;
    sideTwo: number;


    constructor ( color: string, sideOne: number, sideTwo: number )
    {
        this.color = color;
        this.sideOne = sideOne;
        this.sideTwo = sideTwo;
    }

    get myname ()
    {
        return this.name;
    }

    get mycolor ()
    {
        return this.color;
    }

    calculateArea (): number
    {
        return ( this.sideOne * this.sideTwo );
    }

    print (): void
    {
        console.log( `Area of ${this.name} (${this.color}) is : length * width` );
    }
}

class Square extends Rectangle
{
    constructor ( color: string, side: number )
    {
        super( color, side, side );
        this.name = 'Square';
    }
}

class Triangle
{
    protected name: string = 'Triangle';
    protected color: string;
    height: number;
    side: number;

    constructor ( color: string, height: number, side: number )
    {
        this.color = color;
        this.height = height;
        this.side = side;
    }

    get myname ()
    {
        return this.name;
    }

    get mycolor ()
    {
        return this.color;
    }

    calculateArea (): number
    {
        return ( this.height * this.side ) / 2;
    }
}


const myCircle = new Circle( 'Green', 5 );
console.log( myCircle.mycolor, myCircle.myname, 'square is: ', myCircle.calculateArea() );

const myRectangle = new Rectangle( 'Blue', 5, 8 );
console.log( myRectangle.mycolor, myRectangle.myname, 'square is: ', myRectangle.calculateArea() );
myRectangle.print();

const mySquare = new Square( 'Red', 2 );
console.log( mySquare.mycolor, mySquare.myname, 'square is: ', mySquare.calculateArea() );
mySquare.print();


const myTriangle = new Triangle( 'Yellow', 10, 18 );
console.log( myTriangle.mycolor, myTriangle.myname, 'square is: ', myTriangle.calculateArea() );