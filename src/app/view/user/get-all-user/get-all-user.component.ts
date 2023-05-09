import {Component, OnInit} from '@angular/core';
import {Product} from "../../../demo/domain/product";
import {ProductService} from "../../../demo/service/productservice";
import {ConfirmationService, MessageService} from "primeng/api";
import {Table} from "primeng/table";
import {UserServiceService} from "../../../service/user/user-service.service";
import {User} from "../../../domain/user";

@Component({
    selector: 'app-get-all-user',
    templateUrl: './get-all-user.component.html',
    providers: [MessageService, ConfirmationService],
    styleUrls: ['./get-all-user.component.scss']
})
export class GetAllUserComponent implements OnInit {
    listUsers: User[] = [];
    user :User ;
    productDialog: boolean = false;

    deleteProductDialog: boolean = false;

    deleteProductsDialog: boolean = false;

    products: Product[] = [];

    product: Product = {};

    selectedProducts: Product[] = [];

    submitted: boolean = false;

    cols: any[] = [];

    statuses: any[] = [];

    rowsPerPageOptions = [5, 10, 20];

    constructor(private userService: UserServiceService, private productService: ProductService, private messageService: MessageService, private confirmationService: ConfirmationService) {
    }

    ngOnInit() {
        this.getUsers();


        this.productService.getProducts().then(data => this.products = data);

        this.cols = [
            {field: 'product', header: 'Product'},
            {field: 'price', header: 'Price'},
            {field: 'category', header: 'Category'},
            {field: 'rating', header: 'Reviews'},
            {field: 'inventoryStatus', header: 'Status'}
        ];

        this.statuses = [
            {label: 'INSTOCK', value: 'instock'},
            {label: 'LOWSTOCK', value: 'lowstock'},
            {label: 'OUTOFSTOCK', value: 'outofstock'}
        ];
    }
    getUsers() {
        this.userService.getAllUsers().subscribe(list => {
                this.listUsers = list;
            }
        )
    }
    openNew() {
        this.product = {};
        this.submitted = false;
        this.productDialog = true;
    }



    deleteSelectedProducts() {
        this.deleteProductsDialog = true;
    }

    editProduct(product: Product) {
        this.product = {...product};
        this.productDialog = true;
    }

    deleteUser(user: User) {
        this.userService.deleteUser(user.id).subscribe();
    }

    confirmDeleteSelected() {
        this.deleteProductsDialog = false;
        this.products = this.products.filter(val => !this.selectedProducts.includes(val));
        this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000});
        this.selectedProducts = [];
    }



    hideDialog() {
        this.productDialog = false;
        this.submitted = false;
    }







    createId(): string {
        let id = '';
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < 5; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return id;
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }
}

