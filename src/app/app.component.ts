import {Component, OnInit} from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import {UserServiceService} from "./service/user/user-service.service";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
})
export class AppComponent implements OnInit{

    topbarTheme = 'light';

    menuTheme = 'dim';

    layoutMode = 'light';

    menuMode = 'static';

    isRTL = false;

    inputStyle = 'outlined';

    ripple: boolean;

    constructor(private primengConfig: PrimeNGConfig,private userService:UserServiceService) {}

    ngOnInit() {
        this.primengConfig.ripple = true;
        this.userService.getProfile().subscribe(
            r=>{
                console.log(r)
            })
    }
}
