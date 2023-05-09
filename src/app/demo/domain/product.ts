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
    selectedQuantity: number;
    idProduct?: number;
    description?: string;
    name?: string;
    quantity?: number;
    image?: string;
    unitPriceHT?: number;
    discount?: number;
    firstQuantity?: number;
    lowQuantity?: number;
    code?:string;
}
