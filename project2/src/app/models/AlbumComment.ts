import { Album } from './album';
import { User } from './user';
export class AlbumComment{
    constructor(
        private _id:number | null,
        //private _album: Album,
        private _userCommenter: User | null,
        private _dateSubmitted: Date | null,
        private _body: string
    ){}

    public get id():number|null{return this._id;}
    public set id(newId: number|null){this._id = newId}

    //public get album():Album{return this._album}
    //public set album(newAlbum: Album){this._album = this.album}

    public get userCommenter():User|null{return this._userCommenter}
    public set userCommenter(newUserCommenter: User|null){this._userCommenter = newUserCommenter}

    public get dateSubmitted(): Date|null {return this._dateSubmitted}
    public set dateSubmitted(newDate: Date|null ){this._dateSubmitted = newDate}

    public get body(): string{ return this._body}
    public set body(newBody: string){this._body = newBody}
}