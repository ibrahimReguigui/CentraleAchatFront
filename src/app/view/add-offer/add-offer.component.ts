import { Component } from '@angular/core';
import { Offer } from '../../models/offer';
import { OffreService } from '../../service/offre.service'; 
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-add-offer',
  templateUrl: './add-offer.component.html',
  styleUrls: ['./add-offer.component.scss']
})
export class AddOfferComponent {
  constructor(private OffreService: OffreService) { }
  offer: Offer=new Offer();

  save(){
   
    this.OffreService.addOffer(this.offer).subscribe(
      (r=>console.log(r) )
    ); 
    
  }

}
