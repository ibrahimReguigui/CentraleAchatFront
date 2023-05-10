import {ProductService} from '../demo/service/productservice';
import {ConfirmationService, MessageService} from 'primeng/api';
import {AppBreadcrumbService} from '../app.breadcrumb.service';
import { Table } from 'primeng/table';
import {Categorie} from "../demo/domain/categorie";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Unite} from "../demo/domain/unite";
import {Departement} from "../demo/domain/departement";
import {Product} from "../demo/domain/product";
import {Component, OnInit} from "@angular/core";

@Component({
    templateUrl: './app.crud.component.html',
    providers: [MessageService, ConfirmationService],
    styleUrls: ['../../assets/demo/badges.scss']
})
export class AppCrudComponent implements OnInit {
    topSellingProducts: Product [] = [];

    productDialog: boolean = false;

    deleteProductDialog: boolean = false;

    deleteProductsDialog: boolean = false;

    products: Product[];

    product: Product ={};

    selectedProducts: Product[] = [];

    TopProductDialog:boolean = false;

    submitted: boolean = false;

    categories:Categorie[];
    unites:Unite[];
    departement:Departement[];

    cols: any[] = [];

    statuses: any[] = [];

    rowsPerPageOptions = [5, 10, 20];

    addProductForm: FormGroup;
    selectedCategorieId: number;
    selectedDepartementId: number;
    selectedUniteId: number;

    image: File;
    private uploadedFiles: any;

    constructor(private formBuilder: FormBuilder,private productService: ProductService,private messageService: MessageService, private confirmationService: ConfirmationService) { }

    ngOnInit() {

        this.productService.getAllProducts().subscribe(res => {
            this.products = res;
        });
        this.productService.getAllCategories().subscribe(data=>{
            this.categories=data
        })
        this.productService.getAllDepartement().subscribe(data=>{
            this.departement=data
        })
        this.productService.getAllUnites().subscribe(data=>{
            this.unites=data
        })


        this.addProductForm = this.formBuilder.group({
            name: ['', Validators.required],
            description: ['', Validators.required],
            price: ['', Validators.required],
            quantity: ['', Validators.required]
        });

        this.cols = [
            { field: 'name', header: 'name' },
            { field: 'description', header: 'description' },
            { field: 'quantity', header: 'quantity' },
            { field: 'unitPriceHT', header: 'unitPriceHT' },
        ];

        this.statuses = [
            { label: 'INSTOCK', value: 'instock' },
            { label: 'LOWSTOCK', value: 'lowstock' },
            { label: 'OUTOFSTOCK', value: 'outofstock' }
        ];
        console.log(this.product)
    }

    /*onSelectFile(event: any) {
        const fileList: FileList = event.target.files;
        if (fileList.length > 0) {
            const file: File = fileList[0];
            const reader: FileReader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                let base64: string = reader.result as string;
                // Remove prefix
                base64 = base64.substring(base64.indexOf(',') + 1);
                this.product.image = base64;
                console.log(this.product.image);
            };
        }
    }*/
    onSelectFile(event: any) {
        const fileList: FileList = event.target.files;
        if (fileList.length > 0) {
            const file: File = fileList[0];
            const reader: FileReader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                let base64: string = reader.result as string;
                // Remove prefix
                base64 = base64.substring(base64.indexOf(',') + 1);
                this.product.image = base64;
                console.log(this.product.image);
            };
        }
    }
    submitProduct(product: Product) {
        if (product.idProduct) {
            // Si l'ID du produit existe, mettez à jour le produit existant
            this.productService.updateproduct(product.idProduct, product).subscribe(() => {
                console.log("Product updated!");
                this.productService.getAllProducts().subscribe(res => {
                    this.products = res;
                });
            });
        } else {
            // Sinon, ajoutez un nouveau produit
            this.productService.addProductAndAffect(this.selectedCategorieId,this.selectedUniteId,this.selectedDepartementId,this.product).subscribe(() => {
                console.log("Product added!");
                this.productService.getAllProducts().subscribe(res => {
                    this.products = res;

                });

            });
        }

        console.log("Product", product);
        this.productDialog = false;
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
        //     this.productService.updateproduct(product.idProduct,product).subscribe(()=> {
        //     console.log("updated!")
        // })

        this.product = { ...product };
        this.productDialog = true;
    }

    deleteProduct(product: Product) {
        this.deleteProductDialog = true;
        this.product = { ...product };
    }

    // confirmDeleteSelected() {
    //     this.deleteProductsDialog = false;
    //     this.products = this.products.filter(val => !this.selectedProducts.includes(val));
    //     this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
    //     this.selectedProducts = [];
    // }

    confirmDelete(id: number) {
        this.deleteProductDialog = false;
        this.productService.deleteProduct(id).subscribe(() => {
            console.log("deleted!")
        })
        this.products = this.products.filter(val => val.idProduct !== this.product.idProduct);
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
        this.product = {};
    }

    hideDialog() {
        this.productDialog = false;
        this.submitted = false;
    }
    hideTopDialog() {
        this.TopProductDialog = false;
    }

    // saveProduct() {
    //     this.submitted = true;

    //     if (this.product.name?.trim()) {
    //         // if (this.product.id) {
    //         //     // @ts-ignore
    //         //     this.product.inventoryStatus = this.product.inventoryStatus.value ? this.product.inventoryStatus.value : this.product.inventoryStatus;
    //         //     this.products[this.findIndexById(this.product.id)] = this.product;
    //         //     this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
    //         // } else {
    //         //     this.product.id = this.createId();
    //         //     this.product.code = this.createId();
    //         //     this.product.image = 'product-placeholder.svg';
    //         //     // @ts-ignore
    //         //     this.product.inventoryStatus = this.product.inventoryStatus ? this.product.inventoryStatus.value : 'INSTOCK';
    //         //     this.products.push(this.product);
    //         //     this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000 });
    //         // }

    //         this.products = [...this.products];
    //         this.productDialog = false;
    //         this.product = {};
    //     }
    // }



    updateProduct(product: Product) {
        if(product.idProduct !== undefined) {
            this.productService.updateproduct(product.idProduct,product).subscribe(()=>{
                console.log("updated!")
                this.productService.getAllProducts().subscribe(res => {
                    this.products = res
                })
            })
        } else {
            this.productService.addproduct(product).subscribe(()=>{
                this.productService.getAllProducts().subscribe(res => {
                    this.products = res
                })
            })
        }

        console.log("product",product)

        this.productDialog = false;
    }


    findIndexById(id: number): number {
        let index = -1;
        for (let i = 0; i < this.products.length; i++) {
            if (this.products[i].idProduct === id) {
                index = i;
                break;
            }
        }

        return index;
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
    exportPDF() {
        this.productService.exportToPDF().subscribe(blob => {
            const downloadLink = document.createElement('a');
            const url = URL.createObjectURL(blob);
            downloadLink.href = url;
            downloadLink.download = 'produit.pdf';
            downloadLink.click();
            URL.revokeObjectURL(url);
        });
    }
    getTopSellingProducts() {

        this.productService.getTopSellingProducts().subscribe(products => {
            this.topSellingProducts = products;
            this.TopProductDialog = true;
        });
    }
}
