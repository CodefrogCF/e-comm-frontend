import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { LocaleService } from './services/locale.service';
import { CurrencyService } from './services/currency.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent, RouterOutlet, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ecomm'
  currency = 'USD';

  constructor(
    private translate: TranslateService,
    private localeService: LocaleService,
    private currencyService: CurrencyService) {
      const defaultLang = 'en';
      translate.setDefaultLang(defaultLang);
      translate.use(defaultLang);

      const defaultCurrency = this.localeService.getCurrencyForLanguage(defaultLang);
      this.currency = defaultCurrency;
      this.currencyService.fetchRates('USD').subscribe();

      this.translate.onLangChange.subscribe(event => {
        const newCurrency = this.localeService.getCurrencyForLanguage(event.lang);
        this.currency = newCurrency;
        this.currencyService.fetchRates('USD').subscribe();
      });

  }

  switchLanguage(language: string) {
    this.translate.use(language);
    this.currency = language === 'de' ? 'EUR' : 'USD';
  }

}
