import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { HomeComponent } from './home/home.component';
  import moment from 'moment';

@Component({
  selector: 'app-root',
  imports: [ RouterOutlet ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Integrated Eligibility System';
   date: Date = new Date();
  searchPageDate: string =moment(this.date).format('MMMM DD YYYY hh:mm A');
  private router = inject(Router);

  register(){   
    this.router.navigate(['/app-application-registration'], {
      replaceUrl: true
    });
  }
 
}
