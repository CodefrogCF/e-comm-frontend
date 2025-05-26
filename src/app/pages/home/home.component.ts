import { Component } from '@angular/core';
import { PrimaryButtonComponent } from '../../components/primary-button/primary-button.component';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-home',
  imports: [PrimaryButtonComponent, RouterLink, TranslateModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  headerPicture = '/assets/images/header.jpg';

}
