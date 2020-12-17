import { Album } from './album';
export class Tag{
    constructor(
      private _id: number,
      private _tagName: string  
    ){}

    public get id():number {return this._id}
    public set id(newId: number){this._id = newId}

    public get tagName():string {return this._tagName}
    public set tagName(newTagName: string){this._tagName = newTagName}
}