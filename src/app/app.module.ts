import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { PartsListComponent } from './parts-list/parts-list.component';
import { PartEditComponent } from './parts-list/part-edit/part-edit.component';
import { JobsComponent } from './jobs/jobs.component';
import { JobsListComponent } from './jobs/jobs-list/jobs-list.component';
import { JobDetailComponent } from './jobs/job-detail/job-detail.component';
import { JobItemComponent } from './jobs/jobs-list/job-item/job-item.component';
import { DropdownDirective } from './shared/dropdown.directive';
import { PartsListService } from './parts-list/parts-list.service';
import { AppRoutingModule } from './app-routing.module';
import { JobEditComponent } from './jobs/job-edit/job-edit.component';
import { JobStartComponent } from './jobs/job-start/job-start.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomerInfoComponent } from './jobs/job-detail/customer-info/customer-info.component';
import { JobsService } from './jobs/jobs.service';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PartsListComponent,
    PartEditComponent,
    JobsComponent,
    JobsListComponent,
    JobDetailComponent,
    JobItemComponent,
    DropdownDirective,
    JobEditComponent,
    JobStartComponent,
    CustomerInfoComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [PartsListService,JobsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
