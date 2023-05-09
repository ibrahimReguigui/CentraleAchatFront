import {Component, OnInit} from '@angular/core';
import {SelectItem} from 'primeng/api';
import {Product} from '../domain/product';
import {ProductService} from '../service/productservice';
import {AppBreadcrumbService} from '../../app.breadcrumb.service';

@Component({
    templateUrl: './listdemo.component.html',
    styleUrls: ['../../../assets/demo/badges.scss']

})
export class ListDemoComponent implements OnInit {

    products: Product[];

    sortOptions: SelectItem[];

    sortOrder: number;

    sortField: string;

    sourceCities: any[];

    targetCities: any[];

    orderCities: any[];

    constructor(private productService: ProductService, private breadcrumbService: AppBreadcrumbService) {
        this.breadcrumbService.setItems([
            {label: 'UI Kit'},
            {label: 'List'}
        ]);
    }

    ngOnInit() {
        this.productService.getAllProducts().subscribe(data => this.products = data);


        this.sourceCities = [
            { field: 'name', header: 'name' },
            { field: 'description', header: 'description' },
            { field: 'quantity', header: 'quantity' },
            { field: 'unitPriceHT', header: 'unitPriceHT' },
        ];

        this.targetCities = [];

        this.orderCities = [
            { field: 'name', header: 'name' },
            { field: 'description', header: 'description' },
            { field: 'quantity', header: 'quantity' },
            { field: 'unitPriceHT', header: 'unitPriceHT' },];

        this.sortOptions = [
            {label: 'Price High to Low', value: '!price'},
            {label: 'Price Low to High', value: 'price'}
        ];
    }

    onSortChange(event) {
        const value = event.value;

        if (value.indexOf('!') === 0) {
            this.sortOrder = -1;
            this.sortField = value.substring(1, value.length);
        } else {
            this.sortOrder = 1;
            this.sortField = value;
        }
    }
}
