import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { JobsService } from '../jobs.service';
import { Job } from '../jobs.model';
import { Address } from 'src/app/shared/address.model';
import { ThisReceiver } from '@angular/compiler';
import { rejects } from 'assert';

@Component({
  selector: 'app-job-edit',
  templateUrl: './job-edit.component.html',
  styleUrls: ['./job-edit.component.css']
})
export class JobEditComponent implements OnInit {
editMode=false;
workOrderForm:FormGroup;
id:number; //job Id
loadedTab:string="info";

  constructor(private route:ActivatedRoute,
              private jobService:JobsService,
              private router:Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params:Params)=>{
        this.id= params['id'];
        this.editMode=params['id']!=null;
        this.initForm();
      }
    );
    // this.jobService.jobsUpdated.subscribe(

    // )
  }
  private initForm(){
      let workOrderNumber= '';
      let name = '';
      let phone = '';
      let description = '';
      let houseNumber = '';
      let street = '';
      let city = '';
      let zip ;
      let imagesGroup = new FormArray([]);
      let addressGroup = new FormArray([]);
      let workOrderParts = new FormArray([]);
      let appliancesGroup = new FormArray([]);
      let jobHistory = new FormArray([]);
      //if not edit mode - initializing jobHistory FormArray with initial value
      if(!this.editMode){
        jobHistory.push(
          new FormGroup({
            'updateDate': new FormControl('01/01/22'),
            'jobStatus': new FormControl('new job'),
            'privateNotes': new FormControl('new job')
          })
        )
      }

      if (this.editMode){
        const job = this.jobService.getJob(+this.id);
        workOrderNumber = job.workOrderNumber;
        name = job.name;
        phone = job.phone;
        houseNumber=job.houseNumber;
        street=job.street;
        city=job.city;
        zip = job.zip;
        description = job.description;
        // check if job history exist
        if(job.jobHistory){
          for(let history of job.jobHistory){
            console.log('history update', history.jobStatus);
            jobHistory.push(
              new FormGroup({
                'updateDate': new FormControl(history.updateDate),
                'jobStatus': new FormControl(history.jobStatus),
                'privateNotes': new FormControl(history.privateNotes)
              })
            )
          }
        }
        // check if images exist
        if(job.images){
          for(let image of job.images){
            imagesGroup.push(
              new FormGroup({
                'imagePath':new FormControl(image.imagePath)
              })
            )
          }
        }
        //checking if parts exist
        if(job.parts){
          for(let part of job.parts){
            //pushing to array of workorderparts
            workOrderParts.push(
              new FormGroup({
                // Next 3 fields required for user to enter
                'number': new FormControl(part.number,Validators.required),
                'name':new FormControl(part.name, Validators.required),
                'quantity': new FormControl(part.quantity,[Validators.required,
                  Validators.pattern(/^[1-9]+[0-9]*$/)]),
                  // Next fields are automatically populated and not showed to user
                  'jobId': new FormControl(part.jobId),
                'cost':new FormControl(part.cost),
                'retail':new FormControl(part.retail),
                'trackNumber':new FormControl(part.trackNumber),
                'received':new FormControl(part.received)
              }
              )
            )
          }
        }
        // checking if appliances exist
        if(job.appliances){
          for(let appliance of job.appliances){
            appliancesGroup.push(
             new FormGroup({
                'applianceName': new FormControl(appliance.applianceName, Validators.required),
                'model': new FormControl(appliance.model, Validators.required),
                'serial': new FormControl(appliance.serial,Validators.required),
                'applianceDescription': new FormControl(appliance.applianceDescription,Validators.required),
              })
            )
          }
        }
      }
      // Generate a workingOrderForm ready to submit
      this.workOrderForm = new FormGroup({
        'workOrderNumber': new FormControl(workOrderNumber,Validators.required),
        'name' : new FormControl(name, Validators.required),
        'phone': new FormControl(phone,Validators.required),
        'description': new FormControl(description),
        'houseNumber':new FormControl(houseNumber,Validators.required),
        'street':new FormControl(street,Validators.required),
        'city':new FormControl(city,Validators.required),
        'zip':new FormControl(zip,Validators.required),
        'images': imagesGroup,
        'address':addressGroup,
        'parts':workOrderParts,
        'appliances':appliancesGroup,
        'jobHistory': jobHistory,
      })
  }
  //-------END FORM INIT

  addPart(){
    // creating empty form fields for parts
    (<FormArray>this.workOrderForm.get('parts')).push(
      new FormGroup({
        // this FormControllers are required fields
        'number': new FormControl(null,Validators.required),
        'name':new FormControl(null,Validators.required),
        'quantity': new FormControl(null,[Validators.required,
                                          Validators.pattern(/^[1-9]+[0-9]*$/)]),
        // this FormControllers are not required. They filled up by manager on Parts page
        'jobId': new FormControl(null),
        'cost':new FormControl(null),
        'retail':new FormControl(null),
        'trackNumber':new FormControl(null),
        'received':new FormControl(false)
      })
    )
  }
  addAppliance(){
    (<FormArray>this.workOrderForm.get('appliances')).push(
      new FormGroup({
        'applianceName':new FormControl(null, Validators.required),
        'model':new FormControl(null,Validators.required),
        'serial': new FormControl(null,Validators.required),
        'applianceDescription':new FormControl(null, Validators.required)
      })
    )
  }
  onSubmit(){
    const newJob = new Job(
      this.workOrderForm.value['workOrderNumber'],
      this.workOrderForm.value['name'],
      this.workOrderForm.value['description'],
      this.workOrderForm.value['phone'],
      this.workOrderForm.value['houseNumber'],
      this.workOrderForm.value['street'],
      this.workOrderForm.value['city'],
      this.workOrderForm.value['zip'],
      this.workOrderForm.value['images'],
      this.workOrderForm.value['parts'],
      this.workOrderForm.value['appliances'],
      this.workOrderForm.value['jobHistory']
    )
    if(this.editMode){
      // we can pass workOrderForm because fields in the form are the same
      // as jobs.model
      this.jobService.updateJob(this.id,newJob);
    }else{
      this.jobService.addJob(newJob);
    }
    this.editMode=false;
    this.router.navigate(['../'],{relativeTo:this.route});
  }
  get controls() { // a getter!
    return (<FormArray>this.workOrderForm.get('parts')).controls;
  }
  get addressControls() { // a getter!
    return (<FormArray>this.workOrderForm.get('address')).controls;
  }
  get applianceControls(){
    return(<FormArray>this.workOrderForm.get('appliances')).controls;
  }
  get imagesControls(){
    return(<FormArray>this.workOrderForm.get('images')).controls;
  }
// selected tab
onSelectTab(arg:string){
this.loadedTab=arg;
}
// delete parts
onDeletePart(index:number){
  (<FormArray>this.workOrderForm.get('parts')).removeAt(index);
}
onDeleteAppliance(index:number){
  (<FormArray>this.workOrderForm.get('appliances')).removeAt(index);
}
onDeleteImage(index:number){
  (<FormArray>this.workOrderForm.get('images')).removeAt(index);
}
onCancel(){
  this.router.navigate(['../'],{relativeTo:this.route});
}
}
