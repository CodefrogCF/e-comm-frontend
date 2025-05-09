export interface Product {
    id: number;
    name: string;
    image: string;
    price: number;
    stock: Stock;
    short_description: string;
    product_description: string;
}

export interface Stock {
    quantity: number;
}