export class Part{
  constructor(
    public jobId:string,
    public number:string,
    public name:string,
    public quantity:number,
    public cost: number,
    public retail:number,
    public trackNumber:string,
    public partOrderNumber:string,
    public received:boolean){}
}
