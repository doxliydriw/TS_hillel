Вам необхідно розширити поведінку прикладу з банківським рахунком. Додайте до нашої програми компонент Bank, який вміє створювати ти закривати акаунти для клієнтів. Кліент може мати декілька аккаунтів з різними типами валют. Bank повинен бути Singleton!

- Для тих, кому цікаво ускладнити - додайте можливість ставити транзацкції у чергу та мати можливість їх повторювати чи відміняти (Command)

interface IObserver {
update(observable: IObservable): void;
}

interface IObservable {
attach(observer: IObserver): void;
detach(observer: IObserver): void;
notify(): void;
}

interface BankClient {
firstName: string;
lastName: string;
}

abstract class Observable implements IObservable {
private readonly observers: IObserver[] = [];

public attach(observer: IObserver): void {
const isExist = this.observers.includes(observer);

    if (isExist)
      return console.log('Observable: Observer has been attached already.');


    this.observers.push(observer);
    console.log('Observable:: Attached an observer.');

}

public detach(observer: IObserver): void {
const observerIndex = this.observers.indexOf(observer);

    if (observerIndex === -1)
      return console.log('Observable: Nonexistent observer.');


    this.observers.splice(observerIndex, 1);
    console.log('Observable: Detached an observer.');

}

public notify(): void {
console.log('Observable: Notifying observer...');
for (const observer of this.observers) {
observer.update(this);
}
}
}

class BankAccount extends Observable {
private readonly currency: string;
private readonly number: number;
private balance = 1000;
private \_holderName!: string;
private \_conversionStrategy!: ICurrencyConversionStrategy;

constructor(
client: BankClient,
currency: string,
conversionStrategy: ICurrencyConversionStrategy
) {
super();
this.currency = currency;
this.holderName = client;
this.number = 12345678;
this.\_conversionStrategy = conversionStrategy;
}

public get balanceInfo(): string {
return `${this.currency}${this.balance}`;
}

public get holderName(): string {
return this.\_holderName;
}

public set holderName({ firstName, lastName }: BankClient) {
if (!firstName.trim()) throw new Error(`Client first name can't be empty!`);
if (!lastName.trim()) throw new Error(`Client last name can't be empty!`);

    this._holderName = `${lastName} ${firstName}`;

}

public set conversionStrategy(strategy: ICurrencyConversionStrategy) {
this.\_conversionStrategy = strategy;
}

public deposit(amount: number): void {
this.balance += amount;
}

public withdraw(amount: number): void {
if (this.balance < amount)
throw new Error(
`Sorry ${this._holderName}, you don't have enough funds!`
);

    this.balance -= amount;

}

public makeTransaction(
amount: number,
targetCurrency: CurrencyTypeEnum
): void {
const convertAmount = this.\_conversionStrategy.convert(
amount,
targetCurrency
);
this.balance -= convertAmount;

    console.log(
      `Transaction: ${amount} ${this.currency} => ${targetCurrency}, Converted Amount: ${convertAmount} ${targetCurrency}, Balance: ${this.balance} ${this.currency}`
    );
    this.notify();

}
}

class SMSNotification implements IObserver {
update(account: BankAccount): void {
console.log(
`SMS notification: Your account balance has changed. Current balance ${account.balanceInfo}`
);
}
}

class EmailNotification implements IObserver {
update(account: BankAccount): void {
console.log(
`Email notification: Your account balance has changed. Current balance ${account.balanceInfo}`
);
}
}

class PushNotification implements IObserver {
update(account: BankAccount): void {
console.log(
`Push notification: Your account balance has changed. Current balance ${account.balanceInfo}`
);
}
}
