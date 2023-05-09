import { AppBreadcrumbService } from 'src/app/app.breadcrumb.service';
import { Vehicule } from 'src/app/model/vehicule';
import { Component, OnInit } from '@angular/core';
import { VehiculeService } from 'src/app/services/vehicule.service';

import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';

@Component({
    templateUrl: './vehiculeAdd.component.html',
    providers: [MessageService, ConfirmationService],
    styleUrls: ['badges.scss']
})
export class VehiculeAddComponent implements OnInit {

    vehiculeDialog: boolean = false;

    deleteVehiculeDialog: boolean = false;

    deleteVehiculesDialog: boolean = false;

    vehicules: Vehicule[] = [];

    vehicule: Vehicule = {};

    selectedVehicules: Vehicule[] = [];

    submitted: boolean = false;

    cols: any[] = [];

    statuses: any[] = [];

    rowsPerPageOptions = [5, 10, 20];

    loading: boolean = false;


    constructor(private vehiculeService: VehiculeService, private messageService: MessageService, private confirmationService: ConfirmationService) { }

    ngOnInit() {
        this.getAllvehicule();


        this.cols = [
            { field: 'model', header: 'Model' },
            { field: 'registrationNumber', header: 'Registration' },
            { field: 'type', header: 'Type' },
            { field: 'color', header: 'Color' },
            { field: 'idLivreur', header: 'id-Livreur ' },
            { field: 'location', header: 'Location' },
            { field: 'statusVehicule', header: 'Status' }


        ];

        this.statuses = [
            { label: 'Ariana', value: 'Ariana' },
            { label: 'Beja', value: 'Beja' },
            { label: 'BenArous', value: 'BenArous' },
            { label: 'Bizerte', value: 'Bizerte' },
            { label: 'Gabes', value: 'Gabes' },
            { label: 'Gafsa', value: 'Gafsa' },
            { label: 'Jendouba', value: 'Jendouba' },
            { label: 'Kairouan', value: 'Kairouan' },
            { label: 'Kasserine', value: 'Kasserine' },
            { label: 'Kebili', value: 'Kebili' },
            { label: 'LeKef', value: 'LeKef' },
            { label: 'Mahdia', value: 'Mahdia' },
            { label: 'Manouba', value: 'Manouba' },
            { label: 'Médenine', value: 'Médenine' },
            { label: 'Monastir', value: 'Monastir' },
            { label: 'Nabeul', value: 'Nabeul' },
            { label: 'Sfax', value: 'Sfax' },
            { label: 'SidiBouzid', value: 'SidiBouzid' },
            { label: 'Siliana', value: 'Siliana' },
            { label: 'Sousse', value: 'Sousse' },
            { label: 'Tataouine', value: 'Tataouine' },
            { label: 'Tozeur', value: 'Tozeur' },
            { label: 'Tunis', value: 'Tunis' },
            { label: 'Zaghouan', value: 'Zaghouan' },
        ];
    }

    private getAllvehicule() {
        this.vehiculeService.getVehiculeList().subscribe(data => {
            this.vehicules = data;
        },
            (error: any) => {
                console.error('Error fetching vehicle list:', error);
            }
        );
        this.refreshVehicules();
    }




    openNew() {
        this.vehicule = {};
        this.submitted = false;
        this.vehiculeDialog = true;
    }




    refreshVehicules(): void {
        this.vehiculeService.getVehiculeList().subscribe(
            data => {
                this.vehicules = data;
            },
            error => {
                console.error("Error fetching vehicules:", error);
            }
        );
    }

    // editVehicule(vehicule: Vehicule) {

    //     this.vehicule = { ...vehicule }; // Assign the selected vehicle's properties to the component's vehicule object
    //     this.vehiculeDialog = true;
    // }



    // vehicule.component.ts
    deleteVehicule(vehicule: Vehicule) {
        this.vehiculeService.deleteVehicule(vehicule.idVehicule).subscribe(
            () => {
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Vehicule Deleted', life: 3000 });
                this.vehicules = this.vehicules.filter(val => val.idVehicule !== vehicule.idVehicule);
            },
            error => console.log(error)
        );
        this.refreshVehicules();
    }

    // vehicule.component.ts
    deleteSelectedVehicules() {
        const deleteTasks = this.selectedVehicules.map(vehicule => this.vehiculeService.deleteVehicule(vehicule.idVehicule).toPromise());

        Promise.all(deleteTasks).then(() => {
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Vehicules Deleted', life: 3000 });
            this.vehicules = this.vehicules.filter(val => !this.selectedVehicules.includes(val));
            this.selectedVehicules = [];
        }).catch(error => console.log(error));
    }



    async confirmDelete() {
        this.loading = true;
        // Call your REST API and remove the vehicle from the local list
        this.loading = false;
    }

    async confirmDeleteSelected() {
        this.loading = true;
        // Call your REST API and remove the selected vehicles from the local list
        this.loading = false;
    }




    // deleteSelectedVehicules() {
    //     this.deleteVehiculesDialog = true;
    // }

    // deleteVehicule(vehicule: Vehicule) {
    //     this.deleteVehiculeDialog = true;
    //     this.vehicule = { ...vehicule };
    // }

    // confirmDeleteSelected() {
    //     this.deleteVehiculesDialog = false;
    //     this.vehicules = this.vehicules.filter(val => !this.selectedVehicules.includes(val));
    //     this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Vehicules Deleted', life: 3000 });
    //     this.selectedVehicules = [];
    // }

    // confirmDelete() {
    //     this.deleteVehiculeDialog = false;
    //     this.vehicules = this.vehicules.filter(val => val.idVehicule !== this.vehicule.idVehicule);
    //     this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Vehicule Deleted', life: 3000 });
    //     this.vehicule = {};
    // }




    hideDialog() {
        this.vehiculeDialog = false;
        this.submitted = false;
    }


    editVehicule(vehicule: Vehicule) {
        this.vehicule = { ...vehicule }; // Assign the selected vehicle's properties to the component's vehicule object
        this.vehiculeDialog = true;
    }
// vehiculeAdd.component.ts

saveVehicule() {
    this.submitted = true;

    if (this.vehicule.registrationNumber.trim()) {
        if (this.vehicule.idVehicule) {
            // Update the existing vehicle
            this.vehiculeService.updateVehicule(this.vehicule.idVehicule, this.vehicule).subscribe(response => {
                console.log(response); // Here you can handle the response from the API
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Vehicule Updated', life: 3000 });
            }, error => {
                console.error(error); // Handle the error response from the API
            });
            this.refreshVehicules();
        } else {
            // Add new vehicle
            this.vehicule.createdAt = new Date(); // Add the current date and time to the createdAt property
            this.vehiculeService.createVehicule(this.vehicule).subscribe(response => {
                console.log(response); // Here you can handle the response from the API
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Vehicule Created', life: 3000 });
            }, error => {
                console.error(error); // Handle the error response from the API
            });
            this.refreshVehicules();
        }

        this.vehicules = [...this.vehicules];
        this.vehiculeDialog = false;
        this.vehicule = {};
        this.refreshVehicules();
    }
    this.refreshVehicules();
}




    findIndexById(idVehicule: number): number {
        let index = -1;
        for (let i = 0; i < this.vehicules.length; i++) {
            if (this.vehicules[i].idVehicule === idVehicule) {
                index = i;
                break;
            }
        }
        return index;
    }

    createId(): number {
        // Generate a unique ID for the new vehicle.
        // This is a placeholder implementation; replace with your desired ID generation logic.
        return Math.floor(Math.random() * 1000000);
    }



    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }
}
