import { Component, inject } from '@angular/core';
import { FormsModule, NgForm, FormGroup, FormBuilder, FormGroupDirective, Validators, ValidatorFn, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import moment from 'moment';
import {ErrorStateMatcher, MatOptionModule} from '@angular/material/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatStepperModule, MatStepperNext} from '@angular/material/stepper';
import { race } from 'rxjs';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule, NgClass } from '@angular/common';
import { text } from 'stream/consumers';

@Component({
  selector: 'app-ra-applicant-details',
  imports: [ ReactiveFormsModule, FormsModule, MatInputModule, MatFormFieldModule,
     MatStepperModule, MatSelectModule, MatOptionModule, CommonModule, NgClass ],
  standalone: true,
  templateUrl: './ra-applicant-details.component.html',
  styleUrl: './ra-applicant-details.component.css'
})
export class RaApplicantDetailsComponent {
  private router = inject(Router);
  date: Date = new Date();
    searchPageDate: string =moment(this.date).format('MMMM DD YYYY hh:mm A');    
  private _formBuilder = inject(FormBuilder);
  primaryClicked: boolean = false;

  selectedStep= {    
    'color': '#00367d',
    'textDecoration': 'underline',
  };
  notSelected = {
    'color': 'white',  
    'textDecoration': 'none'}
  
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
 
   onSubmit(form: NgForm) {
    // Handle form submission logic her
    console.log(form.value);   
    
  }

  goBack() {
    this.router.navigate(['/'], {
      replaceUrl: true,
    });
  }
  primarySelect() {
    this.primaryClicked = true;
  }
  
}
