import { Component, inject, computed, signal } from '@angular/core';
import { CartService } from '../../../services/cart.service';
import { PrimaryButtonComponent } from '../../../components/primary-button/primary-button.component';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { DynamicCurrencyPipe } from '../../../pipes/dynamic-currency.pipe';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-summary',
  imports: [CommonModule, PrimaryButtonComponent, TranslateModule, DynamicCurrencyPipe],
  templateUrl: './order-summary.component.html',
  styleUrl: './order-summary.component.css'
})
export class OrderSummaryComponent {

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
    if (this.cartService.cart().length === 0) {
      alert('CART_IS_EMPTY');
      return;
    }
    this.cartService.checkout();
    this.router.navigate(['/order-confirmation']);
  }

}
