import { Component, inject, input, output, signal } from '@angular/core';
import { Product } from '../../../models/products.model';
import { ButtonComponent } from '../../../components/button/button.component';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { DynamicCurrencyPipe } from '../../../pipes/dynamic-currency.pipe';
import { CartItem, CartService } from '../../../services/cart.service';

@Component({
  selector: 'app-cart-item',
  standalone: true,
  imports: [CommonModule, ButtonComponent, TranslateModule, DynamicCurrencyPipe],
  templateUrl: './cart-item.component.html',
  styleUrl: './cart-item.component.css'
})
export class CartItemComponent {

  cartService = inject(CartService);

  item = input.required<CartItem>();
  index = input.required<number>();
  remove = output<number>();
  currency = signal('EUR');

  increaseQuantity() {
    const current = this.item();
    this.cartService.updateQuantity(current.product.id, current.quantity + 1);
  }

  decreaseQuantity() {
    const current = this.item();
    this.cartService.updateQuantity(current.product.id, current.quantity - 1);
  }

  onQuantityChange(event: Event) {
    const input = event.target as HTMLInputElement;
    const newQuantity = parseInt(input.value, 10);
    const current = this.item();
    this.cartService.updateQuantity(current.product.id, newQuantity);
  }

}
