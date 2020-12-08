import { Album } from './album';
import { User } from './user';
export class AlbumComment{
    constructor(
        private _id:number,
        private _album: Album,
        private _userCommenter: User,
        private _dateSubmitted: Date,
        private _body: string
    ){}

    public get id():number{return this._id;}
    public set id(newId: number){this._id = newId}

    public get album():Album{return this._album}
    public set album(newAlbum: Album){this._album = this.album}

    public get userCommenter():User{return this._userCommenter}
    public set userCommenter(newUserCommenter: User){this._userCommenter = newUserCommenter}

    public get dateSubmitted(): Date{return this._dateSubmitted}
    public set dateSubmitted(newDate: Date){this._dateSubmitted = newDate}

    public get body(): string{ return this._body}
    public set body(newBody: string){this._body = newBody}
}