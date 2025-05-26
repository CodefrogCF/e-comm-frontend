import { Component, inject, computed, signal } from '@angular/core';
import { CartService } from '../../../services/cart.service';
import { PrimaryButtonComponent } from '../../../components/primary-button/primary-button.component';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { DynamicCurrencyPipe } from '../../../pipes/dynamic-currency.pipe';

@Component({
  selector: 'app-order-summary',
  imports: [CommonModule, PrimaryButtonComponent, TranslateModule, DynamicCurrencyPipe],
  templateUrl: './order-summary.component.html',
  styleUrl: './order-summary.component.css'
})
export class OrderSummaryComponent {

  cartService = inject(CartService);
  currency = signal('EUR');

  total = computed(() => {
    let total = 0;
    for(const item of this.cartService.cart()) {
      total += item.price;
    }
    return total;
  })

}
