import { Component } from '@angular/core';
import { PrimaryButtonComponent } from '../../components/primary-button/primary-button.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [PrimaryButtonComponent, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  headerPicture = '/assets/images/header.jpg';

}
