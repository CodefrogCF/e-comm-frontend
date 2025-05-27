import { Component, inject, computed, signal } from '@angular/core';
import { CartService } from '../../../services/cart.service';
import { PrimaryButtonComponent } from '../../../components/primary-button/primary-button.component';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { DynamicCurrencyPipe } from '../../../pipes/dynamic-currency.pipe';
import { Router } from '@angular/router';
import { OrderService, OrderPayload } from '../../../services/order.service';

@Component({
  selector: 'app-order-summary',
  imports: [CommonModule, PrimaryButtonComponent, TranslateModule, DynamicCurrencyPipe],
  templateUrl: './order-summary.component.html',
  styleUrl: './order-summary.component.css'
})
export class OrderSummaryComponent {

  orderService = inject(OrderService);

  cartService = inject(CartService);
  currency = signal('USD');

  router = inject(Router);

  total = computed(() => {
    let total = 0;
    for(const item of this.cartService.cart()) {
      total += item.product.price * item.quantity;
    }
    return total;
  })

  checkout() {
    const cartItems = this.cartService.cart();
    if (cartItems.length === 0) {
      alert('CART_IS_EMPTY');
      return;
    }
    const order: OrderPayload = {
      customer_name: 'John Doe', // TODO: Get from formular
      customer_email: 'john.doe@example.com',
      items: cartItems.map(item => ({
        product: item.product.id,
        quantity: item.quantity
      }))
    };

    this.orderService.submitOrder(order).subscribe({
      next: () => {
        alert('ORDER_SUBMITTED');
        this.cartService.cart.set([]); // Clear cart after checkout
        this.router.navigate(['/order-confirmation']);
      },
      error: (err) => {
        console.error('CHECKOUT_ERROR', err);
        alert('CHECKOUT_ERROR');
      }
    });

  }

}
