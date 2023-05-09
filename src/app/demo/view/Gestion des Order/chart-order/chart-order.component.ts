import {Component, ElementRef, ViewChild} from '@angular/core';
import {Order} from "../../../domain/order";
import {OrderLine} from "../../../domain/order-line";
import {Bill} from "../../../domain/bill";
import {ActivatedRoute} from "@angular/router";
import {Product} from "../../../domain/product";
import {AppConfig} from "../../../domain/appconfig";
import {Subscription} from "rxjs";
import {Table} from "primeng/table";
import {OrderService} from "../../../service/order.service";
import {Router} from "@angular/router";
import {AppBreadcrumbService} from "../../../../app.breadcrumb.service";
import {ConfigService} from "../../../service/app.config.service";

@Component({
  selector: 'app-chart-order',
  templateUrl: './chart-order.component.html',
  styleUrls: ['./chart-order.component.scss']
})
export class ChartOrderComponent {
    order!: Order

    //@ts-ignore
    order11: Order = {};

    order1: Order[];

    order2: Order[];

    order3: Order[];

    selectedOrder1: Order[];

    selectedOrder: Order[];

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

    loading: boolean = true;

    config: AppConfig;

    subscription: Subscription;

    @ViewChild('dt') table: Table;

    @ViewChild('filter') filter: ElementRef;

    constructor(public orderService: OrderService, public router: Router, public breadcrumbService: AppBreadcrumbService, public configService: ConfigService) {
        this.breadcrumbService.setItems([
            {label: 'manage order'},
            {label: 'order status'}
        ]);
    }

    ngOnInit(): void {
        this.orderService.getOrders().subscribe(data => {
            this.pieData = this.getChartData(data);

        });
    }

    private getChartData(data: any[]): any {
            const chartData = {
                PENDING: 0,
                COMPLETED: 0,
                RETURNED: 0,
                CANCELED: 0,
            };

            data.forEach((order) => {
                chartData[order.status]++;
            });
            console.log(data);

            return {
                labels: ['Pending', 'Completed', 'Returned', 'Cancelled'],
                datasets: [
                    {
                        data: [
                            chartData.PENDING,
                            chartData.COMPLETED,
                            chartData.RETURNED,
                            chartData.CANCELED,
                        ],
                        backgroundColor: [
                            "#FFCE56",
                            "#4BC0C0",
                            "#36A2EB",
                            "#FF6384"
                        ],
                        hoverBackgroundColor: [
                            "#FFCE56",
                            "#4BC0C0",
                            "#36A2EB",
                            "#FF6384"
                        ],
                    },
                ],
            };
        }

    private getPieOptions(): any {
            return {
                legend: {
                    display: true,
                    position: 'bottom',
                },
            };
        }
    }
