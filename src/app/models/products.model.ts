export interface Product {
    id: number;
    /*title*/name: string;
    image: string;
    price: number;
    stock?: number;
    short_description: string;
    product_description: string;
}