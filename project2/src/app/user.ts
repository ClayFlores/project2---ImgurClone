export class User{
    constructor(
        private _id: number,
        private _password: string,
        private _email: string
    ){}

    public get id(): number{ return this._id;}
    public set id(newId: number){this._id = newId;}

    public get password(): string{return this._password}
    public set password(newPassword: string){this._password = newPassword;}

    public get email(): string{return this._email;}
    public set email(newEmail: string){this._email = newEmail;}

}