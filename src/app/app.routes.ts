import { Routes } from '@angular/router';
import  { HomeComponent } from './home/home.component';
import { ApplicationRegistrationComponent } from './application-registration/application-registration.component';
import { RaApplicantDetailsComponent } from './ra-applicant-details/ra-applicant-details.component';


export const routes: Routes = [
    {
     path: '',
        children: [
            {path: '', component: HomeComponent},
        { path: 'app-application-registration', component: ApplicationRegistrationComponent }, 
        { path: 'app-ra-applicant-details', component: RaApplicantDetailsComponent}
        ],
    },

];
