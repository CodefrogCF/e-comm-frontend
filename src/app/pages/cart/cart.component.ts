import { Component, inject } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { CartItemComponent } from '../../pages/cart/cart-item/cart-item.component';
import { OrderSummaryComponent } from '../../pages/cart/order-summary/order-summary.component';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-cart',
  imports: [CartItemComponent, OrderSummaryComponent, RouterLink, TranslateModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {

  cartService = inject(CartService);

}
