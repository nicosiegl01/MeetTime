export class User {
    constructor(
      private _id: number,
      private _firstname: string,
      private _lastname: string,
      private _mail: string,
      private _password: string,
      private _age: number
    ) {}


  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get firstname(): string {
    return this._firstname;
  }

  set firstname(value: string) {
    this._firstname = value;
  }

  get lastname(): string {
    return this._lastname;
  }

  set lastname(value: string) {
    this._lastname = value;
  }

  get mail(): string {
    return this._mail;
  }

  set mail(value: string) {
    this._mail = value;
  }

  get password(): string {
    return this._password;
  }

  set password(value: string) {
    this._password = value;
  }

  get age(): number {
    return this._age;
  }

  set age(value: number) {
    this._age = value;
  }
}
