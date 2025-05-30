import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
  import moment from 'moment';

@Component({
  selector: 'app-application-registration',
  imports:  [ FormsModule ],
  templateUrl: './application-registration.component.html',
  styleUrl: './application-registration.component.css'
})
export class ApplicationRegistrationComponent {
   date: Date = new Date();
  searchPageDate: string =moment(this.date).format('MMMM DD YYYY hh:mm A');
  private router = inject(Router);

  sendToRegisterApplication() {
    this.router.navigate(['/app-ra-applicant-details'], {}
      );
  }
  onSubmit(form: NgForm) {
    // Handle form submission logic here
    console.log(form.value);
    this.router.navigate(['/'], {
      replaceUrl: true,
    });
  }

  goBack() {
    this.router.navigate(['/'], {
      replaceUrl: true,
    });
  }
}
