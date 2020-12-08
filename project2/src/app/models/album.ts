import { AlbumComment } from './AlbumComment';
import { Image } from './image';
import { Tag } from './tag';
import { User } from './user'

export class Album{
    constructor(
        private _id: number,
        private _title: string,
        private _userCreator: User,
        private _images: Image[],
        private _upvoteCount: number,
        private _dateCreated: Date,
        private _tags: Tag[],
        private _comments: AlbumComment[]
    ){}

    //appends myImage to the end of the images array
    public addImage(myImage: Image){
        this._images.push(myImage);
    }

    //removes the specified image from the images array
    public removeImage(victimImage: Image){
        this._images.filter((img: Image)=>{
            return(img !== victimImage)
        })
    }

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

    public get tags(): Tag[]{return this._tags}
    public set tags(newTags: Tag[]){this._tags = newTags}  

    public get comments(): AlbumComment[]{return this._comments}
    public set comments(newComments: AlbumComment[]){this._comments = newComments}

}