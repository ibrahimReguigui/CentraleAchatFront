import { Component, OnInit } from '@angular/core';
import { Livraison } from '../../model/livraison';
import { LivraisonService } from '../../services/livraison.service';

@Component({
  selector: 'app-livraison-details',
  templateUrl: './livraison-details.component.html',
  styleUrls: ['./livraison-details.component.scss'],
})
export class LivraisonDetailsComponent implements OnInit {
  code: string = '';
  livraison: Livraison | null = null;
  customEvents: any[] | null = null;

  constructor(private livraisonService: LivraisonService) {}

  ngOnInit(): void {}

  onSubmit() {
    this.livraisonService.getLivraisonByCode(this.code).subscribe((response) => {
      this.livraison = response;
      this.updateTimelineWithLivraisonData();
    });
  }

  updateTimelineWithLivraisonData() {
    if (this.livraison) {
      this.customEvents = [
        {
          status: 'Livraison Details',
          date: this.livraison.createdAt,
          description: `Livraison ID: ${this.livraison.idLivraison}, Livreur ID: ${this.livraison.idLivreur}, Vehicle ID: ${this.livraison.idVehicule}`,
          icon: 'pi pi-info-circle',
          color: '#9C27B0',
        },
        {
          status: 'Scheduled Delivery',
          date: this.livraison.dateLivraisonPrevue,
          description: 'Scheduled delivery date',
          icon: 'pi pi-calendar',
          color: '#673AB7',
        },
        {
          status: 'Actual Delivery',
          date: this.livraison.dateLivraison,
          description: 'Actual delivery date',
          icon: 'pi pi-truck',
          color: '#FF9800',
        },
      ];
    }
  }
}
