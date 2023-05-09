import { Component } from '@angular/core';
import {Product} from "../../../domain/product";
import {SelectItem} from "primeng/api";
import {ProductService} from "../../../service/productservice";
import {AppBreadcrumbService} from "../../../../app.breadcrumb.service";
import {OrderService} from "../../../service/order.service";
import {OrderLine} from "../../../domain/order-line";
import {Order} from "../../../domain/order";


@Component({
  selector: 'app-product-order',
  templateUrl: './product-order.component.html',
  styleUrls: ['./product-order.component.scss']
})
export class ProductOrderComponent {

    products: Product[];

    orderLines: OrderLine[] = [];

    order:Order[];

    deadLine: Date;

    sortOptions: SelectItem[];

    sortOrder: number;

    sortField: string;

    sourceCities: any[];

    targetCities: any[];

    orderCities: any[];

   selectedQuantity:number=1;

    selectedProducts: Product[] = [];

    quantity: any;

    sortKey: any;

    value: any;




    constructor(private productService: ProductService,private  orderService:OrderService, private breadcrumbService: AppBreadcrumbService) {
        this.breadcrumbService.setItems([
            {label: 'Order Management'},
            {label: 'Send Order'}
        ]);
    }

    ngOnInit() {
        this.productService.getAllProducts().subscribe(data => this.products = data);



        this.sortOptions = [
            {label: 'Price High to Low', value: '!unitPriceHT'},
            {label: 'Price Low to High', value: 'unitPriceHT'}
        ];
       }

    removeOrderLine(orderLine: OrderLine) {
        const index = this.orderLines.indexOf(orderLine);
        if (index !== -1) {
            this.orderLines.splice(index, 1);
        }
    }

    removeAllOrderLines() {
        this.orderLines = [];
    }

    addProductToList(products: Product) {

console.log(products)
        const orderLine: OrderLine = {

            idProduct: products.idProduct,
            quantity: products.selectedQuantity

        };
        console.log(products.idProduct)
        console.log(orderLine)
        this.orderLines.push(orderLine);
        products.selectedQuantity = 0;
    }


    submitOrder() {
        const order = {
            deadLine: this.deadLine,
            orderLines: this.orderLines
        };
        console.log(order)
        this.orderService.saveOrder(order).subscribe();
        this.orderLines = [];
        this.deadLine = null;
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







