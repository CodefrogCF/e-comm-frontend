import { Component, inject, input, output, signal, effect } from '@angular/core';
import { Product } from '../../../models/products.model';
import { ButtonComponent } from '../../../components/button/button.component';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { DynamicCurrencyPipe } from '../../../pipes/dynamic-currency.pipe';
import { CartItem, CartService } from '../../../services/cart.service';
import { CurrencyService } from '../../../services/currency.service';

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
  currency = signal('USD');
  currencyService = inject(CurrencyService);
  convertedPrice = signal<string>('');

  constructor() {
    effect(() => {
      const baseCurrency = 'USD';
      const targetCurrency = this.currency();

      this.currencyService.fetchRates(baseCurrency).subscribe({
        next: () => {
          try {
            const converted = this.currencyService.convert(this.item().product.price, baseCurrency, targetCurrency);
            this.convertedPrice.set(
              new Intl.NumberFormat(navigator.language, {
                style: 'currency',
                currency: targetCurrency,
              }).format(converted)
            );
          } catch (error) {
            console.error('CURRENCY_CONVERSION_FAILED:', error);
            this.convertedPrice.set(this.item().product.price.toFixed(2));
          }
        },
        error: (err) => {
          console.error('FETCH_RATES_FAILED:', err);
          this.convertedPrice.set(this.item().product.price.toFixed(2));
        }
      });
    });
  }


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
