import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component'
import { FooterComponent } from './components/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent, RouterOutlet, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ecomm'
  currency = 'EUR';

  constructor(private translate: TranslateService) {
    translate.setDefaultLang('de');
    translate.use('de');
  }

  switchLanguage(language: string) {
    this.translate.use(language);
    this.currency = language === 'en' ? 'USD' : 'EUR';
  }

}
