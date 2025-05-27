import { Injectable, signal } from '@angular/core';
import { Product } from '../models/products.model';

export interface CartItem {
  product: Product;
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cart = signal<CartItem[]>([]);

  addToCart(product: Product) {
    const current = this.cart();
    const index = current.findIndex(item => item.product.id === product.id);
    if (index > -1) {
      const item = current[index];
      if (item.quantity < product.stock) {
        item.quantity++;
        this.cart.set([...current]);
      } else {
        alert('OUT_OF_STOCK');
      }
    } else {
      this.cart.set([...current, { product, quantity: 1 }]);
    }
  };

  updateQuantity(productId: number, quantity: number) {
    const current = this.cart();
    const index = current.findIndex(item => item.product.id === productId);

    if (index > -1) {
      const item = current[index];

      if (quantity <= 0) {
        current.splice(index, 1);
      } else  if (quantity <= item.product.stock) {
        item.quantity = quantity;
      } else {
        alert('OUT_OF_STOCK');
      }
      this.cart.set([...current]);
    }
  }

  removeFromCart(index: number) {
    const current = this.cart();
    current.splice(index, 1);
    this.cart.set([...current]);
  };

  getQuantity(productId: number): number {
    const item = this.cart().find(i => i.product.id === productId);
    return item ? item.quantity : 0;
  }

  constructor() { }
}
