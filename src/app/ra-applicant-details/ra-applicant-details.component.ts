import { AfterViewInit, Component, inject,signal } from '@angular/core';
import { FormsModule, NgForm, FormGroup, FormBuilder, FormGroupDirective, Validators, ValidatorFn, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import moment from 'moment';
import {ErrorStateMatcher, MatOptionModule} from '@angular/material/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatStepper, MatStepperModule, MatStepperNext} from '@angular/material/stepper';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ra-applicant-details',
  imports: [ ReactiveFormsModule, FormsModule, MatInputModule, MatFormFieldModule,
     MatStepperModule, MatSelectModule, MatOptionModule, CommonModule],
  standalone: true,
  templateUrl: './ra-applicant-details.component.html',
  styleUrl: './ra-applicant-details.component.css'
})
export class RaApplicantDetailsComponent  {
  private router = inject(Router);
  date: Date = new Date();
    searchPageDate: string =moment(this.date).format('MMMM DD YYYY hh:mm A');    
  private _formBuilder = inject(FormBuilder);
  applicantOn = signal(true);
  primaryClicked = signal(false);
  contactClicked = signal(false);
  householdClicked = signal(false);  
  finalizeClicked = signal(false);


  appDetailsGroup= this._formBuilder.group({ 
    applicationType: [''],
    programType: [''],
    applicationDate: ['']   
  });

   primaryIndividualGroup= this._formBuilder.group({ 
    firstName: [''],
    lastName: [''],
    middleName: [''],
    title: [''],
    gender: [''],    
    suffix: [''],
    dateOfBirth: [''],
    lastNameAtBirth: [''],    
  });
  
   contactGroup= this._formBuilder.group({ 
    street1: [''],
    street2: [''],
    city: [''],
    state: [''],
    zip: [''],    
    country: [''],
    phoneNumber: [''],
    phoneType: [''],   
    altPhoneNumber: [''],
    altPhoneType: [''], 
    email: [''],   
  });

  householdMembersGroup= this._formBuilder.group({
    householdMembers: [''] 
  });
  finalizeGroup= this._formBuilder.group({
    office: [''] 
  });

  updateNavSelect(){
    this.applicantOn.set(false);
    this.primaryClicked.set(true);
  }
   updateNavSelect1(){
    this.primaryClicked.set(false);
    this.contactClicked.set(true);
  }
     updateNavSelect2(){
    this.householdClicked.set(true);
    this.contactClicked.set(false);
  }
     updateNavSelect3(){
    this.householdClicked.set(false);
    this.finalizeClicked.set(true);
  }

  onSubmit(form: NgForm) {
    // Handle form submission logic her
    console.log(form.value);
  }

  goBack() {
    this.router.navigate(['/'], {
      replaceUrl: true,
    });
  }
  
}
