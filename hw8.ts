// Вам потрібно створити тип DeepReadonly який буде робити доступними тільки для читання навіть властивості вкладених обʼєктів.;
type DeepReadonly<T> = {
    readonly [K in keyof T]: T[K] extends T[K]
    ? DeepRequireReadonly<T[K]> : T[K];
};

type Type1 = {
    name: string;
    info: {
        age: number;
        address: {
            city: string;
            postalCode: string;
        };
    };
};

type ReadonlyExample = DeepReadonly<Type1>;

const readonlyObj: ReadonlyExample = {
    name: 'John',
    info: {
        age: 25,
        address: {
            city: 'Example City',
            postalCode: '12345',
        },
    },
};

//const readonlyObj2: ReadonlyExample = {
//    name: 'test', 
//    info: {}
//}

//readonlyObj.name = 'Jane';
//readonlyObj.info.age = 30;
//readonlyObj.info.address.city = 'New City';

// Вам потрібно створити тип DeepRequireReadonly який буде робити доступними тільки для читання 
//навіть властивості вкладених обʼєктів та ще й робити їх обовʼязковими.;

type DeepRequireReadonly<T> = {
    readonly [K in keyof T]-?: T[K] extends T[K]
    ? DeepRequireReadonly<T[K]> : T[K];
};

type Type2 = {
    name: string;
    info?: {
        age?: number;
        address?: {
            city: string;
        };
    };
};

type Example2 = DeepRequireReadonly<Type2>;

type Example22 = Type2;

const Obj2: Example22 = {
    name: 'test',
    info: {}
};

const Object2: Example2 = {
    name: 'John',
    info: {
        age: 25,
        address: {
            city: 'Example City'
        },
    },
};


//Object2.name = 'test';
//Object2.info.age = 20;

//Вам потрібно сворити тип UpperCaseKeys, який буде приводити всі ключи до верхнього регістру.

type UpperCaseKeys<T> = {
    [K in keyof T as Uppercase<string & K>]: T[K];
};

type Type3 = {
    name: string;
    age: number;
};

type Example3 = UpperCaseKeys<Type3>;
let a: Example3;
//a.AGE


//І саме цікаве.Створіть тип ObjectToPropertyDescriptor, 
//який перетворює звичайний обʼєкт на обʼєкт де кожне value є дескриптором.;

type ObjectToPropertyDescriptor<T> = {
    [K in keyof T]: PropertyDescriptor;
};


type Type4 = {
    name: string;
    age: number;
};

const Example4: Type4 = {
    name: 'Alex',
    age: 25,
};

const Updated: ObjectToPropertyDescriptor<Type4> = {
    name: {

    },
    age: {

    }
}; 