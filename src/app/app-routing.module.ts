import { Routes, RouterModule } from '@angular/router';
import { JobsComponent } from './jobs/jobs.component';
import { PartsListComponent } from './parts-list/parts-list.component';
import { NgModule } from '@angular/core';
import { JobDetailComponent } from './jobs/job-detail/job-detail.component';
import { JobStartComponent } from './jobs/job-start/job-start.component';
import { JobEditComponent } from './jobs/job-edit/job-edit.component';
const appRoutes: Routes = [
  {path:'',redirectTo:'jobs', pathMatch:'full'},
  {path:'jobs', component:JobsComponent,children:[
    {path:'',component:JobStartComponent},
    {path:'new',component:JobEditComponent},
    {path:':id', component:JobDetailComponent},
    {path:':id/edit',component:JobEditComponent}
  ]},
  {path:'parts',component:PartsListComponent}
]
@NgModule({
  imports:[
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})

export class AppRoutingModule{

}
