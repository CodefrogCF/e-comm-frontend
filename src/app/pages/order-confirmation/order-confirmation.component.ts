import { Component } from '@angular/core';
import { PrimaryButtonComponent } from '../../components/primary-button/primary-button.component';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-order-confirmation',
  imports: [PrimaryButtonComponent, RouterLink, TranslateModule],
  templateUrl: './order-confirmation.component.html',
  styleUrl: './order-confirmation.component.css'
})
export class OrderConfirmationComponent {

}
