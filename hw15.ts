interface IObserver
{
    update ( observable: IObservable ): void;
}


interface IObservable
{
    attach ( observer: IObserver ): void;
    detach ( observer: IObserver ): void;
    notify (): void;
}


interface BankClient
{
    firstName: string;
    lastName: string;
}

enum CurrencyTypeEnum
{
    USD = 'USD',
    EUR = 'EUR',
    UAH = 'UAH',
}

interface ICurrencyConversionStrategy
{
    convert ( amount: number ): number;
}

class StrategyUSD implements ICurrencyConversionStrategy
{
    convert ( amount: number ): number
    {
        return amount * 37;
    }
}

class StrategyEUR implements ICurrencyConversionStrategy
{
    convert ( amount: number ): number
    {
        return amount * 42;
    }
}


abstract class Observable implements IObservable
{
    private readonly observers: IObserver[] = [];


    public attach ( observer: IObserver ): void
    {
        const isExist = this.observers.includes( observer );


        if ( isExist )
            return console.log( 'Observable: Observer has been attached already.' );


        this.observers.push( observer );
        console.log( 'Observable:: Attached an observer.' );
    }


    public detach ( observer: IObserver ): void
    {
        const observerIndex = this.observers.indexOf( observer );


        if ( observerIndex === -1 )
            return console.log( 'Observable: Nonexistent observer.' );


        this.observers.splice( observerIndex, 1 );
        console.log( 'Observable: Detached an observer.' );
    }


    public notify (): void
    {
        console.log( 'Observable: Notifying observer...' );
        for ( const observer of this.observers ) {
            observer.update( this );
        }
    }
}

class Bank
{
    private static instance: Bank;
    private accounts: Map<string, BankAccount> = new Map();

    private constructor () { }

    static getInstance (): Bank
    {
        if ( !Bank.instance ) {
            Bank.instance = new Bank();
        }
        return Bank.instance;
    }

    createAccount ( client: BankClient, currency: string, conversionStrategy: ICurrencyConversionStrategy ): BankAccount
    {
        const account = new BankAccount( client, currency, conversionStrategy );
        this.accounts.set( client.firstName + client.lastName, account );
        return account;
    }

    closeAccount ( client: BankClient ): void
    {
        const key = client.firstName + client.lastName;
        if ( this.accounts.has( key ) ) {
            this.accounts.delete( key );
        } else {
            console.log( 'Account not found for the client:', client );
        }
    }
}


class BankAccount extends Observable
{
    private readonly currency: string;
    private readonly number: number;
    private balance = 1000;
    private _holderName!: string;
    private _conversionStrategy!: ICurrencyConversionStrategy;


    constructor (
        client: BankClient,
        currency: string,
        conversionStrategy: ICurrencyConversionStrategy
    )
    {
        super();
        this.currency = currency;
        this.holderName = client;
        this.number = 12345678;
        this._conversionStrategy = conversionStrategy;
    }


    public get balanceInfo (): string
    {
        return `${this.currency}${this.balance}`;
    }


    public get holderName (): string
    {
        return this._holderName;
    }


    public set holderName ( { firstName, lastName }: BankClient )
    {
        if ( !firstName.trim() ) throw new Error( `Client first name can't be empty!` );
        if ( !lastName.trim() ) throw new Error( `Client last name can't be empty!` );


        this._holderName = `${lastName} ${firstName}`;
    }


    public set conversionStrategy ( strategy: ICurrencyConversionStrategy )
    {
        this._conversionStrategy = strategy;
    }


    public deposit ( amount: number ): void
    {
        this.balance += amount;
    }


    public withdraw ( amount: number ): void
    {
        if ( this.balance < amount )
            throw new Error(
                `Sorry ${this._holderName}, you don't have enough funds!`
            );


        this.balance -= amount;
    }


    public makeTransaction (
        amount: number,
        targetCurrency: CurrencyTypeEnum
    ): void
    {
        const convertAmount = this._conversionStrategy.convert(
            amount
        );
        this.balance -= convertAmount;


        console.log(
            `Transaction: ${amount} ${this.currency} => ${targetCurrency}, Converted Amount: ${convertAmount} ${targetCurrency}, Balance: ${this.balance} ${this.currency}`
        );
        this.notify();
    }
}


class SMSNotification implements IObserver
{
    update ( account: BankAccount ): void
    {
        console.log(
            `SMS notification: Your account balance has changed. Current balance ${account.balanceInfo}`
        );
    }
}


class EmailNotification implements IObserver
{
    update ( account: BankAccount ): void
    {
        console.log(
            `Email notification: Your account balance has changed. Current balance ${account.balanceInfo}`
        );
    }
}


class PushNotification implements IObserver
{
    update ( account: BankAccount ): void
    {
        console.log(
            `Push notification: Your account balance has changed. Current balance ${account.balanceInfo}`
        );
    }
}


// Implementation:

const bank = Bank.getInstance();

// Create client information
const client = { firstName: 'John', lastName: 'Doe' };

// Create strategy
const USD = new StrategyUSD;
const EUR = new StrategyEUR;

// Create accounts with different currencies and conversion strategies
const usdAccount = bank.createAccount( client, CurrencyTypeEnum.USD, USD );
const eurAccount = bank.createAccount( client, CurrencyTypeEnum.EUR, EUR );

// Attach notification observers (SMS, Email, Push)
usdAccount.attach( new SMSNotification() );
usdAccount.attach( new EmailNotification() );

// Make a transaction and notify observers
usdAccount.makeTransaction( 100, CurrencyTypeEnum.EUR ); // This will trigger notifications

// Close an account
bank.closeAccount( client ); // Closes both USD and EUR accounts for John Doe