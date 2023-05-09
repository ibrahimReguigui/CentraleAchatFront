import {Categorie} from "./categorie";

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

}
