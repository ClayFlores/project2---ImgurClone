import { Image } from './image';
import { User } from './user'

export class album{
    constructor(
        private _id: number,
        private _title: string,
        private _userCreator: User,
        private _images: Image[],
        private _upvoteCount: number,
        private _dateCreated: Date
        //private _tags: Tag[],
        //private _comments: Comment[],
    ){}

    public get id(): number{ return this._id;}
    public set id(newId: number){ this._id = newId;}

    public get title(): string{ return this._title;}
    public set title(newTitle: string){ this._title = newTitle;}

    public get userCreator(): User{ return this._userCreator}
    public set userCreator(newUserCreator: User){ this._userCreator = newUserCreator}

    public get images(): Image[]{return this._images}
    public set images(newImages: Image[]){this._images = newImages}

    public get upvoteCount(): number{return this._upvoteCount}
    public set upvoteCount(newUpvoteCount:number){this._upvoteCount = newUpvoteCount}

    public get dateCreated(): Date{return this._dateCreated}
    public set dateCreated(newDateCreated: Date){this._dateCreated = newDateCreated}
}