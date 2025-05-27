import { Routes } from '@angular/router';
import  { HomeComponent } from './home/home.component';
import { ApplicationRegistrationComponent } from './application-registration/application-registration.component';


export const routes: Routes = [
    {
     path: '',
        children: [
            {path: '', component: HomeComponent},
        { path: 'app-application-registration', component: ApplicationRegistrationComponent }, 
        ],
    },

];
