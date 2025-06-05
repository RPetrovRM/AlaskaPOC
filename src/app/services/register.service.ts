
import { inject, Injectable, signal } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable,pipe, pluck} from 'rxjs';
import { type Applicant } from '../application-registration/applicant.model';
import { response } from 'express';


@Injectable({
  providedIn: "root"})

export class RegisterService {

  applicantDetails: Applicant[] = [];  //update to your API URL
  private apiUrl = 'http://localhost:8080/api/applicant';
  http = inject(HttpClient);
    address = "";

  saveApplicant(applicant: Applicant) : any{
      var uri = encodeURI(`${this.apiUrl}/saveApplicant`);
      let resp = this.http.post<Applicant>(uri, applicant);
      return resp;
  }

  searchBy(applicant: Applicant): any {
    if (applicant.appNumber) {
      this.address = encodeURI(this.apiUrl + `/searchByAppNumber?appNumber=${applicant.appNumber}`);
    }
    else if (applicant.firstName || applicant.lastName) {      
      this.address = encodeURI(this.apiUrl + `/searchByName?firstName=${applicant.firstName}&lastName=${applicant.lastName}`);
    }    
   
   let resp = this.http.get<any>(this.address);
   // console.log("Response from  service: " + resp);
      return resp;
  }

}