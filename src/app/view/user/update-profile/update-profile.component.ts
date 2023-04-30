import {Component, OnInit} from '@angular/core';
import {UserServiceService} from "../../../service/user/user-service.service";
import {Router} from "@angular/router";

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
        console.log(this.user.given_name)
        this.userService.updateUser(this.user).subscribe(
            (response: any) => {
                console.log(this.user.given_name)
                this.router.navigate(['/profile'])
            },
            (error: any) => {
                console.log(error.status);
                console.log(error.statusText);
            }
        )
    }
}
