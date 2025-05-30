import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import moment from 'moment';

@Component({
  selector: 'app-ra-applicant-details',
  imports: [],
  templateUrl: './ra-applicant-details.component.html',
  styleUrl: './ra-applicant-details.component.css'
})
export class RaApplicantDetailsComponent {
  private router = inject(Router);
  date: Date = new Date();
    searchPageDate: string =moment(this.date).format('MMMM DD YYYY hh:mm A');

  continueToPrimaryIndividualSection(){
    this.router.navigate(['/app-ra-primary-individual'], {
      replaceUrl: true,
    });
  }
}
