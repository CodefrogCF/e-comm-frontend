import { Component, inject, input, output, signal } from '@angular/core';
import { Product } from '../../../models/products.model';
import { ButtonComponent } from '../../../components/button/button.component';
import { CartService } from '../../../services/cart.service';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { DynamicCurrencyPipe } from '../../../pipes/dynamic-currency.pipe';

@Component({
  selector: 'app-cart-item',
  standalone: true,
  imports: [CommonModule, ButtonComponent, TranslateModule, DynamicCurrencyPipe],
  templateUrl: './cart-item.component.html',
  styleUrl: './cart-item.component.css'
})
export class CartItemComponent {

  cartService = inject(CartService);

  item = input.required<Product>();
  index = input.required<number>();
  remove = output<number>();
  currency = signal('EUR');

}
