import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {KeycloakService} from "keycloak-angular";
import {Observable} from "rxjs";
import {User} from "../../domain/user";

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
    url="http://localhost:8096/user"
    constructor(private http:HttpClient ,private keycloakService:KeycloakService) { }
    private getAuthHeaders(): HttpHeaders {
        const token = this.keycloakService.getKeycloakInstance().token;
        return new HttpHeaders().set('Authorization', `Bearer ${token}`);
    }
    addUser(user : User) {
        return this.http.post(`${this.url}/registerSupplierClient`,user)
    }
    getProfile(): Observable<any> {
        let headers =new HttpHeaders().set('Authorization', 'Bearer ' + this.getAuthHeaders());
        return this.http.get(this.url+'/profile', { headers });
    }
    updateUser(user : any) {
        let headers =new HttpHeaders().set('Authorization', 'Bearer ' + this.getAuthHeaders());
        console.log("service"+user.given_name)
        return this.http.put(`${this.url}/updateProfile`,user, { headers })
    }
}
