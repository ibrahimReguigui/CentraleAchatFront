import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { LivraisonService } from 'src/app/services/livraison.service';
import { Livraison } from 'src/app/model/livraison';
import { Chart, ChartType } from 'chart.js';
import { LivreurStatistics } from 'src/app/model/livreur-statistics';
import { Userdto } from 'src/app/model/userdto';
import { HttpClient } from '@angular/common/http';
import { AppBreadcrumbService } from 'src/app/app.breadcrumb.service';




@Component({
  selector: 'app-livraison',
  templateUrl: './livraison.component.html',
  styleUrls: ['./livraison.component.scss']
})


export class LivraisonComponent implements OnInit {
  livraisons: Livraison[] = [];
  selectedCode: string = '';
  selectedLivraison: Livraison | null = null;
  idLivreur: string = '';
  codeBill: number | null = null;

  selectedChartType: string = 'bar';

  livreurStatistics: LivreurStatistics | null = null;
  @ViewChild('livreurStatisticsChart') chartRef: ElementRef | null = null;
  chart: Chart | null = null;

  livraisonss: Livraison[];
  successMessage: string | null = null;


  cols = [
    { field: 'idLivraison', header: 'id' },
    { field: 'code', header: 'Code' },
    { field: 'statusLivraison', header: 'Status' },
    { field: 'Description', header: 'Description' },
    { field: 'dateLivraisonPrevue', header: 'Date Livraison Prevue' },
    { field: 'dateLivraison', header: 'Date Livraison' },
    { field: 'idLivreur', header: 'idLivreur' },
    { field: 'createdAt', header: 'Created At' },
    { field: 'sendToTelegram',header: 'Send to Telegram'}

  ];

  users: Userdto[] = [];
  colss: any[];
  selectedUser: Userdto;


  constructor(private livraisonService: LivraisonService, private http: HttpClient,private breadcrumbService: AppBreadcrumbService) {

    this.breadcrumbService.setItems([
      { label: 'Pages' },
      { label: 'Timeline' },
    ]);
   }

  


  ngOnInit(): void {
    this.fetchLivraisonByCode();


    this.livraisonService.getAllLivraisons().subscribe(
      data => {
        this.livraisons = data;
        console.log(data);
      },
      error => {
        console.log(error);
      }
    );


    this.livraisonService.getUsersByRole('COURIER').subscribe(
      (data) => {
        this.users = data;
      },
      (error) => {
        console.log('Error fetching users by role:', error);
      }
    );

    this.colss = [
      { field: 'id', header: 'ID' },
      { field: 'firstName', header: 'First Name' },
      { field: 'lastName', header: 'Last Name' },
      { field: 'email', header: 'Email' },
      { field: 'role', header: 'Role' },
      { field: 'phoneNumber', header: 'Phone Number' },
      { field: 'statusLivreur', header: 'Status Livreur' },
      { field: 'gouvernorat', header: 'Gouvernorat' },
    ];






  }

 




  fetchLivraisonByCode(): void {
    if (this.selectedCode) {
      this.livraisonService.getLivraisonByCode(this.selectedCode).subscribe(
        (livraison) => {
          this.selectedLivraison = livraison;
        },
        (error) => {
          console.error('Error fetching livraison:', error);
          this.selectedLivraison = null;
        }
      );
    } else {
      this.selectedLivraison = null;
    }
  }



  onCodeBillInput(): void {
    if (this.codeBill) {
      this.livraisonService.affecterLivreurVehicule(this.codeBill).subscribe(
        () => {
          console.log('Livreur and Vehicule affected successfully');
        },
        (error) => {
          console.error('Error affecting Livreur and Vehicule:', error);
        }
      );
    }
  }


  sendToTelegram(livraison: Livraison): void {
    const botToken = '5545497438:AAG6eZFigZ_D3hGXBswWEfqUhl5a_ysFR8A';
    const chatId = '5075551493';
    const message = `Livraison Information:
    ID: ${livraison.idLivraison}
    Code: ${livraison.code}
    Status: ${livraison.statusLivraison}
    Description: ${livraison.description}
    Date Livraison Prevue: ${livraison.dateLivraisonPrevue}
    Date Livraison: ${livraison.dateLivraison}
    ID Livreur: ${livraison.idLivreur}
    Created At: ${livraison.createdAt}`;

    const url = `https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(message)}`;

    this.http.get(url).subscribe(
      () => {
        console.log('Message sent to Telegram successfully');
        this.successMessage = 'Message sent to Telegram successfully';
        setTimeout(() => {
          this.successMessage = null;
        }, 3000);
      },
      error => console.error('Error sending message to Telegram:', error)
    );

  }

}
