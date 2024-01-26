// Вам потрібно створити умовний тип, що служить для встановлення типу, 
//що повертається з функції.
//Як параметр типу повинен обов'язково виступати функціональний тип.

/*
type GetReturnType<Type> = Type extends ( ...args: never[] ) => infer Return
    ? Return
    : never;
type FunctionType = () => string;
*/

type ReturnTypeBasedOnParameter<T extends ( ...args: never[] ) => any> = T extends ( ...args: never[] ) => infer R
    ? R
    : never;

const exampleFunction = (): string => "Hello, TypeScript!";
const test = (): number => 22;
const test1 = 22;

/*
type ResultType = GetReturnType<typeof exampleFunction>;
type ResultType1 = GetReturnType<typeof test>;
*/

type ResultType2 = ReturnTypeBasedOnParameter<typeof exampleFunction>;
type ResultType3 = ReturnTypeBasedOnParameter<typeof test>;
//type ResultType4 = ReturnTypeBasedOnParameter<typeof test1>;

//Вам потрібно створити умовний тип, який приймає функціональний тип з одним параметром( або задовільним ) 
//та повертає кортеж, 
//де перше значення - це тип, що функція повертає, 
//а другий - тип її параметру;

type CondtitionalTest<T extends ( param: any ) => any> = T extends ( param: infer Param ) => infer Result
    ? [Param, Result]
    : never;


const exampleFunction1 = ( x: string ) => `Hello, ${x}`;
const exampleFunction2 = ( x: number ) => `Hello, ${x}`;
const exampleFunction3 = ( x: number, y: string ) => `Hello, ${x},  ${y}`;

type ResultTuple = CondtitionalTest<typeof exampleFunction1>;
type ResultTuple1 = CondtitionalTest<typeof exampleFunction2>;
//type ResultTuple2 = CondtitionalTest<typeof exampleFunction3>; 