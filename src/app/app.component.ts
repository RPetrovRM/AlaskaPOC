import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
  import moment from 'moment';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Integrated Eligibility System';
  date: Date = new Date();
  searchPageDate: string =moment(this.date).format('MMMM DD YYYY hh:mm A');
}
