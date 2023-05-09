import {Component, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as Chart from 'chart.js'
import {ConfirmationService, MessageService} from "primeng/api";
@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
    providers: [MessageService, ConfirmationService],
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit  {


    constructor(private http: HttpClient) { }

    ngOnInit() {
        this.http.get('http://localhost:8097/product/GetTop').subscribe((data: any[]) => {
            const labels = data.map(item => item.productName);
            const values = data.map(item => item.totalSales);
            // @ts-ignore
            const chart = new Chart('top-selling-products-chart', {
                type: 'bar',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Total Sales',
                        data: values,
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true
                            }
                        }]
                    }
                }
            });
        });
    }

}
