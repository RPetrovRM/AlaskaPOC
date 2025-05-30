import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";


@Injectable({
  providedIn: "root"})
export class RegisterService {
    //update to your API URL 
   //  private apiUrl = "https://localhost:8080/api";

  constructor(private http: HttpClient) {}

  // registerUser(userData: any) {
  //   return this.http.post(this.apiUrl, userData);
  // }

  // getRegistrationStatus(userId: string) {
  //   return this.http.get(`${this.apiUrl}/${userId}/status`);
  // }
}