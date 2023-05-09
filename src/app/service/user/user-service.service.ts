import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {KeycloakService} from "keycloak-angular";
import {Observable} from "rxjs";
import {User} from "../../domain/user";
import {map} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class UserServiceService {
    url = "http://localhost:8096/user"

    constructor(private http: HttpClient, private keycloakService: KeycloakService) {
    }

    private getAuthHeaders(): HttpHeaders {
        const token = this.keycloakService.getKeycloakInstance().token;
        return new HttpHeaders().set('Authorization', `Bearer ${token}`);
    }

    addUser(user: User) {
        return this.http.post(`${this.url}/registerSupplierClient`, user)
    }

    getProfile(): Observable<any> {
        let headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.getAuthHeaders());
        return this.http.get(this.url + '/profile', {headers});
    }

    getAllUsers(): Observable<User[]> {
        let headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.getAuthHeaders());
        return this.http.get<User[]>(this.url + "/getAllUsers", {headers});
    }

    updateUser(user: any) {
        let headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.getAuthHeaders());
        return this.http.put(`${this.url}/updateProfile`, user, {headers})
    }

    deleteUser(userId: string) {
        let headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.getAuthHeaders());
        return this.http.delete(`${this.url}/deleteUser/${userId}`, {headers})
    }

    getEventGraphData(userid: string): Observable<Map<Date, number[]>> {
        let headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.getAuthHeaders());
        return this.http.get<Map<Date, number[]>>(`${this.url}/graphvalue/${userid}`, {headers});
    }

    getLoginErrorCount(userid: string) {
        let headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.getAuthHeaders());
        console.log("inside getLoginErrorCount param userid " + userid)
        return this.http.get(this.url + '/getLoginErrorsForUser/' + userid, {headers});
    }

    deactivateActivateAccount(userid: string) {
        let headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.getAuthHeaders());
        console.log("inside deactivateActivateAccount param userid " + userid)
        return this.http.get(this.url + '/deactivateActivateAccount/' + userid, {headers});
    }

    logout() {
        this.keycloakService.logout('http://localhost:4200/#/profile')
    }

    clearEvent(): Observable<any> {
        return this.http.get(this.url + '/clear');
    }

    sendMail(to :string,subject:string,body:string) {
        return this.http.get(this.url + `/sendMail/${to}/${subject}/${body}`);
    }
}
