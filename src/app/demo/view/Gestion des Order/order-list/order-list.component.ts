import {ChangeDetectorRef, Component, ElementRef, ViewChild} from '@angular/core';
import {OrderService} from "../../../service/order.service";
import {Router} from "@angular/router";
import {Order} from "../../../domain/order";
import {Table} from "primeng/table";
import {OrderLine} from "../../../domain/order-line";
import {Bill} from "../../../domain/bill";
import {Product} from "../../../domain/product";
import {AppBreadcrumbService} from "../../../../app.breadcrumb.service";
import {ConfirmationService, MessageService} from "primeng/api";
import {ConfigService} from "../../../service/app.config.service";
import {AppConfig} from "../../../domain/appconfig";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss'],
    styles: [`
        :host ::ng-deep  .p-frozen-column {
            font-weight: bold;
        }

        :host ::ng-deep .p-datatable-frozen-tbody {
            font-weight: bold;
        }

        :host ::ng-deep .p-progressbar {
            height:.5rem;
        }
    `]
})
export class OrderListComponent {

     order!:Order

    //@ts-ignore
    order11: Order = {};

    order1:Order[];

    order2:Order[];

    order3:Order[];

    selectedOrder1:Order[];

    selectedOrder:Order[];

    orderLine: OrderLine[];

    pieData: any;

    pieOptions: any;

    bill: Bill[];

    statuses: any[];

    products: Product[];

    rowGroupMetadata: any;

    expandedRows = {};

    activityValues: number[] = [0, 100];

    isExpanded: boolean = false;

    idFrozen: boolean = false;

    loading:boolean = true;

    config: AppConfig;

    subscription: Subscription;

    @ViewChild('dt') table: Table;

    @ViewChild('filter') filter: ElementRef;

    constructor(public orderService:OrderService,public router:Router, public breadcrumbService: AppBreadcrumbService, public configService: ConfigService) {
        this.breadcrumbService.setItems([
            {label: 'Order Management'},
            {label: 'List'}
        ]);
    }

    ngOnInit(): void {

            this.orderService.getOrders().subscribe(data =>{
               // @ts-ignore
                this.order1 =data
           this.loading = false;
                // @ts-ignore
                this.order1.forEach(order => order.deadLine = new Date(order.deadLine));

            })

        this.statuses = [
            {label: 'COMPLETED', value: 'COMPLETED'},
            {label: 'PENDING', value: 'PENDING'},
            {label: 'RETURNED', value: 'RETURNED'},
            {label: 'CANCELED', value: 'CANCELED'},

        ];


        this.config = this.configService.config;
        this.subscription = this.configService.configUpdate$.subscribe(config => {
            this.config = config;
            this.updateChartOptions();
        });

        this.pieData = {
            labels: ['A', 'B', 'C'],
            datasets: [
                {
                    data: [300, 50, 100],
                    backgroundColor: [
                        "#FF6384",
                        "#36A2EB",
                        "#FFCE56"
                    ],
                    hoverBackgroundColor: [
                        "#FF6384",
                        "#36A2EB",
                        "#FFCE56"
                    ]
                }
            ]
        };


    }

    updateChartOptions() {
        if (this.config.dark)
            this.applyDarkTheme();
        else
            this.applyLightTheme();
    }
    applyLightTheme() {
        this.pieOptions = {
            plugins: {
                legend: {
                    labels: {
                        color: '#495057'
                    }
                }
            }
        };
    }
    applyDarkTheme() {
        this.pieOptions = {
            plugins: {
                legend: {
                    labels: {
                        color: '#ebedef'
                    }
                }
            }
        };
    }
    onSort() {
        this.updateRowGroupMetaData();
    }

    updateRowGroupMetaData() {
        this.rowGroupMetadata = {};

        if (this.order3) {
            for (let i = 0; i < this.order3.length; i++) {
                const rowData = this.order3[i];
                const CustomerName = rowData.clientName;

                if (i === 0) {
                    this.rowGroupMetadata[CustomerName] = { index: 0, size: 1 };
                }
                else {
                    const previousRowData = this.order3[i - 1];
                    const previousRowGroup = previousRowData.clientName;
                    if (CustomerName === previousRowGroup) {
                        this.rowGroupMetadata[CustomerName].size++;
                    }
                    else {
                        this.rowGroupMetadata[CustomerName] = { index: i, size: 1 };
                    }
                }
            }
        }
    }




    formatCurrency(value) {
        return value.toLocaleString('en-tn', {style: 'currency', currency: 'TND'});
    }

    clear(table: Table) {
        table.clear();
        this.filter.nativeElement.value = '';
    }
}
