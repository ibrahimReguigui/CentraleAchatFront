import {Component, OnInit} from '@angular/core';
import {CompanyService} from "../../service/company/company.service";
import {UserServiceService} from "../../service/user/user-service.service";
import {Company} from "../../domain/company";

@Component({
  selector: 'app-company-user-profile',
  templateUrl: './company-profile.component.html',
  styleUrls: ['./company-profile.component.scss']
})
export class CompanyProfileComponent implements OnInit{

    company:Company;
    constructor(private companyService:CompanyService,private userService: UserServiceService) {}

    ngOnInit(): void {
        this.userService.getProfile().subscribe(result => {
            this.companyService.getCompany(result.idCompany).subscribe(result => {
                this.company = result;
                console.log(this.company);
            });
        });
    }
}
