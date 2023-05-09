import {Component, Injectable} from '@angular/core';

import {Categorie} from "../categorie";

import {FormBuilder, FormGroup, Validators} from "@angular/forms";

import {ConfirmationService, MessageService} from "primeng/api";
import {CategorieService} from "../../service/categorie.service";
import {Product} from "../product";
import {Table} from "primeng/table";

@Component({
  selector: 'app-categorie',
    providers: [MessageService, ConfirmationService],
  templateUrl: './categorie.component.html',
  styleUrls: ['./categorie.component.scss']
})
export class CategorieComponent {
    cols: any[] = [];
    selectedCateg: Categorie[] = [];
    categories: Categorie[];
    categorieForm: FormGroup;
    categorieDialog: boolean = false;
    //@ts-ignore
    categ: Categorie={};
    categorie: {} = {};
    submitted: boolean = false;
    deleteCategsDialog: boolean = false;
    deleteCategDialog: boolean = false;

    constructor(private formBuilder: FormBuilder, private categorieService: CategorieService, private messageService: MessageService, private confirmationService: ConfirmationService) {
    }

    ngOnInit() {
        this.categorieService.getAllCategories().subscribe(data => {
            this.categories = data

        });
    }

    addCategorie(categorie: Categorie) {
        if (categorie.idCategorie) {
            // Si l'ID du produit existe, mettez à jour le produit existant
            this.categorieService.updateCategorie(categorie.idCategorie, categorie).subscribe(() => {
                console.log("Categorie updated!");
                this.categorieService.getAllCategories().subscribe(res => {
                    this.categories = res;
                });
            });
        } else {
            // Sinon, ajoutez un nouveau produit
            this.categorieService.addCategorie(categorie).subscribe(() => {
                console.log("Product added!");
                this.categorieService.getAllCategories().subscribe(res => {
                    this.categories = res;

                });
            });
        }
        console.log("Categorie", categorie);
        this.categorieDialog = false;
    }

    editCateg(categ: Categorie) {
        //     this.productService.updateproduct(product.idProduct,product).subscribe(()=> {
        //     console.log("updated!")
        // })

        this.categorie = { ...categ };
        this.categorieDialog = true;
    }

    deleteCateg(categ: Categorie) {
        this.categorieDialog = true;
        this.categorie = { ...categ };
    }

    openNew() {
        this.categorie = {};
        this.submitted = false;
        this.categorieDialog = true;
    }
    deleteSelectedProducts() {
        this.deleteCategsDialog = true;
    }
    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }
    hideDialog() {
        this.categorieDialog = false;
        this.submitted = false;
    }
    submitCateg(categ: Categorie) {
        if (categ.idCategorie) {
            // Si l'ID du produit existe, mettez à jour le produit existant
            this.categorieService.updateCategorie(categ.idCategorie, categ).subscribe(() => {
                console.log("Product updated!");
                this.categorieService.getAllCategories().subscribe(res => {
                    this.categories = res;
                });
            });
        } else {
            // Sinon, ajoutez un nouveau produit
            this.categorieService.addCategorie(categ).subscribe(() => {
                console.log("Product added!");
                this.categorieService.getAllCategories().subscribe(res => {
                    this.categories = res;

                });

            });
        }

        console.log("Categories", categ);
        this.categorieDialog = false;
    }
    confirmDelete(id: number) {
        this.deleteCategDialog = false;
        this.categorieService.deleteCategorie(id).subscribe(() => {
            console.log("deleted!")
        })
        this.categories = this.categories.filter(val => val.idCategorie !== this.categ.idCategorie);
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'categorie Deleted', life: 3000 });
    }
}
