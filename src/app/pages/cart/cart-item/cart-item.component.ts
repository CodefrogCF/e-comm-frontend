import { Component, inject, input, output } from '@angular/core';
import { Product } from '../../../models/products.model';
import { ButtonComponent } from '../../../components/button/button.component';
import { CartService } from '../../../services/cart.service';

@Component({
  selector: 'app-cart-item',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './cart-item.component.html',
  styleUrl: './cart-item.component.css'
})
export class CartItemComponent {

  cartService = inject(CartService);

  item = input.required<Product>();
  index = input.required<number>();
  remove = output<number>();

}
