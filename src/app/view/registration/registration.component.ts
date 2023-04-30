import { Component } from '@angular/core';
import {User} from "../../domain/user";
import {Company} from "../../domain/company";
import {UserServiceService} from "../../service/user/user-service.service";
import {AppBreadcrumbService} from "../../app.breadcrumb.service";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
    styles: [`:host ::ng-deep .p-multiselect {
        min-width: 15rem;
    }

    :host ::ng-deep .multiselect-custom-virtual-scroll .p-multiselect {
        min-width: 20rem;
    }

    :host ::ng-deep .multiselect-custom .p-multiselect-label {
        padding-top: .25rem;
        padding-bottom: .25rem;

    }


    :host ::ng-deep .multiselect-custom .country-item.country-item-value {
        padding: .25rem .5rem;
        border-radius: 3px;
        display: inline-flex;
        margin-right: .5rem;
        background-color: var(--primary-color);
        color: var(--primary-color-text);
    }

    :host ::ng-deep .multiselect-custom .country-item.country-item-value img.flag {
        width: 17px;
    }

    :host ::ng-deep .multiselect-custom .country-item {
        display: flex;
        align-items: center;
    }

    :host ::ng-deep .multiselect-custom .country-item img.flag {
        width: 18px;
        margin-right: .5rem;
    }

    :host ::ng-deep .multiselect-custom .country-placeholder {
        padding: 0.25rem;
    }

    :host ::ng-deep .p-colorpicker {
        width: 2.5em
    }
    `]
})

export class RegistrationComponent {
    role = [
        {name: 'Supplier', value: 1},
        {name: 'Client', value: 2}
    ];

    user: User = new User();
    company:Company=new Company();


    constructor(private userService: UserServiceService, private breadcrumbService: AppBreadcrumbService) {
        this.breadcrumbService.setItems([
            {label: 'UI Kit'},
            {label: 'Input'}
        ]);
    }

    addUser() {
        this.user.companyDto=this.company;
        this.user.role=this.user.role.name.toUpperCase();
        this.userService.addUser(this.user).subscribe(
            (response: any) => {
                console.log(response.status);
                console.log(response.headers);
                console.log(response.body);
            },
            (error: any) => {
                console.log(error.status);
                console.log(error.statusText);
            })
    }
}

