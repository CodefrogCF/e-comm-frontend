import { Component, inject, input, OnInit, effect, signal } from '@angular/core';
import { Product } from '../../../models/products.model';
import { PrimaryButtonComponent } from '../../../components/primary-button/primary-button.component';
import { CartService } from '../../../services/cart.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { CurrencyService } from '../../../services/currency.service';
import { LocaleService } from '../../../services/locale.service';
import { TranslateModule } from '@ngx-translate/core';
import { DynamicCurrencyPipe } from '../../../pipes/dynamic-currency.pipe';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule, PrimaryButtonComponent, TranslateModule, DynamicCurrencyPipe, RouterLink],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})

export class ProductCardComponent {
  cartService = inject(CartService);
  translate = inject(TranslateService);
  currencyService = inject(CurrencyService);
  localeService = inject(LocaleService);
  product = input.required<Product>();
  currency = input<string>('USD');

  convertedPrice = signal<string>('');

  constructor() {
    effect(() => {
      const baseCurrency = 'USD';
      const targetCurrency = this.currency();

      this.currencyService.fetchRates(baseCurrency).subscribe({
        next: () => {
          try {
            const converted = this.currencyService.convert(this.product().price, baseCurrency, targetCurrency);
            this.convertedPrice.set(
              new Intl.NumberFormat(navigator.language, {
                style: 'currency',
                currency: targetCurrency,
              }).format(converted)
            );
          } catch (error) {
            console.error('CURRENCY_CONVERSION_FAILED:', error);
            this.convertedPrice.set(this.product().price.toFixed(2));
          }
        },
        error: (err) => {
          console.error('FETCH_RATES_FAILED:', err);
          this.convertedPrice.set(this.product().price.toFixed(2));
        }
      });
    });
  }
}