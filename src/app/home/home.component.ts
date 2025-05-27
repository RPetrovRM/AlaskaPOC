import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
  import moment from 'moment';
  

@Component({
  selector: 'app-home',
  imports: [ ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
   date: Date = new Date();
  searchPageDate: string =moment(this.date).format('MMMM DD YYYY hh:mm A');
  private router = inject(Router);

  register(){   
    this.router.navigate(['/app-application-registration'], {
      replaceUrl: true,
    });
  }
}
