import { Component, OnInit } from '@angular/core';
import { BestProductsService } from 'src/app/service/best-products.service';

@Component({
  selector: 'app-best-product-dashboard',
  templateUrl: './best-product-dashboard.component.html',
  styleUrls: ['./best-product-dashboard.component.scss']
})
export class BestProductDashboardComponent implements OnInit {
  barData: any;
  labels = new Array<Object>();
  datasets = new Array<Object>();
  barOptions: any;
  arr = new Array();
  constructor(private bestProductService: BestProductsService) { }
  ngOnInit(): void {
    this.bestProductService.bestProductForSuppliers().subscribe((data: Object[]) => {
      data.forEach((d: any) => {
        this.labels.push(d.supplier);
        var y: number = +d.supplier;
        this.arr[y - 1] = d.percentage;
      })
    })

    this.barData = {
      labels: this.labels,
      datasets: [{
        label: "best product",
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgb(255, 99, 132)',
        data: this.arr,
        tension: 0
      }]
    };
    console.log("dataset : ",this.barData)
  }

  applyLightTheme() {
    this.barOptions = {
      plugins: {
        legend: {
          labels: {
            fontColor: '#A0A7B5'
          }
        }
      },
      scales: {
        x: {
          ticks: {
            color: '#A0A7B5'
          },
          grid: {
            color: 'rgba(160, 167, 181, .3)',
          }
        },
        y: {
          ticks: {
            color: '#A0A7B5'
          },
          grid: {
            color: 'rgba(160, 167, 181, .3)',
          }
        },
      }
    };
  }

}
