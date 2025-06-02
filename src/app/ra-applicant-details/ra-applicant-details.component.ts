import { Component, inject } from '@angular/core';
import { FormsModule, NgForm, FormGroup, FormBuilder, FormGroupDirective, Validators, ValidatorFn, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import moment from 'moment';
import {ErrorStateMatcher, MatOptionModule} from '@angular/material/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatStepperModule} from '@angular/material/stepper';
import { race } from 'rxjs';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ra-applicant-details',
  imports: [ ReactiveFormsModule, FormsModule, MatInputModule, MatFormFieldModule, MatStepperModule, MatSelectModule, MatOptionModule, CommonModule ],
  standalone: true,
  templateUrl: './ra-applicant-details.component.html',
  styleUrl: './ra-applicant-details.component.css'
})
export class RaApplicantDetailsComponent {
  private router = inject(Router);
  date: Date = new Date();
    searchPageDate: string =moment(this.date).format('MMMM DD YYYY hh:mm A');    
  private _formBuilder = inject(FormBuilder);
  
  appDetailsGroup= this._formBuilder.group({ 
    applicationType: [''],
    programType: [''],
    applicationDate: [''],
   // clientId: ['', [/* Validators.required */, Validators.pattern(/^\d+$/)]],
   
  });
  continueToPrimaryIndividualSection(){
    this.router.navigate(['/app-ra-primary-individual'], {
      replaceUrl: true,
    });
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
