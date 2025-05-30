import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
  import moment from 'moment';

@Component({
  selector: 'app-application-registration',
  imports: [],
  templateUrl: './application-registration.component.html',
  styleUrl: './application-registration.component.css'
})
export class ApplicationRegistrationComponent {
   date: Date = new Date();
  searchPageDate: string =moment(this.date).format('MMMM DD YYYY hh:mm A');
  private router = inject(Router);

  sendToRegisterApplication() {
    this.router.navigate(['/app-ra-applicant-details'], {
      replaceUrl: true,
    });
  }

}
