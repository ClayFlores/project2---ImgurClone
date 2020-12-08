export class Image{ 
    constructor(
        private _id: number,
        private _imgUrl: string,
        private _caption: string,
        private _dateSubmitted: Date
    ){}

    public get id(): number{
        return this.id;
    }
    public set id(myId: number):{
        this._id=myId;
    }
    private imgUrl: string;
    private caption: string
    private dateSubmitted: Date
}