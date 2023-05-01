import {Component, OnInit} from '@angular/core';
import {UserServiceService} from "../../../service/user/user-service.service";
import {Router} from "@angular/router";
import {User} from "../../../domain/user";

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.scss']
})
export class UpdateProfileComponent implements OnInit{
    user:any;
    constructor(private userService: UserServiceService,private router:Router) {}
    ngOnInit(): void {
        this.userService.getProfile().subscribe(
            result=>{
                this.user=result;
            })
    }
    updateProfile(){
        let upUser:User=new User();
        upUser.firstName=this.user.given_name
        upUser.lastName=this.user.family_name
        upUser.role=this.user.realm_access.roles[3]
        upUser.phoneNumber=this.user.phoneNumber
        upUser.adress=this.user.adress
        upUser.image=this.user.image
        this.userService.updateUser(upUser).subscribe(
            (response: any) => {
                this.router.navigate(['/profile'])
            },
            (error: any) => {
                console.log(error.status);
                console.log(error.statusText);
            }
        )
    }
}
