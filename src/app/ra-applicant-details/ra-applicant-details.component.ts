import { Component, inject,signal, DestroyRef } from '@angular/core';
import { FormsModule, FormBuilder,  Validators,  ReactiveFormsModule, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import moment from 'moment';
import { MatOptionModule} from '@angular/material/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatStepper, MatStepperModule, MatStepperNext} from '@angular/material/stepper';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule, NgClass, NgFor, NgIf } from '@angular/common';
  import { type Applicant, States} from '../application-registration/applicant.model';
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
    searchPageDate: string =moment(this.date).format('MM DD YYYY hh:mm A');    
  private _formBuilder = inject(FormBuilder);
  applicantOn = signal(true);
  primaryClicked = signal(false);
  contactClicked = signal(false);
  householdClicked = signal(false);  
  finalizeClicked = signal(false);  
  closeClicked = false;
  successfulSubmission = false;  
  states = States;
  titleCard = "";

   suffixes = [{value: 'II'}, {value: 'Jr'}, {value: 'I'}, 
      {value: 'ESQ'}, {value: 'III'}, {value: 'IV'}, {value: 'Sr'}];

  appTypes = [{value: 'New'}, {value: 'Old'}, {value: 'Renewal'}, {value: 'Reinstate'}, {value: 'Reissue'}];

  programTypes = [{value: 'ProgramType1'}, {value: 'ProgramType2'}];

  noDisplay  = {
    'display':'block'
};
   
 toggleColor() {
    this.successfulSubmission = !this.successfulSubmission;
  }

  appDetailsGroup= this._formBuilder.group({ 
    appType: [''],
    programType: [''],
    applicationDate: [''],
    id: [''],
    appNumber: [''] 
  });

   primaryIndividualGroup= this._formBuilder.group({ 
    firstName: [''],
    lastName: [''],
    middleName: [''],
    title: [''],
    gender: ['', Validators.required],    
    suffix: [''],
    dateOfBirth: ['', Validators.required],
    lastNameAtBirth: ['']    
  });
  
   contactGroup= this._formBuilder.group({ 
    street1: ['', Validators.required],
    street2: [''],
    city: ['', Validators.required],
    state: ['', Validators.required],
    zip: ['', Validators.required],    
    country: ['', Validators.required],
    phoneNumber: [''],
    phoneType: [''],
    altPhoneNumber: [''],
    altPhoneType: [''],
    email: ['']
  });

  householdMembersGroup= this._formBuilder.group({
    householdMembers: ['', Validators.required]
  });
  finalizeGroup= this._formBuilder.group({
    office: ['', Validators.required]
  });

  updateNavSelect(){
    if (this.appDetailsGroup.invalid) {
      this.appDetailsGroup.markAllAsTouched();
      return;
    }
    this.applicantOn.set(false);
    this.primaryClicked.set(true);

 const registerForm = this.appDetailsGroup.value as Applicant    
 
    registerForm.appDate = '';  
                               
                 let returnData = this.registerService.saveApplicant(registerForm);
  
                let responseData = returnData
                .pipe(pluck("applicant"))
                .subscribe((r: Applicant) => {   
                   
                console.log(r);
             
                });
    
                this.destroyRef.onDestroy(() => {
                  responseData.unsubscribe();
                });       
    
  }

   updateNavSelect1(){
    if (this.primaryIndividualGroup.invalid) {
      this.primaryIndividualGroup.markAllAsTouched();
      return;
    }
    this.primaryClicked.set(false);
    this.contactClicked.set(true);

     const registerForm = this.primaryIndividualGroup.value as Applicant;
    
         if (registerForm.firstName !== '' ||
          registerForm.lastName !== ''){          
              this.updateRegisterFormWithAppDetails(registerForm);
            
              registerForm.dateOfBirth = moment(registerForm.dateOfBirth).format('MM-DD-YYYY hh:mm A'); 
                let returnData2 = this.registerService.saveApplicant(registerForm);
    
                let responseData2 = returnData2
                .pipe(pluck("applicant"))
                .subscribe((r: Applicant) => {   
                  console.log(r);   
                });    
                   this.destroyRef.onDestroy(() => {
                  responseData2.unsubscribe();
                });   
           
          }
    
  }

     updateNavSelect2(){
      if (this.contactGroup.invalid) {
      this.contactGroup.markAllAsTouched();
      return;
    }
    this.householdClicked.set(true);
    this.contactClicked.set(false);

     const registerForm = this.contactGroup.value as Applicant    
   // console.log(registerForm);
         if (registerForm.street1 !== '' ){    
            this.updateRegisterFormWithAppDetails(registerForm);
            this.updateRegisterFormWithPrimaryDetails(registerForm);   
            console.log("our form data" + JSON.stringify(registerForm));                       
                let returnData1 = this.registerService.saveApplicant(registerForm);    
                let responseData1 = returnData1
                .pipe(pluck("applicant"))
                .subscribe((r: any) => {   
                  console.log(r); 
                });
                   this.destroyRef.onDestroy(() => {
                  responseData1.unsubscribe();
                });   
          }
    
  }

     updateNavSelect3(){
      if (this.householdMembersGroup.invalid) {
      this.householdMembersGroup.markAllAsTouched();
      
      return;
    }
    this.householdClicked.set(false);
    this.finalizeClicked.set(true);
    
     const registerForm = this.householdMembersGroup.value as Applicant    
   // console.log(registerForm);
         if (registerForm.additionalHouseholdMembers !== null){     
                          this.updateRegisterFormWithAppDetails(registerForm);
                this.updateRegisterFormWithPrimaryDetails(registerForm);
                this.updateRegisterFormWithContactDetails(registerForm);     
                let returnDataa = this.registerService.saveApplicant(registerForm);
    
                let responseDataa = returnDataa
                .pipe(pluck("applicant"))
                .subscribe((r: any) => {   
                  console.log(r); 
                });
    
                this.destroyRef.onDestroy(() => {
                  responseDataa.unsubscribe();
                });
          }
    
  }


ngOnInit(): void {  
  // Parsing the search data 
  let applicant = JSON.parse(history.state['applicant']) as Applicant;
  
  // If applicant number is not undefined and is an empty string, we will create a new applicant
  // Otherwise, we will load the existing applicant data
  if (applicant.appNumber == undefined || applicant.appNumber.toString() === '') {        
  
     const registerForm = this.appDetailsGroup.value as Applicant   
      let returnData = this.registerService.saveApplicant(registerForm)

                let responseData = returnData
                .pipe(pluck("applicant"))
                .subscribe((r: Applicant) => {   
                  console.log(r);                   
                  let applicant = JSON.stringify(r);
                   let data = JSON.parse(applicant) as Applicant;
                      this.loadData(data);
                      this.titleCard = "Register Application "
                });

                this.destroyRef.onDestroy(() => {
                  responseData.unsubscribe();
                });
              

  }else{
    this.loadData(applicant as Applicant);
    this.titleCard = "Update Existing Application - App No. " + this.appDetailsGroup.value.appNumber?.toString();
  } 

   
}

loadData(data: Applicant): void { 
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
                  lastNameAtBirth: data.birthLastName,
                
                });
                
                const dateApp = new Date(this.searchPageDate);
                let dateAppFormatted = moment(dateApp).format('yyyy-MM-DD');
                if (dateAppFormatted === '1969-12-31') 
                  dateAppFormatted = moment(new Date()).format('yyyy-MM-DD');

                this.appDetailsGroup= this._formBuilder.group({       
                  appType: data.appType,
                  programType:data.programType,
                  applicationDate: dateAppFormatted,
                  id: data.id.toString(),
                  appNumber: data.appNumber.toString()
                });
                  this.contactGroup.setValue({
                    street1: data.street1 ?? '',
                    street2: data.street2 ?? '',
                    city: data.city ?? '',
                    state: data.state ?? '',
                    zip: data.zip ?? '',
                    country: data.country ?? '',
                    phoneNumber: data.primaryPhone ?? '',
                    phoneType: data.primaryPhoneType ?? '',
                    altPhoneNumber: data.secondaryPhone ?? '',
                    altPhoneType: data.secondaryPhoneType ?? '',
                    email: data.email ?? ''
                  
                  });
                  this.householdMembersGroup.setValue({
                    householdMembers: data.additionalHouseholdMembers === true? 'Y' : 'N',                   
                  });
                  this.finalizeGroup.setValue({
                    office: data.office ?? 'Juneau'
                  });
                }
   }

  onSubmit(): void{
    if (this.finalizeGroup.invalid) {
      this.finalizeGroup.markAllAsTouched();
      return;
    }

    const registerFormFinally = this.finalizeGroup.value as Applicant    
    console.log(registerFormFinally);
         if (registerFormFinally.office !== '' ){    
                this.updateRegisterFormWithAppDetails(registerFormFinally);
                this.updateRegisterFormWithPrimaryDetails(registerFormFinally);
                this.updateRegisterFormWithContactDetails(registerFormFinally);
                this.updateRegisterFormWithHouseholdDetails(registerFormFinally);                
                let returnDataFinalally = this.registerService.saveApplicant(registerFormFinally);
    
                let responseDataFinally = returnDataFinalally
                .pipe(pluck("status"))
                .subscribe((r: string) => {   
                  console.log(r);
                   this.toggleColor();       
                   this.successfulSubmission = true;
                   this.finalizeGroup.get('office')?.disable();
                });
    
                this.destroyRef.onDestroy(() => {
                  responseDataFinally.unsubscribe();
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

  getErrorMessage(controlName: string, group: FormGroup): string {
    const control = group.get(controlName);
    if (control?.hasError('required')) {
      return 'This field is required.';
    }
    if (control?.hasError('minlength')) {
      return 'Must be at least 3 characters';
    }
    if (control?.hasError('pattern')) {
      return 'Invalid format.';
    }
    
    return '';
  }
  
    updateRegisterFormWithAppDetails(registerForm: Applicant): Applicant {
         registerForm.id = this.appDetailsGroup.value.id?.toString() ?? '';
                registerForm.appNumber = this.appDetailsGroup.value.appNumber?.toString() ?? '';
                registerForm.programType = this.appDetailsGroup.value.programType?.toString() ?? '';
                registerForm.appType = this.appDetailsGroup.value.appType?.toString() ?? '';
                registerForm.appDate = this.appDetailsGroup.value.applicationDate?.toString() ?? '';
                return registerForm;
  }
  updateRegisterFormWithPrimaryDetails(registerForm: Applicant): Applicant {
         registerForm.firstName = this.primaryIndividualGroup.value.firstName?.toString() ?? '';
         registerForm.lastName = this.primaryIndividualGroup.value.lastName?.toString() ?? '';
         registerForm.middleName = this.primaryIndividualGroup.value.middleName?.toString() ?? '';
         registerForm.title = this.primaryIndividualGroup.value.title?.toString() ?? '';
         registerForm.gender = this.primaryIndividualGroup.value.gender?.toString() ?? '';
         registerForm.suffix = this.primaryIndividualGroup.value.suffix?.toString() ?? '';
         registerForm.dateOfBirth = this.primaryIndividualGroup.value.dateOfBirth?.toString() ?? '';
         registerForm.birthLastName = this.primaryIndividualGroup.value.lastNameAtBirth?.toString() ?? '';
         return registerForm;
  }

  updateRegisterFormWithContactDetails(registerForm: Applicant): Applicant   {
         registerForm.street1 = this.contactGroup.value.street1?.toString() ?? '';
                registerForm.street2 = this.contactGroup.value.street2?.toString() ?? '';
                registerForm.city = this.contactGroup.value.city?.toString() ?? '';
                registerForm.state = this.contactGroup.value.state?.toString() ?? '';
                registerForm.zip = this.contactGroup.value.zip?.toString() ?? '';
                registerForm.country = this.contactGroup.value.country?.toString() ?? '';
                registerForm.primaryPhone = this.contactGroup.value.phoneNumber?.toString() ?? '';
                registerForm.primaryPhoneType = this.contactGroup.value.phoneType?.toString() ?? '';
                registerForm.secondaryPhone = this.contactGroup.value.altPhoneNumber?.toString() ?? '';
                registerForm.secondaryPhone = this.contactGroup.value.altPhoneType?.toString() ?? '';
                registerForm.email = this.contactGroup.value.email?.toString() ?? '';
                return registerForm;
  }

  updateRegisterFormWithHouseholdDetails(registerForm: Applicant): Applicant {
         registerForm.additionalHouseholdMembers = this.householdMembersGroup.value.householdMembers === 'Y';
         return registerForm;
  }
}
