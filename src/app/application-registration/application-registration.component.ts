
import { Component, DestroyRef, inject, model, signal } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
  import moment from 'moment';
  import {  NgStyle, NgClass } from '@angular/common';
  import { type Applicant } from './applicant.model';
  import { RegisterService } from '../services/register.service';
import {  pipe, pluck } from 'rxjs';


@Component({
  selector: 'app-application-registration',
  imports:  [ FormsModule, NgStyle, NgClass ],
  standalone: true,  
  templateUrl: './application-registration.component.html',
  styleUrl: './application-registration.component.css'
})

export class ApplicationRegistrationComponent {
  private router = inject(Router);
  private registerService = inject(RegisterService);
   date: Date = new Date();
  searchPageDate: string =moment(this.date).format('MMMM DD YYYY hh:mm A');
  closeClicked = false;
  private destroyRef = inject(DestroyRef);
 private emptyApplicant: Applicant[] = [];
 states = [];

    noDisplay  = {
    'display':'block'
};

  sendToRegisterApplication(applicant: Applicant[]) {   

    this.router.navigate(['/app-ra-applicant-details'],  { state: { applicant: JSON.stringify(applicant) } })
  }

  //this is search button click handler
  onSubmit(form: NgForm) {    
    //console.log(form.value);
     let searchForm = form.value as Applicant;  
     if ((searchForm.appNumber !== null &&  String(searchForm.appNumber) !== '') || searchForm.firstName !== '' ||
      searchForm.lastName !== ''){
                
            let returnData = this.registerService.searchBy(searchForm)
            .pipe(pluck("applicant"))

            let responseData = returnData
            .subscribe((r: Applicant[]) => {
              console.log(r);                        
                this.sendToRegisterApplication(r);

            });

            this.destroyRef.onDestroy(() => {
              responseData.unsubscribe();
            });
      }
      else
       {      
              this.sendToRegisterApplication(this.emptyApplicant); // send empty array if no data found
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