import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {OffreService} from "../../service/offre.service";
import {Offer} from "../../models/offer";
import {Table} from "primeng/table";
import {ActivatedRoute, Router} from "@angular/router";
import {AppBreadcrumbService} from "../../app.breadcrumb.service";
import {ConfigService} from "../../demo/service/app.config.service";
import {Order} from "../../demo/domain/order";

@Component({
  selector: 'app-get-offer',
  templateUrl: './get-offer.component.html',
  styleUrls: ['./get-offer.component.scss']
})


export class GetOfferComponent implements OnInit {
    listOffer:Offer[]=[];
    offer1:Offer[]
    Offer!:Offer
    //@ts-ignore
    offer11: Offer = {};
    @ViewChild('dt') table: Table;

    @ViewChild('filter') filter: ElementRef;
    constructor(private OffreService: OffreService,private ac:ActivatedRoute,public router:Router, public breadcrumbService: AppBreadcrumbService, public configService: ConfigService) { }

    ngOnInit(): void {

        this.OffreService.getOffer().subscribe(data => {
            this.listOffer=data
            this.listOffer.forEach(offer => offer.creationDate = new Date(offer.creationDate));
        })
    }















    clear(table: Table) {
        table.clear();
        this.filter.nativeElement.value = '';
    }
}

