import { Component, inject, signal } from '@angular/core';
import { PrimaryButtonComponent } from '../primary-button/primary-button.component';
import { CartService } from '../../services/cart.service';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [PrimaryButtonComponent, RouterLink, TranslateModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

cartService = inject(CartService);

}
