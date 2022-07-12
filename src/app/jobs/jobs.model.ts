import { Part } from '../shared/part.model';
// import { Address } from '../shared/address.model';
import { Appliance } from '../shared/appliance.model';
import { Images } from '../shared/images.model';
import { JobHistory } from '../shared/job-history.model';

export class Job{
  public id:string;
  public workOrderNumber:string;
  public name:string;
  public description: string;
  public phone:string;
  public houseNumber:string;
  public street:string;
  public city: string;
  public zip:number;
  // adding aditional job information
  public jobSource:string; // COD, Insurance, etc...
  public jobNumberAssigned:string; // Number received from insurance company
  public jobType: boolean; // Type of job Original or recall
  public jobAuthorization: string; //Authorization Number for the job
  public jobCreated:Date; // Date when job was created
  public jobAppointmentDate:Date; // Date when job appointment for service
  public jobAppointmentTime:Date; // Time when job appointment for service
  public jobCompletionDate:Date; // Date when job was completed
  // added additional job information
  public images:Images[];
  public parts:Part[];
  public appliances:Appliance[];
  public jobHistory:JobHistory[];

  constructor(id:string,
              workOrderNumber:string,
              name:string,
              desc: string,
              phone:string,
              houseNumber:string,
              street:string,
              city: string,
              zip:number,
              // adding additional job information maybee needed to be in separate array
              jobSource:string,
              jobNumberAssigned:string,
              jobType:boolean,
              jobAuthorization: string,
              jobCreated:Date,
              jobAppointmentDate:Date,
              jobAppointmentTime:Date,
              jobCompletionDate:Date,
              // end additional job information maybee needed to be in separate array
              images:Images[],
              parts:Part[],
              appliances:Appliance[],
              jobHistory:JobHistory[]){
                    this.id=id;
                    this.workOrderNumber=workOrderNumber;
                    this.name=name;
                    this.description=desc;
                    this.phone=phone;
                    this.houseNumber=houseNumber;
                    this.street=street;
                    this.city=city;
                    this.zip=zip;
                    // adding additional job information maybee needed to be in separate array
                    this.jobSource=jobSource;
                    this.jobNumberAssigned=jobNumberAssigned;
                    this.jobType=jobType;
                    this.jobAuthorization= jobAuthorization;
                    this.jobCreated=jobCreated;
                    this.jobAppointmentDate=jobAppointmentDate;
                    this.jobAppointmentTime=jobAppointmentTime;
                    this.jobCompletionDate=jobCompletionDate;
                    // end additional job information maybee needed to be in separate array
                    this.images = images;
                    this.parts=parts;
                    this.appliances = appliances;
                    this.jobHistory = jobHistory;
  }
}
