import { Component, signal } from '@angular/core';
import { Product } from '../../models/products.model';
import { ProductCardComponent } from '../../pages/products-list/product-card/product-card.component';

@Component({
  selector: 'app-products-list',
  imports: [ProductCardComponent],
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.css'
})
export class ProductsListComponent {

  products = signal<Product[]>([]);

  async ngOnInit() {

    const res = await fetch('http://127.0.0.1:8000/products/?format=json');
    
    const data = await res.json();

    // preis in zahl umwandeln
    const parsed = data.map((product: any) => ({
      ...product,
      price: parseFloat(product.price),
    }));

    this.products.set(parsed);
  }

/*
  products = signal<Product[]>([
    {
      id: 1,
      name: 'Fjallraven - Foldsack No. 1 Backpack',
      image: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
      price: 109.95,
      stock: 10,
      short_description: 'Your perfect pack for everyday use and walks in the forest.',
      product_description: 'Stash your laptop (up to 15 inches) in the padded sleeve, your everyday',
    },

    {
      id: 2,
      name: 'Mens Casual Premium Slim Fit T-Shirt',
      image: 'https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg',
      price: 22.90,
      stock: 22,
      short_description: 'Slim-fitting, relaxed-fit denim with a drawstring waistband.',
      product_description: 'Slim-fitting, relaxed-fit denim with a drawstring waistband. The slim-fitting, relaxed-fit denim with a drawstring waistband.',
    },

    {
      id: 3,
      name: 'Mens Cotton Jacket',
      image: 'https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg',
      price: 39.99,
      stock: 10,
      short_description: 'Slim-fitting, relaxed-fit denim with a drawstring waistband.',
      product_description: 'Slim-fitting, relaxed-fit denim with a drawstring waistband. The slim-fitting, relaxed-fit denim with a drawstring waistband.',
    },

    {
      id: 4,
      name: 'Mens Casual Slim Fit',
      image: 'https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg',
      price: 15.99,
      stock: 12,
      short_description: 'The slim-fitting, relaxed-fit denim with a drawstring waistband.',
      product_description: 'The slim-fitting, relaxed-fit denim with a drawstring waistband. The slim-fitting, relaxed-fit denim with a drawstring waistband.',
    },
    {
      id: 5,
      name: "John Hardy Women's Legends Naga Gold & Silver Dragon Chain Bracelet",
      image: 'https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg',
      price: 694.95,
      stock: 0,
      short_description: 'From our Legends Collection, the dragon is a symbol of wisdom and strength.',
      product_description: 'From our Legends Collection, the dragon is a symbol of wisdom and strength. From our Legends Collection, the dragon is a symbol of wisdom and strength.',
    },
    {
      id: 6,
      name: 'Solid Gold Petite Micropave',
      image: 'https://fakestoreapi.com/img/61sbMiUnoGL._AC_UL640_QL65_ML3_.jpg',
      price: 168.99,
      stock: 5,
      short_description: 'Sleek and simple, this 14k gold plated necklace is a perfect everyday accessory.',
      product_description: 'Sleek and simple, this 14k gold plated necklace is a perfect everyday accessory. Sleek and simple, this 14k gold plated necklace is a perfect everyday accessory.',
    },
  ])
  */
}
