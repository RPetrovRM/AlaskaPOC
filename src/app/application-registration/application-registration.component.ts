import { Component, ElementRef, inject, Renderer2, ViewChild,  } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
  import moment from 'moment';
  import {  NgStyle, NgClass } from '@angular/common';

@Component({
  selector: 'app-application-registration',
  imports:  [ FormsModule, NgStyle, NgClass ],
  templateUrl: './application-registration.component.html',
  styleUrl: './application-registration.component.css'
})
export class ApplicationRegistrationComponent {
  @ViewChild('iconClickable') myElement!: ElementRef;
  renderer = inject(Renderer2);
   date: Date = new Date();
  searchPageDate: string =moment(this.date).format('MMMM DD YYYY hh:mm A');
  private router = inject(Router);
  closeClicked = false;

  noDisplay  = {
    'display':'block'
};

  sendToRegisterApplication() {
    this.router.navigate(['/app-ra-applicant-details'], {}
      );
  }
  onSubmit(form: NgForm) {
    // Handle form submission logic here
    console.log(form.value);
    // this.router.navigate(['/'], {
    //   replaceUrl: true,
    // });
    this.sendToRegisterApplication();
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
