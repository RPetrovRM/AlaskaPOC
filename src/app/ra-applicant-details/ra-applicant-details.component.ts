import { Component, inject,signal } from '@angular/core';
import { FormsModule, NgForm,  FormBuilder, FormGroupDirective, Validators, ValidatorFn, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import moment from 'moment';
import {ErrorStateMatcher, MatOptionModule} from '@angular/material/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatStepper, MatStepperModule, MatStepperNext} from '@angular/material/stepper';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule, NgClass } from '@angular/common';
  import { type Applicant } from '../application-registration/applicant.model';

@Component({
  selector: 'app-ra-applicant-details',
  imports: [ ReactiveFormsModule, FormsModule, MatInputModule, MatFormFieldModule,
     MatStepperModule, MatStepper, MatStepperNext, MatSelectModule, MatOptionModule, CommonModule, NgClass],
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
  closeClicked = false;
 
  noDisplay  = {
    'display':'block'
};

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


ngOnInit(): void {   
    const applicant = history.state['applicant'];
    console.log(applicant); 
    const data = JSON.parse(applicant) as Applicant;
    

    if (data.id !== undefined){   
      let genderValue = '';
      (data.gender === '') ? genderValue = '' : (data.gender === "M")?  genderValue = "1" : genderValue = "2" ; 
       console.log(data);
      const birthDate = new Date(data.dateOfBirth);
      const birthDateFormatted = moment(birthDate).format('MM/DD/YYYY');
      this.primaryIndividualGroup.setValue({
        firstName: data.firstName,
        lastName: data.lastName,
        middleName: data.middleName,
        title: data.title,
        gender: genderValue,
        suffix: data.suffix || '',
        dateOfBirth: birthDateFormatted,
        lastNameAtBirth: data.birthLastName
      });

      const dateApp = new Date(data.appDate);
      const dateAppFormatted = moment(dateApp).format('MM/DD/YYYY');
    let appDetailsGroup= this._formBuilder.group({ 
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
          householdMembers: data.additionalHouseholdMembers === true? 'Yes' : 'No'
        });
        this.finalizeGroup.setValue({
          office: data.office || 'No'
        });

      }
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
