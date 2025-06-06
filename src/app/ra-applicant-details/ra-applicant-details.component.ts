import { Component, inject,signal, DestroyRef } from '@angular/core';
import { FormsModule, NgForm,  FormBuilder, FormGroupDirective, Validators, ValidatorFn, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import moment from 'moment';
import {ErrorStateMatcher, MatOptionModule} from '@angular/material/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatStepper, MatStepperModule, MatStepperNext} from '@angular/material/stepper';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule, NgClass, NgFor, NgIf } from '@angular/common';
  import { type Applicant } from '../application-registration/applicant.model';
  import { RegisterService } from '../services/register.service';
import { pluck } from 'rxjs';

@Component({
  selector: 'app-ra-applicant-details',
  imports: [ ReactiveFormsModule, FormsModule, MatInputModule, MatFormFieldModule,
     MatStepperModule, MatStepper, MatStepperNext, MatSelectModule, MatOptionModule, CommonModule, NgClass, NgFor ],
  standalone: true,
  templateUrl: './ra-applicant-details.component.html',
  styleUrl: './ra-applicant-details.component.css'
})
export class RaApplicantDetailsComponent  {
  private router = inject(Router);
  private registerService = inject(RegisterService);  
  private destroyRef = inject(DestroyRef);
  date: Date = new Date();
    searchPageDate: string =moment(this.date).format('MMMM DD YYYY hh:mm A');    
  private _formBuilder = inject(FormBuilder);
  applicantOn = signal(true);
  primaryClicked = signal(false);
  contactClicked = signal(false);
  householdClicked = signal(false);  
  finalizeClicked = signal(false);  
  closeClicked = false;
  successfulSubmission = false;
  
   suffixes = [{value: 'II'}, {value: 'Jr'}, {value: 'I'}, 
      {value: 'ESQ'}, {value: 'III'}, {value: 'IV'}, {value: 'Sr'}];
 
  noDisplay  = {
    'display':'block'
};

  appDetailsGroup= this._formBuilder.group({ 
    applicationType: [''],
    programType: [''],
    applicationDate: [''] ,
    id: [''],  
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
 const registerForm = this.appDetailsGroup.value as Applicant    
   // console.log(registerForm);
         if (registerForm.appDate !== null){                    
                let returnData = this.registerService.saveApplicant(registerForm);
    
                let responseData = returnData
                .pipe(pluck("status"))
                .subscribe((r: string) => {   
                  console.log(r);       
                 
                });
    
                this.destroyRef.onDestroy(() => {
                  responseData.unsubscribe();
                });
          }
    

  }
   updateNavSelect1(){
    this.primaryClicked.set(false);
    this.contactClicked.set(true);

     const registerForm = this.primaryIndividualGroup.value as Applicant    
   // console.log(registerForm);
         if (registerForm.firstName !== '' ||
          registerForm.lastName !== ''){                    
                let returnData = this.registerService.saveApplicant(registerForm);
    
                let responseData = returnData
                .pipe(pluck("status"))
                .subscribe((r: string) => {   
                  console.log(r);       
                  
                });
    
                this.destroyRef.onDestroy(() => {
                  responseData.unsubscribe();
                });
          }
    
  }
     updateNavSelect2(){
    this.householdClicked.set(true);
    this.contactClicked.set(false);

     const registerForm = this.contactGroup.value as Applicant    
   // console.log(registerForm);
         if (registerForm.street1 !== '' ){                    
                let returnData = this.registerService.saveApplicant(registerForm);
    
                let responseData = returnData
                .pipe(pluck("status"))
                .subscribe((r: string) => {   
                  console.log(r);       
                
                });
    
                this.destroyRef.onDestroy(() => {
                  responseData.unsubscribe();
                });
          }
    
  }
     updateNavSelect3(){
    this.householdClicked.set(false);
    this.finalizeClicked.set(true);
    
     const registerForm = this.householdMembersGroup.value as Applicant    
   // console.log(registerForm);
         if (registerForm.additionalHouseholdMembers !== null){                    
                let returnData = this.registerService.saveApplicant(registerForm);
    
                let responseData = returnData
                .pipe(pluck("status"))
                .subscribe((r: string) => {   
                  console.log(r); 
                });
    
                this.destroyRef.onDestroy(() => {
                  responseData.unsubscribe();
                });
          }
    
  }


ngOnInit(): void {   
    const applicant = history.state['applicant'];
   // console.log(applicant); 
    const data = JSON.parse(applicant) as Applicant;
    
    if (data.id !== undefined){   
      // console.log(data);
      const birthDate = new Date(data.dateOfBirth);
      const birthDateFormatted = moment(birthDate).format('yyyy-MM-DD');
      this.primaryIndividualGroup.setValue({
        firstName: data.firstName,
        lastName: data.lastName,
        middleName: data.middleName,
        title: data.title,
        gender: data.gender,
        suffix: data.suffix || '',
        dateOfBirth: birthDateFormatted,
        lastNameAtBirth: data.birthLastName
      });

      const dateApp = new Date(data.appDate);
      const dateAppFormatted = moment(dateApp).format('yyyy-MM-DD');
    this.appDetailsGroup= this._formBuilder.group({ 
      id: data.id?.toString(),
      applicationType: data.appType,
      programType:data.programType,
      applicationDate: dateAppFormatted
    });

        this.contactGroup.setValue({
          street1: data.street1 || '',
          street2: data.street2 || '',
          city: data.city || '',
          state: data.state || '',
          zip: data.zip || '',
          country: data.country || '',
          phoneNumber: data.phoneNumber || '',
          phoneType: data.phoneType || '',
          altPhoneNumber: data.altPhoneNumber || '',
          altPhoneType: data.altPhoneType || '',
          email: data.email || ''
        });
        this.householdMembersGroup.setValue({
          householdMembers: data.additionalHouseholdMembers === true? 'Y' : 'N'
        });
        this.finalizeGroup.setValue({
          office: data.office || 'Juneau'
        });

      }
}
  
 // onSubmit(form: NgForm) {
 onSubmit(): void{
    // Handle form submission logic her
    const registerForm = this.finalizeGroup.value as Applicant    
   // console.log(registerForm);
         if (registerForm.office !== '' ){                    
                let returnData = this.registerService.saveApplicant(registerForm);
    
                let responseData = returnData
                .pipe(pluck("status"))
                .subscribe((r: string) => {   
                  console.log(r);       
                   this.successfulSubmission = true;
                });
    
                this.destroyRef.onDestroy(() => {
                  responseData.unsubscribe();
                });
          }
    
  }

  goBack() {
    this.router.navigate(['/'], {
      replaceUrl: true,
    });
  }

    onListIconClick() {// iconClickable
    this.closeClicked = !this.closeClicked;
    if (this.closeClicked) {
      this.noDisplay = {
        'display': 'none'
      };
      
    } else {
      this.noDisplay = {
        'display': 'block'
      };
    }
  }
  
  
}
