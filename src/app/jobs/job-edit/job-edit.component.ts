import { Component, OnInit, ɵɵtrustConstantResourceUrl } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { JobsService } from '../jobs.service';
import { Job } from '../jobs.model';


@Component({
  selector: 'app-job-edit',
  templateUrl: './job-edit.component.html',
  styleUrls: ['./job-edit.component.css']
})
export class JobEditComponent implements OnInit {
editMode=false;
job:Job;
workOrderForm:FormGroup;
id:string; //job Id
workOrderNumberForPart; // workorder number for part jobId
loadedTab:string="info";
today: string; // variable to keep todays date

  constructor(private route:ActivatedRoute,
              private jobService:JobsService,
              private router:Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params:Params)=>{
        this.id = params['id']? params['id'] :null;
        this.editMode=params['id']!=null;
        this.initForm();
      }
    );
      this.today= new Date().toISOString().split('T')[0];
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
      //
      let jobSource='';
      let jobNumberAssigned='';
      let jobType= false;
      let jobAuthorization='';
      let jobCreated = new Date();
      let jobAppointmentDate= new Date();
      let jobAppointmentTime= new Date();
      let jobCompletionDate=new Date();
      //
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
        this.job = this.jobService.getJobLocalStorage(this.id);
        workOrderNumber = this.job.workOrderNumber;
        this.workOrderNumberForPart=this.job.workOrderNumber;
        name = this.job.name;
        phone = this.job.phone;
        houseNumber=this.job.houseNumber;
        street=this.job.street;
        city=this.job.city;
        zip = this.job.zip;
        description = this.job.description;
        jobSource= this.job.jobSource;
        jobNumberAssigned= this.job.jobNumberAssigned;
        jobType=this.job.jobType;
        jobAuthorization = this.job.jobAuthorization;
        jobCreated= this.job.jobCreated;
        jobAppointmentDate = this.job.jobAppointmentDate;
        jobAppointmentTime= this.job.jobAppointmentTime;
        jobCompletionDate = this.job.jobCompletionDate;
        // check if job history exist
        if(this.job.jobHistory){
          for(let history of this.job.jobHistory){
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
        if(this.job.images){
          for(let image of this.job.images){
            imagesGroup.push(
              new FormGroup({
                'imagePath':new FormControl(image.imagePath)
              })
            )
          }
        }
        //checking if parts exist
        if(this.job.parts){
          for(let part of this.job.parts){
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
                'partOrderNumber':new FormControl(part.partOrderNumber),
                'received':new FormControl(part.received)
              }
              )
            )
          }
        }
        // checking if appliances exist
        if(this.job.appliances){
          for(let appliance of this.job.appliances){
    //         const applianceFormArray:FormArray= <FormArray>this.workOrderForm.get('appliances');
    //             const newApplianceFromGroup =new FormGroup({
    //   'applianceName':new FormControl(null, Validators.required),
    //   'applianceBrand':new FormControl(null,Validators.required),
    //   'model':new FormControl(null,Validators.required),
    //   'serial': new FormControl(null,Validators.required),
    //   'applianceDescription':new FormControl(null, Validators.required)
    // });
    // applianceFormArray.controls.unshift(newApplianceFromGroup);
            appliancesGroup.push(
             new FormGroup({
                'applianceName': new FormControl(appliance.applianceName, Validators.required),
                'applianceBrand':new FormControl(appliance.applianceBrand,Validators.required),
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
        'jobSource': new FormControl(jobSource,Validators.required),
        'jobNumberAssigned': new FormControl(jobNumberAssigned,Validators.required),
        'jobType': new FormControl(jobType,Validators.required),
        'jobCreated': new FormControl(jobCreated,Validators.required),
        'jobAppointmentDate': new FormControl(jobAppointmentDate,Validators.required),
        'jobAppointmentTime': new FormControl(jobAppointmentTime,Validators.required),
        'jobCompletionDate': new FormControl(jobCompletionDate,Validators.required),
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
        'jobId': new FormControl(this.workOrderNumberForPart),
        'cost':new FormControl(null),
        'retail':new FormControl(null),
        'trackNumber':new FormControl(null),
        'partOrderNumber':new FormControl(null),
        'received':new FormControl(false)
      })
    )
  }
  addAppliance(){
      const appArray = (<FormArray>this.workOrderForm.get('appliances')).insert(0,
          new FormGroup({
        'applianceName':new FormControl(null, Validators.required),
        'applianceBrand':new FormControl(null,Validators.required),
        'model':new FormControl(null,Validators.required),
        'serial': new FormControl(null,Validators.required),
        'applianceDescription':new FormControl(null, Validators.required)
      }))
  }
  onSubmit(){
    const newJob = new Job(
      this.workOrderForm.value['id'],
      this.workOrderForm.value['workOrderNumber'],
      this.workOrderForm.value['name'],
      this.workOrderForm.value['description'],
      this.workOrderForm.value['phone'],
      this.workOrderForm.value['houseNumber'],
      this.workOrderForm.value['street'],
      this.workOrderForm.value['city'],
      this.workOrderForm.value['zip'],
      this.workOrderForm.value['jobSource'],
      this.workOrderForm.value['jobNumberAssigned'],
      this.workOrderForm.value['jobType'],
      this.workOrderForm.value['jobAuthorization'],
      this.workOrderForm.value['jobCreated'],
      this.workOrderForm.value['jobAppointmentDate'],
      this.workOrderForm.value['jobAppointmentTime'],
      this.workOrderForm.value['jobCompletionDate'],
      this.workOrderForm.value['images'],
      this.workOrderForm.value['parts'],
      this.workOrderForm.value['appliances'],
      this.workOrderForm.value['jobHistory']
    )
    if(this.editMode){
      // we can pass workOrderForm because fields in the form are the same
      // as jobs.model
      // assign an id if in edit mode
      newJob.id= this.id;
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
