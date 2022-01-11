import { Part } from '../shared/part.model';
// import { Address } from '../shared/address.model';
import { Appliance } from '../shared/appliance.model';
import { Images } from '../shared/images.model';
import { JobHistory } from '../shared/job-history.model';

export class Job{
  public workOrderNumber:string;
  public name:string;
  public description: string;
  public phone:string;
  public houseNumber:string;
  public street:string;
  public city: string;
  public zip:number;
  public images:Images[];
  // public address:Address[];
  public parts:Part[];
  public appliances:Appliance[];
  public jobHistory:JobHistory[];

  constructor(workOrderNumber:string,
              name:string,
              desc: string,
              phone:string,
              houseNumber:string,
              street:string,
              city: string,
              zip:number,
              images:Images[],
              // address:Address[],
              parts:Part[],
              appliances:Appliance[],
              jobHistory:JobHistory[]){
    this.workOrderNumber=workOrderNumber;
    this.name=name;
    this.description=desc;
    this.phone=phone;
    this.houseNumber=houseNumber;
    this.street=street;
    this.city=city;
    this.zip=zip;
    // this.imagePath=imagePath;
    this.images = images;
    // this.address=address;
    this.parts=parts;
    this.appliances = appliances;
    this.jobHistory = jobHistory;
  }
}
