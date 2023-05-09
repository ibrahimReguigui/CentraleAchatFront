import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { VehiculeService } from 'src/app/services/vehicule.service';
import { Chart, ChartType, registerables } from 'chart.js';
import { Observable } from 'rxjs';
import { VehiculeStatistics } from 'src/app/model/vehicule-statistics';

import { LivraisonService } from 'src/app/services/livraison.service';
import { Livraison } from 'src/app/model/livraison';

import { LivreurStatistics } from 'src/app/model/livreur-statistics';

@Component({
  selector: 'app-vehicule-statistics',
  templateUrl: './vehicule-statistics.component.html',
  styleUrls: ['./vehicule-statistics.component.scss'],
})
export class VehiculeStatisticsComponent implements OnInit {

  livreurIds: string[] = [];

  statistics: VehiculeStatistics;
  columnChart: any;
  
  barChart:any ; 


  livraisons: Livraison[] = [];
  selectedCode: string = '';
  selectedLivraison: Livraison | null = null;
  idLivreur: string = '';
  codeBill: number | null = null;

  selectedChartType: string = 'bar';

  livreurStatistics: LivreurStatistics | null = null;
  @ViewChild('livreurStatisticsChart') chartRef: ElementRef | null = null;
  chart: Chart | null = null;


  selectedLivreurId: string;





  constructor(private vehiculeService: VehiculeService,
              private livraisonService: LivraisonService ) { }

  ngOnInit(): void {
    this.fetchVehiculeStatistics();

    this.fetchLivreurIds();
  
  }

  fetchLivreurIds() {
    this.livraisonService.getAllLivreurIds().subscribe(
      (livreurIds: string[]) => {
        this.livreurIds = livreurIds;
      },
      (error) => {
        console.log('Error fetching livreur IDs:', error);
      }
    );
  }
  
  fetchVehiculeStatistics(): void {
    this.vehiculeService.getVehiculeStatistics().subscribe(
      (data) => {
        this.statistics = data;
        this.createBarChart();
      },
      (error) => {
        console.error('Error fetching vehicle statistics', error);
      }
    );
  }
  
  createBarChart(): void {
    if (!this.statistics) {
      return;
    }
    const ctx = document.getElementById('barChart') as HTMLCanvasElement;
    const chartData = {
      labels: ['Total', 'Disponible','Occupe'],
      datasets: [
        {
          label: 'Nombre de véhicules',
          data: [this.statistics.Total, this.statistics.Disponible, this.statistics.Occupe],

          backgroundColor: ['#36A2EB', 'green','red'],
        },
      ],
    };
    const chartOptions = {
      responsive: true,
      aspectRatio: 0.8,
      scales: {
        y: {
          beginAtZero: true
        }
      }
    };
    this.barChart = new Chart(ctx, {
      type: 'bar',
      data: chartData,
      options: chartOptions
    });
  }


  // from livraison heeey 

    createChart(): void {
      if (!this.chartRef || !this.chartRef.nativeElement || !this.livreurStatistics) {
        return;
      }
    
      if (this.chart) {
        this.chart.destroy();
      }
    
      // Define your own array of colors
      const colors = [
        "#FF6384",
        "#36A2EB",
        "#FFCE56"
      ];
    
      // Generate an array of colors for the bars, repeating the colors array if needed
      const backgroundColors = this.livreurStatistics.values.map(
        (_, index) => colors[index % colors.length]
      );
    
      this.chart = new Chart(this.chartRef.nativeElement, {
        type: this.selectedChartType as ChartType,
        data: {
          labels: this.livreurStatistics.labels,
          datasets: [
            {
              data: this.livreurStatistics.values,
              backgroundColor: backgroundColors,
              borderColor: backgroundColors.map((color) => color.replace('0.2', '1')),
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
          maintainAspectRatio: false, // This allows you to control the size of the chart
        },
      });
    }
   

//second one from livraison  Fetching 

fetchLivreurStatistics(): void {
  this.livraisonService.getLivreurStatistics(this.selectedLivreurId).subscribe(
    (statistics) => {
      const labels = Object.keys(statistics);
      const values = Object.values(statistics);
      this.livreurStatistics = { labels, values };

      if (this.chartRef && this.chartRef.nativeElement) {
        this.createChart();
      }
    },
    (error) => {
      console.error('Error fetching livreur statistics:', error);
    }
  );
}







  }
 