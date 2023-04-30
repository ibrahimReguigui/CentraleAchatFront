import {Component, OnInit} from '@angular/core';
import {UserServiceService} from "../../service/user/user-service.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit{
    user:any;
    constructor(private userService: UserServiceService) {}
    ngOnInit(): void {
         this.userService.getProfile().subscribe(
            r=>{
                this.user=r;
            })
    }
}
