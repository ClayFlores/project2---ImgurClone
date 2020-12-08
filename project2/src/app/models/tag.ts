import { Album } from './album';
export class Tag{
    constructor(
      private _id: number,
      private _album: Album,
      private _tagName: string  
    ){}

    public get id():number {return this._id}
    public set id(newId: number){this._id = newId}

    public get album(): Album {return this._album}
    public set album(newAlbum: Album) {this._album = newAlbum}

    public get tagName():string {return this._tagName}
    public set tagName(newTagName: string){this._tagName = newTagName}
}