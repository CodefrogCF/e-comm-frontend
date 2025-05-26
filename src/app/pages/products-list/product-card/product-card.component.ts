import { Component, inject, input } from '@angular/core';
import { Product } from '../../../models/products.model';
import { PrimaryButtonComponent } from '../../../components/primary-button/primary-button.component';
import { CartService } from '../../../services/cart.service';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { DynamicCurrencyPipe } from '../../../pipes/dynamic-currency.pipe';

@Component({
  selector: 'app-product-card',
  imports: [CommonModule, PrimaryButtonComponent, TranslateModule, DynamicCurrencyPipe],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent {

  cartService = inject(CartService);
  product = input.required<Product>();
  currency = input<string>('EUR');

}
