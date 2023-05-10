import {Categorie} from "./categorie";

export interface Productffff {
    id?: string;
    code?: string;
    name?: string;
    description?: string;
    price?: number;
    quantity?: number;
    inventoryStatus?: string;
    category?: string;
    image?: string;
    rating?: number;
}
export interface Product {

    idProduct?: number;
    name?: string;
    description?: string;
    categorie?: Categorie;
    dateEndDiscount?: Date;
// departement?: Departement;
    discount?: number;
    firstQuantity?: number;
    image?: string;
    lowQuantity?: number;
    quantity?: number;
// unit?: unit;
    unitPriceHT?: number;
    selectedQuantity?: number;
}
